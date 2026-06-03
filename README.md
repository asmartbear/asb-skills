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

## Future

Ideas worth doing once the catalog grows or the priority changes. Not
backlog items in any tracked sense — just a parking lot.

- **Categorize the skills.** Once there are more than ~10 skills, group
  them on the home page (e.g. by problem the reader has, by stage of
  company, or by chapter of *Hidden Multipliers*).
- **Sort/filter strip on the home page** (Featured · Newest · All).
  Worth it once there are 6+ skills.
- **`npx`-style one-line installer.** Today users copy a `SKILL.md` file
  into `~/.claude/skills/<name>/`. A `npx <something> install asb-<name>`
  command would lower the friction. Either ship our own installer or
  document an existing community one.
- **RSS / "what's new" feed.** Auto-generated from new or updated skills.
  Lets readers subscribe and supports "new skill out" tweets without
  hand-writing each one.
- **"Recently added" rail on the home page.** A single horizontal row at
  the top of the home page surfacing the newest skill (or the next-most-
  recently-updated one). Gives the home page a sense of motion. Useful
  once there's a steady cadence of new skills.
