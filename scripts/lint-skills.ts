#!/usr/bin/env bun
/**
 * Lint every skill in the repo.
 *
 * Rules:
 *   - Every directory under .claude/skills/ must contain a SKILL.md with valid frontmatter.
 *   - SKILL.md `name` (if present) must match the folder name.
 *   - `description` (if present) must be a string and reasonably-sized.
 *   - Body must be non-empty.
 *   - Public skills (those that ALSO have a wrapper at src/content/skills/<name>.mdx) MUST:
 *       - Have a name starting with `asb-`.
 *       - Have a frontmatter `name` (required by the skills CLI / Agent Skills spec).
 *       - NOT set `metadata.internal` (that flag hides a skill from the skills CLI).
 *       - Have a wrapper file with valid frontmatter (title, summary).
 *   - Dev-only skills (no wrapper) MUST set `metadata.internal: true` AND live
 *     in dev-skills/ with only a symlink in .claude/skills/. The skills CLI
 *     (`npx skills add asmartbear/asb-skills`) scans .claude/skills/ wholesale;
 *     `--all` ignores metadata.internal, but discovery never follows symlinks,
 *     while Claude Code does — so the symlink is what keeps dev tooling local.
 *   - Every wrapper at src/content/skills/<name>.mdx must point to an existing SKILL.md.
 *   - Wrapper names that start with `asb-` but have no matching SKILL.md are an error.
 *   - The committed distribution manifests (.claude-plugin/marketplace.json,
 *     skills.sh.json) must match what `bun run gen-manifests` would generate.
 *
 * Exits non-zero on any failure.
 */
import { readdirSync, readFileSync, existsSync, statSync, lstatSync, readlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import matter from 'gray-matter';
import { marketplaceJson, skillsShJson, pluginJson, pluginSkillLinkTarget, PLUGIN_DIR } from './gen-manifests';

const REPO_ROOT = resolve(import.meta.dir, '..');
const SKILLS_DIR = join(REPO_ROOT, '.claude', 'skills');
const WRAPPERS_DIR = join(REPO_ROOT, 'src', 'content', 'skills');
const WORKSHOPS_DIR = join(REPO_ROOT, 'src', 'content', 'workshops');

const errors: string[] = [];
const warnings: string[] = [];

function err(msg: string) { errors.push(msg); }
function warn(msg: string) { warnings.push(msg); }

function listSkillDirs(): string[] {
  if (!existsSync(SKILLS_DIR)) return [];
  return readdirSync(SKILLS_DIR).filter((n) => {
    const d = join(SKILLS_DIR, n);
    return statSync(d).isDirectory();
  });
}

function listWrappers(): string[] {
  if (!existsSync(WRAPPERS_DIR)) return [];
  return readdirSync(WRAPPERS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function listWorkshops(): string[] {
  if (!existsSync(WORKSHOPS_DIR)) return [];
  return readdirSync(WORKSHOPS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function lintWorkshop(name: string) {
  const mdx = join(WORKSHOPS_DIR, `${name}.mdx`);
  const md = join(WORKSHOPS_DIR, `${name}.md`);
  const path = existsSync(mdx) ? mdx : md;
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(readFileSync(path, 'utf8'));
  } catch (e) {
    err(`[workshop:${name}] invalid YAML frontmatter: ${(e as Error).message}`);
    return;
  }
  const { data, content } = parsed;
  if (!data.title || typeof data.title !== 'string') {
    err(`[workshop:${name}] missing or non-string "title"`);
  }
  if (!data.summary || typeof data.summary !== 'string') {
    err(`[workshop:${name}] missing or non-string "summary"`);
  }
  if (!content.trim()) {
    err(`[workshop:${name}] body is empty`);
  }
}

function lintSkill(name: string, isPublic: boolean) {
  const skillPath = join(SKILLS_DIR, name, 'SKILL.md');
  if (!existsSync(skillPath)) {
    err(`[skill:${name}] missing SKILL.md`);
    return;
  }
  const raw = readFileSync(skillPath, 'utf8');
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(raw);
  } catch (e) {
    err(`[skill:${name}] invalid YAML frontmatter: ${(e as Error).message}`);
    return;
  }
  const { data, content } = parsed;

  if (data.name && data.name !== name) {
    err(`[skill:${name}] frontmatter name "${data.name}" does not match folder "${name}"`);
  }
  if (data.description !== undefined) {
    if (typeof data.description !== 'string') {
      err(`[skill:${name}] description must be a string`);
    } else if (data.description.length > 1024) {
      err(`[skill:${name}] description is ${data.description.length} chars (max 1024)`);
    } else if (data.description.length < 20) {
      warn(`[skill:${name}] description is only ${data.description.length} chars — describe what AND when`);
    }
  }
  if (!content.trim()) {
    err(`[skill:${name}] SKILL.md body is empty`);
  }

  const internal = (data.metadata as Record<string, unknown> | undefined)?.internal === true;
  if (isPublic) {
    if (!name.startsWith('asb-')) {
      err(`[skill:${name}] is published (has a wrapper) but its name does not start with "asb-"`);
    }
    if (!data.description) {
      err(`[skill:${name}] public skill is missing a "description" field`);
    }
    if (internal) {
      err(`[skill:${name}] public skill sets metadata.internal — that hides it from the skills CLI`);
    }
  } else {
    if (!internal) {
      err(`[skill:${name}] dev-only skill must set "metadata: { internal: true }" so the skills CLI doesn't distribute it`);
    }
    // A real directory in .claude/skills/ gets distributed by
    // `npx skills add --all` (which ignores metadata.internal). Dev-only
    // skills must live in dev-skills/ with only a symlink here — the skills
    // CLI doesn't follow symlinks; Claude Code does.
    if (!lstatSync(join(SKILLS_DIR, name)).isSymbolicLink()) {
      err(`[skill:${name}] dev-only skill must be a real dir in dev-skills/ plus a symlink in .claude/skills/ — a real dir here is installed by \`npx skills add --all\``);
    }
  }
  // Required on ALL skills: without `name`, the skills CLI skips the skill
  // with a per-skill warning printed to every installer's console.
  if (!data.name) {
    err(`[skill:${name}] missing a "name" field (required by the skills CLI / Agent Skills spec)`);
  }
}

/** The committed distribution manifests must match what gen-manifests generates. */
function lintManifests(publicSkills: string[]) {
  const targets: Array<[string, string]> = [
    ['.claude-plugin/marketplace.json', marketplaceJson()],
    ['skills.sh.json', skillsShJson()],
    [`${PLUGIN_DIR}/.claude-plugin/plugin.json`, pluginJson()],
  ];
  for (const [relPath, expected] of targets) {
    const path = join(REPO_ROOT, relPath);
    if (!existsSync(path)) {
      err(`[manifest:${relPath}] missing — run \`bun run gen-manifests\``);
    } else if (readFileSync(path, 'utf8') !== expected) {
      err(`[manifest:${relPath}] stale — run \`bun run gen-manifests\``);
    }
  }

  // The plugin skills dir must be exactly one correct symlink per public skill.
  const linksDir = join(REPO_ROOT, PLUGIN_DIR, 'skills');
  const entries = existsSync(linksDir) ? readdirSync(linksDir) : [];
  for (const name of publicSkills) {
    const p = join(linksDir, name);
    if (!existsSync(p) || !lstatSync(p).isSymbolicLink() || readlinkSync(p) !== pluginSkillLinkTarget(name)) {
      err(`[manifest:${PLUGIN_DIR}/skills/${name}] missing or wrong symlink — run \`bun run gen-manifests\``);
    }
  }
  for (const entry of entries) {
    if (!publicSkills.includes(entry)) {
      err(`[manifest:${PLUGIN_DIR}/skills/${entry}] not a public skill — run \`bun run gen-manifests\``);
    }
  }
}

function lintWrapper(name: string, wrapperSet: Set<string>, workshopSet: Set<string>) {
  const mdx = join(WRAPPERS_DIR, `${name}.mdx`);
  const md = join(WRAPPERS_DIR, `${name}.md`);
  const path = existsSync(mdx) ? mdx : md;
  const raw = readFileSync(path, 'utf8');
  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(raw);
  } catch (e) {
    err(`[wrapper:${name}] invalid YAML frontmatter: ${(e as Error).message}`);
    return;
  }
  const { data } = parsed;
  if (!data.title || typeof data.title !== 'string') {
    err(`[wrapper:${name}] missing or non-string "title"`);
  }
  if (!data.summary || typeof data.summary !== 'string') {
    err(`[wrapper:${name}] missing or non-string "summary"`);
  }
  if (!name.startsWith('asb-')) {
    err(`[wrapper:${name}] wrapper name does not start with "asb-" — only asb-* skills are published`);
  }
  const skillPath = join(SKILLS_DIR, name, 'SKILL.md');
  if (!existsSync(skillPath)) {
    err(`[wrapper:${name}] no matching .claude/skills/${name}/SKILL.md`);
  }
  if (data.related !== undefined) {
    if (!Array.isArray(data.related) || data.related.some((r: unknown) => typeof r !== 'string')) {
      err(`[wrapper:${name}] "related" must be a list of skill-name strings`);
    } else {
      for (const ref of data.related as string[]) {
        if (ref === name) {
          err(`[wrapper:${name}] "related" lists itself`);
        } else if (!wrapperSet.has(ref)) {
          err(`[wrapper:${name}] "related" references "${ref}" which is not a public skill`);
        }
      }
    }
  }
  if (data.workshop !== undefined) {
    if (typeof data.workshop !== 'string') {
      err(`[wrapper:${name}] "workshop" must be a workshop-slug string`);
    } else if (!workshopSet.has(data.workshop)) {
      err(`[wrapper:${name}] "workshop" references "${data.workshop}" which has no src/content/workshops/${data.workshop}.mdx`);
    } else if (data.order === undefined) {
      warn(`[wrapper:${name}] sets "workshop" but has no "order" — workshop steps are sequenced by "order"`);
    }
  }
}

const skillDirs = listSkillDirs();
const wrappers = listWrappers();
const wrapperSet = new Set(wrappers);
const workshops = listWorkshops();
const workshopSet = new Set(workshops);

for (const name of skillDirs) {
  lintSkill(name, wrapperSet.has(name));
}
for (const name of wrappers) {
  lintWrapper(name, wrapperSet, workshopSet);
}
for (const name of workshops) {
  lintWorkshop(name);
}
lintManifests(wrappers.filter((w) => skillDirs.includes(w)));

console.log(`Linted ${skillDirs.length} skills, ${wrappers.length} wrappers, ${workshops.length} workshops.`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log('OK ✓');
