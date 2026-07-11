/**
 * Bundles every PUBLIC skill into `public/asb-skills.zip` so the site can offer
 * a one-click "download all skills" archive at skills.asmartbear.com/asb-skills.zip.
 *
 * Runs BEFORE Astro (chained ahead of `astro build` and `astro dev`), writing
 * into `public/` — which Astro serves at the site root in dev and copies into
 * `dist/` on build. That's why the link resolves in `bun run dev` too, not only
 * in production. The generated zip is gitignored.
 *
 * Reuses `listPublicSkills()` so the archive contains exactly the published
 * skills — never a dev-only one — with zero drift. Skill directories sit at the
 * archive's top level (e.g. `asb-positioning/SKILL.md`), so the user unzips
 * straight into `~/.claude/skills/`. The archive root also gets a provenance
 * README — the hand-editable `scripts/zip-readme.md`, added verbatim as
 * `README.md` — so anyone who opens it knows what it is.
 */
import { $ } from 'bun';
import { mkdirSync, rmSync, copyFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { REPO_ROOT, SKILLS_DIR, listPublicSkills } from '../src/lib/skills';

const names = listPublicSkills().map((s) => s.name);
if (names.length === 0) {
  console.error('zip-skills: no public skills found — refusing to write an empty archive');
  process.exit(1);
}

const publicDir = join(REPO_ROOT, 'public');
mkdirSync(publicDir, { recursive: true });
const zipPath = join(publicDir, 'asb-skills.zip');
// `zip` appends to an existing archive; remove any stale copy first so the
// contents always match the current public-skill set.
rmSync(zipPath, { force: true });

// Skills first: run from `.claude/skills` and list only the public skill names,
// so archive entries are `<skill>/SKILL.md` with no repo-path prefix.
await $`zip -r -q ${zipPath} ${names}`.cwd(SKILLS_DIR);

// Then drop the static provenance README at the archive root as `README.md`.
// Stage it in a temp dir under the right name so `-j` stores it as `README.md`.
const stageDir = mkdtempSync(join(tmpdir(), 'asb-skills-zip-'));
copyFileSync(join(REPO_ROOT, 'scripts', 'zip-readme.md'), join(stageDir, 'README.md'));
await $`zip -j -q ${zipPath} ${join(stageDir, 'README.md')}`;
rmSync(stageDir, { recursive: true, force: true });

console.log(`zip-skills: zipped ${names.length} skills + README → public/asb-skills.zip`);
