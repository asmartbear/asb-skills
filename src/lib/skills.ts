import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
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
  featured?: boolean;
  order?: number;
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
