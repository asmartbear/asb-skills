/**
 * Bundles every PUBLIC skill into `dist/asb-skills.zip` so the site can offer a
 * one-click "download all skills" archive at skills.asmartbear.com/asb-skills.zip.
 *
 * Runs as the second half of `bun run build` (after `astro build` has created
 * dist/). Reuses `listPublicSkills()` so the archive contains exactly the
 * published skills — never a dev-only one — with zero drift.
 *
 * Skill directories sit at the archive's top level (e.g. `asb-positioning/SKILL.md`),
 * so the user unzips straight into `~/.claude/skills/`. The archive root also
 * gets a provenance README — the hand-editable `scripts/zip-readme.md`, added
 * verbatim as `README.md` — so anyone who opens it knows what it is.
 */
import { $ } from 'bun';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT, SKILLS_DIR, listPublicSkills } from '../src/lib/skills';

const names = listPublicSkills().map((s) => s.name);
if (names.length === 0) {
  console.error('zip-skills: no public skills found — refusing to write an empty archive');
  process.exit(1);
}

const distDir = join(REPO_ROOT, 'dist');
mkdirSync(distDir, { recursive: true });
const zipPath = join(distDir, 'asb-skills.zip');
// `zip` appends to an existing archive; remove any stale copy first so the
// contents always match the current public-skill set.
rmSync(zipPath, { force: true });

// Skills first: run from `.claude/skills` and list only the public skill names,
// so archive entries are `<skill>/SKILL.md` with no repo-path prefix.
await $`zip -r -q ${zipPath} ${names}`.cwd(SKILLS_DIR);
// Then drop the static provenance README at the archive root as `README.md`.
// `-j` junks the path; the file is copied to that name so it isn't renamed on disk.
await $`cp ${join(REPO_ROOT, 'scripts', 'zip-readme.md')} ${join(distDir, 'README.md')}`;
await $`zip -j -q ${zipPath} ${join(distDir, 'README.md')}`;
rmSync(join(distDir, 'README.md'), { force: true });

console.log(`zip-skills: zipped ${names.length} skills + README → dist/asb-skills.zip`);
