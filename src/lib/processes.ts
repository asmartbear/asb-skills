import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { listPublicSkills, type SkillFile } from './skills';

const here = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(here, '..', '..');
export const PROCESSES_DIR = join(REPO_ROOT, 'src', 'content', 'processes');

export interface ProcessFrontmatter {
  title: string;
  summary: string;
  order?: number;
  /** Optional shorter title used on the home-page card. Falls back to `title`. */
  cardTitle?: string;
  /** Optional short one-liner shown on the home-page card. Falls back to `summary`. */
  hook?: string;
  /** Optional primary-source citation. Reused for the page hero image + OG meta, mirroring skills. */
  source?: { title: string; url: string };
}

export interface ProcessFile {
  /** Slug — the process page lives at `/processes/<name>/`. */
  name: string;
  frontmatter: ProcessFrontmatter;
  /** Markdown body of the `.mdx` (without frontmatter). */
  body: string;
  /** Member skills, in step order (by each skill's `order`). */
  steps: SkillFile[];
}

function readProcessNames(): string[] {
  if (!existsSync(PROCESSES_DIR)) return [];
  return readdirSync(PROCESSES_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function readProcess(name: string): { frontmatter: ProcessFrontmatter; body: string } | null {
  const mdx = join(PROCESSES_DIR, `${name}.mdx`);
  const md = join(PROCESSES_DIR, `${name}.md`);
  const path = existsSync(mdx) ? mdx : existsSync(md) ? md : null;
  if (!path) return null;
  const { data, content } = matter(readFileSync(path, 'utf8'));
  return { frontmatter: data as ProcessFrontmatter, body: content.trim() };
}

/**
 * Lists every process page, each with its member skills resolved in step
 * order. Membership is declared one-to-one on the skill wrapper's `process`
 * field; sequence comes from the skill's existing `order`.
 */
export function listProcesses(): ProcessFile[] {
  const skills = listPublicSkills(); // already sorted by order, then name
  const out: ProcessFile[] = [];
  for (const name of readProcessNames()) {
    const proc = readProcess(name);
    if (!proc) continue;
    const steps = skills.filter((s) => s.wrapper.process === name);
    out.push({ name, frontmatter: proc.frontmatter, body: proc.body, steps });
  }
  out.sort((a, b) => {
    const ao = a.frontmatter.order ?? 1000;
    const bo = b.frontmatter.order ?? 1000;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
  return out;
}

/**
 * For a skill, returns the process it belongs to plus its 1-based position,
 * or undefined if the skill declares no (resolvable) process. Powers the
 * "Part of <process> · Step N of M" banner on the per-skill page.
 */
export function getProcessForSkill(
  skillName: string,
): { process: ProcessFile; stepIndex: number; stepCount: number } | undefined {
  for (const process of listProcesses()) {
    const idx = process.steps.findIndex((s) => s.name === skillName);
    if (idx !== -1) {
      return { process, stepIndex: idx + 1, stepCount: process.steps.length };
    }
  }
  return undefined;
}
