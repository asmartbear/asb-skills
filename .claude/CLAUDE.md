# `.claude/` rules

Everything under here configures Claude Code for this repo OR holds the
canonical skill files.

- `settings.json` — project permissions allowlist and any project-level Claude
  Code settings.
- `skills/` — every skill in the repo, public and dev-only. See
  `skills/CLAUDE.md` for the public-vs-dev-only distinction and the rules each
  must follow. **The most important rule lives there: public `asb-*` skills
  must be self-contained and Claude-Code-agnostic.**
- `worktrees/` — ephemeral; gitignored.
