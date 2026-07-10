import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { listPublicSkills, type SkillFile } from './skills';

const here = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(here, '..', '..');
export const WORKSHOPS_DIR = join(REPO_ROOT, 'src', 'content', 'workshops');

export interface WorkshopFrontmatter {
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

export interface WorkshopFile {
  /** Slug — the workshop page lives at `/workshops/<name>/`. */
  name: string;
  frontmatter: WorkshopFrontmatter;
  /** Markdown body of the `.mdx` (without frontmatter). */
  body: string;
  /** Member skills, in step order (by each skill's `order`). */
  steps: SkillFile[];
}

function readWorkshopNames(): string[] {
  if (!existsSync(WORKSHOPS_DIR)) return [];
  return readdirSync(WORKSHOPS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function readWorkshop(name: string): { frontmatter: WorkshopFrontmatter; body: string } | null {
  const mdx = join(WORKSHOPS_DIR, `${name}.mdx`);
  const md = join(WORKSHOPS_DIR, `${name}.md`);
  const path = existsSync(mdx) ? mdx : existsSync(md) ? md : null;
  if (!path) return null;
  const { data, content } = matter(readFileSync(path, 'utf8'));
  return { frontmatter: data as WorkshopFrontmatter, body: content.trim() };
}

/**
 * Lists every workshop page, each with its member skills resolved in step
 * order. Membership is declared one-to-one on the skill wrapper's `workshop`
 * field; sequence comes from the skill's existing `order`.
 */
export function listWorkshops(): WorkshopFile[] {
  const skills = listPublicSkills(); // already sorted by order, then name
  const out: WorkshopFile[] = [];
  for (const name of readWorkshopNames()) {
    const ws = readWorkshop(name);
    if (!ws) continue;
    const steps = skills.filter((s) => s.wrapper.workshop === name);
    out.push({ name, frontmatter: ws.frontmatter, body: ws.body, steps });
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
 * For a skill, returns the workshop it belongs to plus its 1-based position,
 * or undefined if the skill declares no (resolvable) workshop. Powers the
 * "Part of <workshop> · Step N of M" banner on the per-skill page.
 */
export function getWorkshopForSkill(
  skillName: string,
): { workshop: WorkshopFile; stepIndex: number; stepCount: number } | undefined {
  for (const workshop of listWorkshops()) {
    const idx = workshop.steps.findIndex((s) => s.name === skillName);
    if (idx !== -1) {
      return { workshop, stepIndex: idx + 1, stepCount: workshop.steps.length };
    }
  }
  return undefined;
}
