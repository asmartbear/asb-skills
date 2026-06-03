# `scripts/` — Bun TypeScript

Two scripts; both run under Bun (`bun run scripts/<name>.ts`):

- `lint-skills.ts` — validates every skill and wrapper. CI runs this. Exits
  non-zero on any error. Add new structural rules here, not inline elsewhere.
- `link-skill.ts` — OPTIONAL. Symlinks a skill from this repo into
  `~/.claude/skills/` so it loads in Claude Code sessions opened in *other*
  repos. Not needed while developing here — Claude Code reads
  `.claude/skills/` from the current project directly. Exposed as
  `bun run link <name>` / `bun run unlink <name>`.

## Conventions

- Use `import.meta.dir` (Bun) to locate the repo root; do not depend on `cwd`.
- Read frontmatter with `gray-matter` to stay consistent with `src/lib/skills.ts`.
- Print a one-line summary and exit. Don't be chatty in CI logs.
