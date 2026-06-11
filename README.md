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

`bun install`, then see `CLAUDE.md` for commands and the project rules
(especially the public/dev-only skill distinction and the
"kinds of changes" guide).

## License

Skill content is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (see `LICENSE`) —
reuse freely with attribution to Jason Cohen / A Smart Bear. The website
code in this repo is not separately licensed for reuse.

## Future

Ideas worth doing once the catalog grows or the priority changes. Not
backlog items in any tracked sense — just a parking lot.

- **Open to search engines.** `public/robots.txt` currently disallows all
  crawlers. At launch: switch it to allow, and add
  `Sitemap: https://skills.asmartbear.com/sitemap-index.xml` (the sitemap
  and `/rss.xml` feed already build).
- **One section per chapter (plus an "Articles" section).** Not
  categories/tags as such — instead a section per chapter of
  *Hidden Multipliers* for the skills drawn from that chapter, and
  one "Articles" section for skills drawn from A Smart Bear
  articles that aren't in the book. Hold off until we have more
  skills built; it'll be easier to see what this should look like
  with real data, and we want to pile more in before adding the
  structure. (Alternative groupings worth considering when we do it
  — by problem the reader has, or by stage of company.)
- **Sort/filter strip on the home page** (Featured · Newest · All).
  Worth it once there are 6+ skills.
- **`npx`-style one-line installer.** Today users copy a `SKILL.md` file
  into `~/.claude/skills/<name>/`. A `npx <something> install asb-<name>`
  command would lower the friction. Either ship our own installer or
  document an existing community one.
- **"Recently added" rail on the home page.** A single horizontal row at
  the top of the home page surfacing the newest skill (or the next-most-
  recently-updated one). Gives the home page a sense of motion. Useful
  once there's a steady cadence of new skills.

## Future skills

The backlog of skill ideas — each with its source article/chapter citations
ready for forging — lives in [BACKLOG.md](./BACKLOG.md).
