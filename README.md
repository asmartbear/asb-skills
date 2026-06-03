# asb-skills

Public Claude Code skills implementing frameworks from
[A Smart Bear](https://longform.asmartbear.com) and
[Hidden Multipliers](https://hiddenmultipliers.com).

Browse the skills at **[skills.asmartbear.com](https://skills.asmartbear.com)**.

## Install a skill

Every skill lives at `.claude/skills/asb-<name>/SKILL.md`. To use one in your
own Claude Code:

```sh
mkdir -p ~/.claude/skills/asb-<name>
curl -fsSL https://github.com/asmartbear/asb-skills/raw/main/.claude/skills/asb-<name>/SKILL.md \
  -o ~/.claude/skills/asb-<name>/SKILL.md
```

## Develop

```sh
bun install
bun run dev      # http://localhost:4321
bun run lint
bun run build
```

See `CLAUDE.md` for the project rules (especially the public/dev-only skill
distinction).
