# `scripts/` — Bun TypeScript

Scripts under Bun (`bun run scripts/<name>.ts`):

- `lint-skills.ts` — validates every skill and wrapper. CI runs this. Exits
  non-zero on any error. Add new structural rules here, not inline elsewhere.
- `link-skill.ts` — OPTIONAL. Symlinks a skill from this repo into
  `~/.claude/skills/` so it loads in Claude Code sessions opened in *other*
  repos. Not needed while developing here — Claude Code reads
  `.claude/skills/` from the current project directly. Exposed as
  `bun run link <name>` / `bun run unlink <name>`.
- `gen-manifests.ts` — regenerates the two committed distribution manifests
  from `listPublicSkills()` / `listWorkshops()`: `.claude-plugin/marketplace.json`
  (Claude Code plugin marketplace; one "asb-skills" plugin whose `skills`
  paths point into `.claude/skills/`, so nothing moves on disk) and
  `skills.sh.json` (skills.sh page groupings mirroring the workshops). Run it
  whenever skills are added/removed/renamed or workshop membership changes;
  `lint-skills.ts` imports its builders and fails if the committed files are
  stale. Exposed as `bun run gen-manifests`.
- `zip-skills.ts` — chained ahead of `astro build`. Bundles every PUBLIC skill
  (`listPublicSkills()`, so dev-only skills are excluded) into
  `public/asb-skills.zip` (gitignored) for the site's "download all skills"
  link. Writing into `public/` (which Astro copies into `dist/`) rather than
  `dist/` directly keeps it a normal static asset. `bun run dev` does NOT
  generate it — so the link 404s under dev unless a build has run; that's fine,
  it's not worth slowing dev down for. Skill folders sit at the archive root;
  the hand-editable provenance file `zip-readme.md` is added as the archive's
  `README.md`. Edit that `.md` to change what a human sees when they open the ZIP.
- `deploy-and-wait.ts` — runs `git push` and then watches the GitHub Pages
  deploy run for the pushed HEAD commit, exiting non-zero if it fails.
  Useful for "I want to test the change live and know exactly when it's
  ready." Requires `gh` (installed + authenticated). Exposed as
  `bun run deploy-and-wait`.

## Conventions

- Use `import.meta.dir` (Bun) to locate the repo root; do not depend on `cwd`.
- Read frontmatter with `gray-matter` to stay consistent with `src/lib/skills.ts`.
- Print a one-line summary and exit. Don't be chatty in CI logs.
