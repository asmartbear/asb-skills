/**
 * Centralized site strings and URLs.
 *
 * Scope: only things that might plausibly change later AND appear in more than
 * one place. Stable proper nouns (book titles, blog name) live inline at their
 * point of use — centralizing them is just indirection.
 *
 * Import from `.astro`, `.ts`, or MDX bodies. (YAML frontmatter cannot import
 * from TS — duplication there is unavoidable; see src/CLAUDE.md.)
 */

export const SITE = {
  /** Public name of the website. Title suffix, header label, H1. */
  name: 'Skills from A Smart Bear',
  /** Production URL. Used as Astro's `site` and for absolute links. */
  url: 'https://skills.asmartbear.com',
  /** One-line site description. Used for <meta name="description"> and as Starlight's default page description. */
  description:
    'Claude Code skills that implement frameworks and algorithms from A Smart Bear and the Hidden Multipliers book.',
} as const;

export const URLS = {
  githubRepo: 'https://github.com/asmartbear/asb-skills',
  githubBranch: 'main',
  /** Site-relative path to the "download all skills" archive, generated into dist/ at build time by scripts/zip-skills.ts. */
  allSkillsZip: '/asb-skills.zip',
} as const;

/** GitHub `blob/` URL for a path inside this repo. */
export function githubBlobUrl(repoRelPath: string): string {
  return `${URLS.githubRepo}/blob/${URLS.githubBranch}/${repoRelPath}`;
}

/** GitHub `raw/` URL for a path inside this repo. */
export function githubRawUrl(repoRelPath: string): string {
  return `${URLS.githubRepo}/raw/${URLS.githubBranch}/${repoRelPath}`;
}
