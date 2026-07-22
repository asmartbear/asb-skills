#!/usr/bin/env bun
/**
 * Generate the two committed distribution manifests from the public-skill
 * list (single source of truth: `listPublicSkills()` — same pattern as
 * zip-skills.ts):
 *
 *   - .claude-plugin/marketplace.json — Claude Code plugin marketplace
 *     catalog. One plugin ("asb-skills") bundling every public skill, with
 *     `source: "./"` + explicit `skills` paths into .claude/skills/
 *     (the anthropics/skills pattern), so no files move on disk.
 *   - skills.sh.json — page grouping for skills.sh, mirroring the site's
 *     workshop structure plus a Standalone group.
 *
 * Run via `bun run gen-manifests` whenever skills are added/removed/renamed
 * or workshop membership changes. `bun run lint` fails if the committed
 * manifests are stale (see lint-skills.ts).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { listPublicSkills, REPO_ROOT } from '../src/lib/skills';
import { listWorkshops } from '../src/lib/workshops';
import { SITE } from '../src/lib/site';

/** Rendered content of .claude-plugin/marketplace.json. */
export function marketplaceJson(): string {
  // Alphabetical for a stable, order-independent manifest.
  const skillPaths = listPublicSkills()
    .map((s) => `./.claude/skills/${s.name}`)
    .sort();
  const marketplace = {
    name: 'asb-skills',
    owner: { name: 'Jason Cohen' },
    metadata: { description: SITE.description },
    plugins: [
      {
        name: 'asb-skills',
        source: './',
        strict: false,
        description: SITE.description,
        author: { name: 'Jason Cohen' },
        homepage: SITE.url,
        license: 'CC-BY-4.0',
        skills: skillPaths,
      },
    ],
  };
  return JSON.stringify(marketplace, null, 2) + '\n';
}

/** Rendered content of skills.sh.json. */
export function skillsShJson(): string {
  const workshops = listWorkshops();
  const grouped = new Set(workshops.flatMap((w) => w.steps.map((s) => s.name)));
  const groupings = workshops
    .filter((w) => w.steps.length > 0)
    .map((w) => ({
      title: w.frontmatter.title,
      description: w.frontmatter.summary,
      skills: w.steps.map((s) => s.name), // step order
    }));
  const standalone = listPublicSkills()
    .map((s) => s.name)
    .filter((name) => !grouped.has(name));
  if (standalone.length > 0) {
    groupings.push({
      title: 'Standalone skills',
      description: 'Self-contained skills that run on their own, outside any workshop sequence.',
      skills: standalone,
    });
  }
  return JSON.stringify({ groupings }, null, 2) + '\n';
}

if (import.meta.main) {
  const marketplaceDir = join(REPO_ROOT, '.claude-plugin');
  mkdirSync(marketplaceDir, { recursive: true });
  writeFileSync(join(marketplaceDir, 'marketplace.json'), marketplaceJson());
  writeFileSync(join(REPO_ROOT, 'skills.sh.json'), skillsShJson());
  const n = listPublicSkills().length;
  console.log(`Wrote .claude-plugin/marketplace.json (${n} skills) and skills.sh.json.`);
}
