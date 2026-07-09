# `src/` — Astro + Starlight

## Layout

- `content/docs/` — Starlight docs collection. Home (`index.mdx`) and
  `install.mdx` live here. **Skill pages are NOT rendered from here** — they
  use a custom dynamic route (see below).
- `content/skills/` — public-skill wrappers (one `.mdx` per public skill).
  Frontmatter: `title`, `summary`, optional `featured`, `order`, `process`
  (see Processes below). Body has three required sections in order:
  `## What this is about` (2–4 marketing paragraphs), `## Example invocation`
  (slash-command code block + prose), `## From the source` (foundation +
  supporting article links). **The presence of a file here is what publishes a
  skill.** No file → skill is dev-only and invisible.
- `content/processes/` — **process** pages (one `.mdx` per process). A process
  is a website-only concept: a documented sequence of skills run end-to-end
  (e.g. `customer-interview-method`). Frontmatter: `title`, `summary`, optional
  `order`, `cardTitle`, `hook`, `source`. Body is authored narrative (rendered
  via marked, like skill wrapper bodies) that links member skills with relative
  links. **Processes are NOT distributed skills** — the self-contained /
  Claude-agnostic rules do not apply; a process page may name and link skills
  freely. Membership is declared one-to-one on the *skill* (`process:` slug in
  the wrapper), and step order reuses the skill's existing `order` — the process
  page auto-collects and sequences its members, so there's no duplicated step
  list to drift.
- `pages/skills/[slug].astro` — dynamic route. For each public skill, joins
  the wrapper (`content/skills/<name>.mdx`) with the canonical content
  (`.claude/skills/<name>/SKILL.md`) and renders both inside Starlight chrome
  via `<StarlightPage>`. Also renders the "Part of <process> · Step N of M"
  back-link banner when the skill belongs to a process.
- `pages/processes/[slug].astro` — dynamic route for process pages. Renders the
  authored body plus an auto-generated numbered step pipeline (one card per
  member skill, showing its input→output file hand-off and a link).
- `lib/skills.ts` — single source for reading skills from disk. Used by the
  dynamic route, the `SkillsList` component on the home page, AND by
  `astro.config.ts` to build the sidebar. Don't duplicate this logic
  elsewhere.
- `lib/processes.ts` — single source for reading processes and resolving their
  member skills (via `lib/skills.ts`). Exports `listProcesses()` and
  `getProcessForSkill()`. Used by the process route, `ProcessList`, the skill
  route's banner, and the sidebar.
- `components/` — `SkillsList`, `ProcessList`, `CopyButton`,
  `InstallInstructions`. Keep components minimal; this is a content site, not
  an app.
- `styles/custom.css` — small Starlight theme overrides (accent color, etc.).
- `lib/site.ts` — centralized site strings and URLs. **Read the policy below before adding to it.**

## Centralized strings (`src/lib/site.ts`)

User-facing strings and URLs that (a) might plausibly change later AND (b)
appear in more than one place live in `src/lib/site.ts`. Today that's the site
name, the production URL, and the GitHub repo URL/branch (plus two helpers
that build `blob/` and `raw/` GitHub URLs).

### When to add a constant

Add to `site.ts` when **both** are true:

- The string/URL is referenced from two or more files, AND
- It could realistically change (rename, rebrand, repo move, branch rename).

Examples that BELONG: site title, deployment URL, repo URL, default branch.

Examples that do NOT belong: proper nouns that won't change ("Hidden
Multipliers", "A Smart Bear"), one-off marketing copy used in a single MDX
page, the `asb-` skill prefix (it's a structural convention enforced by lint,
not a display string).

When in doubt, keep it inline. Premature centralization is also a cost — each
constant adds a lookup hop for readers.

### YAML frontmatter caveat

YAML frontmatter in `.mdx` files (e.g. the splash hero `tagline`, page
`title`/`description`) **cannot** import from TS. So a constant in `site.ts`
that should also appear in YAML frontmatter has to be duplicated there. If you
change the constant, grep for the old value and update frontmatter by hand.
This is a known limitation — don't try to work around it with build-time
templating; the duplication is rare enough not to be worth the machinery.

## Conventions

- The `skills` content collection only describes the wrapper metadata; the
  canonical body comes from `.claude/skills/<name>/SKILL.md` via `lib/skills.ts`.
- The Starlight sidebar is built at config-load time from `listPublicSkills()`.
  Adding a new skill = adding the two files; the sidebar updates automatically.
- Don't add files to `content/docs/skills/`. Skills do not live there.
