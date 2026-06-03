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
 *       - Have a wrapper file with valid frontmatter (title, summary).
 *   - Every wrapper at src/content/skills/<name>.mdx must point to an existing SKILL.md.
 *   - Wrapper names that start with `asb-` but have no matching SKILL.md are an error.
 *
 * Exits non-zero on any failure.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import matter from 'gray-matter';

const REPO_ROOT = resolve(import.meta.dir, '..');
const SKILLS_DIR = join(REPO_ROOT, '.claude', 'skills');
const WRAPPERS_DIR = join(REPO_ROOT, 'src', 'content', 'skills');

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

  if (isPublic) {
    if (!name.startsWith('asb-')) {
      err(`[skill:${name}] is published (has a wrapper) but its name does not start with "asb-"`);
    }
    if (!data.description) {
      err(`[skill:${name}] public skill is missing a "description" field`);
    }
  }
}

function lintWrapper(name: string, wrapperSet: Set<string>) {
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
}

const skillDirs = listSkillDirs();
const wrappers = listWrappers();
const wrapperSet = new Set(wrappers);

for (const name of skillDirs) {
  lintSkill(name, wrapperSet.has(name));
}
for (const name of wrappers) {
  lintWrapper(name, wrapperSet);
}

console.log(`Linted ${skillDirs.length} skills, ${wrappers.length} wrappers.`);
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
