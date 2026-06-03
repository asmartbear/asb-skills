import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { githubBlobUrl, githubRawUrl } from './site';

const here = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(here, '..', '..');
export const SKILLS_DIR = join(REPO_ROOT, '.claude', 'skills');
export const WRAPPERS_DIR = join(REPO_ROOT, 'src', 'content', 'skills');

export interface SkillWrapperFrontmatter {
  title: string;
  summary: string;
  /** Optional shorter title used on the home-page card. Falls back to `title`. */
  cardTitle?: string;
  /** Optional short verb-led one-liner shown on the home-page card. Falls back to `summary`. */
  hook?: string;
  /** Optional one-line description of what the user brings to the skill. Renders in the per-page I/O tile when both `input` and `output` are set. */
  input?: string;
  /** Optional one-line description of what the user gets back. Renders in the per-page I/O tile when both `input` and `output` are set. */
  output?: string;
  featured?: boolean;
  order?: number;
  /** Optional list of other public-skill names (e.g. ["asb-pricing-ladder"]) to surface in a "Related skills" section on the per-page. Missing or empty → no section rendered. Named skills that don't exist are skipped silently at render time (and flagged by `bun run lint`). One-directional — list only the skills useful as a follow-on from this one. */
  related?: string[];
  /** Optional primary-source citation. When set, an "Adapted from <title>." sentence appears appended to the summary line at the top of the per-skill page. Use the foundation article most directly behind the skill — usually the first entry under `## From the source` Foundation. */
  source?: { title: string; url: string };
}

export interface SkillFile {
  name: string;
  skillPath: string;
  skillRelPath: string;
  skillBody: string;
  skillFrontmatter: Record<string, unknown>;
  wrapper: SkillWrapperFrontmatter;
  /** Markdown body of the wrapper `.mdx`/`.md` file (without frontmatter). */
  wrapperBody: string;
  githubUrl: string;
  rawUrl: string;
  /** ISO date (YYYY-MM-DD) of the most recent git commit touching the SKILL.md or wrapper. `undefined` if git history is unavailable (e.g. shallow checkout with no history). */
  lastUpdated: string | undefined;
}

function readWrapperNames(): string[] {
  if (!existsSync(WRAPPERS_DIR)) return [];
  return readdirSync(WRAPPERS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function readWrapper(name: string): { frontmatter: SkillWrapperFrontmatter; body: string } | null {
  const mdx = join(WRAPPERS_DIR, `${name}.mdx`);
  const md = join(WRAPPERS_DIR, `${name}.md`);
  const path = existsSync(mdx) ? mdx : existsSync(md) ? md : null;
  if (!path) return null;
  const raw = readFileSync(path, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data as SkillWrapperFrontmatter, body: content.trim() };
}

/** ISO date (YYYY-MM-DD) of the most recent commit touching any of the given paths. Returns undefined if git fails (e.g. shallow checkout with no history of these files, or repo not initialized). */
function lastCommitDate(paths: string[]): string | undefined {
  try {
    const out = execSync(
      `git log -1 --format=%cI -- ${paths.map((p) => JSON.stringify(p)).join(' ')}`,
      { cwd: REPO_ROOT, stdio: ['ignore', 'pipe', 'ignore'] },
    )
      .toString()
      .trim();
    if (!out) return undefined;
    return out.slice(0, 10); // YYYY-MM-DD
  } catch {
    return undefined;
  }
}

function readSkillFile(name: string): { body: string; frontmatter: Record<string, unknown> } | null {
  const skillPath = join(SKILLS_DIR, name, 'SKILL.md');
  if (!existsSync(skillPath)) return null;
  const raw = readFileSync(skillPath, 'utf8');
  const { content, data } = matter(raw);
  return { body: content.trim(), frontmatter: data };
}

/**
 * Lists every PUBLIC skill — i.e. every skill that has both a wrapper
 * `src/content/skills/<name>.mdx` and a canonical `.claude/skills/<name>/SKILL.md`.
 * Dev-only skills (no wrapper) are intentionally excluded.
 */
export function listPublicSkills(): SkillFile[] {
  const out: SkillFile[] = [];
  for (const name of readWrapperNames()) {
    const wrapper = readWrapper(name);
    const skill = readSkillFile(name);
    if (!wrapper || !skill) continue;
    const skillRelPath = `.claude/skills/${name}/SKILL.md`;
    const wrapperRelPath = `src/content/skills/${name}.mdx`;
    out.push({
      name,
      skillPath: join(SKILLS_DIR, name, 'SKILL.md'),
      skillRelPath,
      skillBody: skill.body,
      skillFrontmatter: skill.frontmatter,
      wrapper: wrapper.frontmatter,
      wrapperBody: wrapper.body,
      githubUrl: githubBlobUrl(skillRelPath),
      rawUrl: githubRawUrl(skillRelPath),
      lastUpdated: lastCommitDate([skillRelPath, wrapperRelPath]),
    });
  }
  out.sort((a, b) => {
    const ao = a.wrapper.order ?? 1000;
    const bo = b.wrapper.order ?? 1000;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
  return out;
}

/**
 * Lists ALL skills under .claude/skills/, including dev-only ones.
 * Used by the lint script.
 */
export function listAllSkillDirs(): string[] {
  if (!existsSync(SKILLS_DIR)) return [];
  return readdirSync(SKILLS_DIR).filter((name) => {
    const dir = join(SKILLS_DIR, name);
    return statSync(dir).isDirectory() && existsSync(join(dir, 'SKILL.md'));
  });
}
