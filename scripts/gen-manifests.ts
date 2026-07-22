#!/usr/bin/env bun
/**
 * Generate the two committed distribution manifests from the public-skill
 * list (single source of truth: `listPublicSkills()` — same pattern as
 * zip-skills.ts):
 *
 *   - .claude-plugin/marketplace.json — Claude Code plugin marketplace
 *     catalog. One plugin ("asb-skills") bundling every public skill.
 *   - plugins/asb-skills/ — the plugin root: a plugin.json plus a skills/
 *     dir of SYMLINKS to ../../../.claude/skills/asb-*. Claude Code's
 *     install copy dereferences the symlinks into real files, so users get
 *     exactly the public skills. The plugin root deliberately is NOT "./"
 *     (Claude Code runs a full dependency install into every user's plugin
 *     cache when the plugin root contains a package.json) and NOT
 *     "./.claude" (the default skills/ scan there would sweep in the
 *     dev-only skills).
 *   - skills.sh.json — page grouping for skills.sh, mirroring the site's
 *     workshop structure plus a Standalone group.
 *
 * Run via `bun run gen-manifests` whenever skills are added/removed/renamed
 * or workshop membership changes. `bun run lint` fails if the committed
 * manifests are stale (see lint-skills.ts).
 */
import { writeFileSync, mkdirSync, readdirSync, existsSync, symlinkSync, rmSync, readlinkSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import { listPublicSkills, REPO_ROOT } from '../src/lib/skills';
import { listWorkshops } from '../src/lib/workshops';
import { SITE } from '../src/lib/site';

export const PLUGIN_DIR = 'plugins/asb-skills';

/** Rendered content of .claude-plugin/marketplace.json. */
export function marketplaceJson(): string {
  const marketplace = {
    name: 'asb-skills',
    owner: { name: 'Jason Cohen' },
    metadata: { description: SITE.description },
    plugins: [
      {
        name: 'asb-skills',
        source: `./${PLUGIN_DIR}`,
        description: SITE.description,
        author: { name: 'Jason Cohen' },
        homepage: SITE.url,
        license: 'CC-BY-4.0',
      },
    ],
  };
  return JSON.stringify(marketplace, null, 2) + '\n';
}

/** Rendered content of plugins/asb-skills/.claude-plugin/plugin.json. No
 * `version` on purpose: without one, the plugin cache keys on the commit
 * SHA, so `/plugin marketplace update` picks up every push with no manual
 * version bumping. */
export function pluginJson(): string {
  const plugin = {
    name: 'asb-skills',
    description: SITE.description,
    author: { name: 'Jason Cohen' },
    homepage: SITE.url,
    license: 'CC-BY-4.0',
  };
  return JSON.stringify(plugin, null, 2) + '\n';
}

/** Expected symlink target for a public skill inside the plugin skills dir. */
export function pluginSkillLinkTarget(name: string): string {
  return `../../../.claude/skills/${name}`;
}

/** Create/refresh plugins/asb-skills/skills/<name> symlinks so the set
 * exactly matches the public skills; removes anything else in the dir. */
function syncPluginSkillLinks(): void {
  const skillsDir = join(REPO_ROOT, PLUGIN_DIR, 'skills');
  mkdirSync(skillsDir, { recursive: true });
  const want = new Map(listPublicSkills().map((s) => [s.name, pluginSkillLinkTarget(s.name)]));
  for (const entry of readdirSync(skillsDir)) {
    const p = join(skillsDir, entry);
    const target = want.get(entry);
    if (target && lstatSync(p).isSymbolicLink() && readlinkSync(p) === target) {
      want.delete(entry); // already correct
    } else {
      rmSync(p, { recursive: true, force: true }); // stale, wrong, or not a symlink
    }
  }
  for (const [name, target] of want) {
    symlinkSync(target, join(skillsDir, name));
  }
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
  const pluginManifestDir = join(REPO_ROOT, PLUGIN_DIR, '.claude-plugin');
  mkdirSync(pluginManifestDir, { recursive: true });
  writeFileSync(join(pluginManifestDir, 'plugin.json'), pluginJson());
  syncPluginSkillLinks();
  const n = listPublicSkills().length;
  console.log(
    `Wrote .claude-plugin/marketplace.json, skills.sh.json, and ${PLUGIN_DIR}/ (${n} skills).`,
  );
}
