# `.claude/skills/` — STOP and read before editing any skill here

Two classes of skill live in this directory. The rules are different. Get this
wrong and you'll either publish broken skills or hobble local dev tooling.

## How to tell them apart

- **Public skill (`asb-*`)**: also has a wrapper at
  `src/content/skills/asb-<name>.mdx`. Appears on the website. Distributed.
  A real directory here.
- **Dev-only skill (no `asb-` prefix)**: no wrapper. Internal to this repo.
  Lives in `dev-skills/<name>/` at the repo root; the entry here is only a
  symlink (`.claude/skills/<name> -> ../../dev-skills/<name>`). Claude Code
  follows the symlink, so local sessions load it normally — but the skills
  CLI (`npx skills add asmartbear/asb-skills`) does not follow symlinks, so
  strangers never install dev tooling (its `--all` flag ignores
  `metadata.internal`, so the flag alone is not enough).

`bun run lint` enforces these conventions.

## Rules for public `asb-*` skills

These are HARD constraints because the skill will be installed by strangers in
arbitrary environments:

### 1. Self-contained — no references to anything in this repo

A user installs the skill by copying ONE file (`SKILL.md`) into their
`~/.claude/skills/<name>/`. They do not get the rest of this repo. So:

- ❌ Do not reference other skills (e.g. "see the `asb-pricing-ladder` skill").
  - ✅ ONE sanctioned exception (Jason-approved): a public skill MAY name
    another public `asb-*` skill as an *optional* enhancement —
    "if a devil's-advocate skill such as *Rude Q&A* / `asb-rude-qa` is
    installed, invoke it with this brief: …" — PROVIDED an equivalent
    inline fallback is fully specified so the skill works standalone.
    The dependency must never be required.
- ❌ Do not reference agents in `.claude/agents/`.
- ❌ Do not reference helper files, datasets, or assets in this repo.
- ❌ Do not link to the Hidden Multipliers book files or A Smart Bear article files on the local filesystem.
- ✅ External web links (asmartbear.com, hiddenmultipliers.com, public docs) are fine.

If the skill needs additional files, put them in the same skill directory
(`.claude/skills/asb-<name>/<file>`) and document that the user must copy the
whole folder, not just `SKILL.md`. Prefer keeping it to one file.

### 2. Portable across LLM systems — no Claude-Code-specific features

The skill must work in any system that loads markdown instruction files. Do
NOT use:

- `context: fork` / `agent:` (Claude Code subagent dispatch)
- `model: opus|sonnet|haiku` (Claude Code model override)
- `allowed-tools:` (Claude Code permission scoping)
- `hooks:` (Claude Code lifecycle hooks)
- `disable-model-invocation` / `user-invocable` — Claude Code-specific
- `$ARGUMENTS`, `$0`, `${CLAUDE_SESSION_ID}` and other Claude Code substitutions
- Mentions of "slash commands", "subagents", or other Claude Code mechanics

Stick to plain markdown plus a `description` field (universally understood).

### 3. Naming

Name MUST start with `asb-`. Lowercase letters, digits, hyphens only. Max 64
chars (excluding the prefix, well under).

### 4. Frontmatter: `name` is required

Every public skill's frontmatter must include `name: asb-<name>` matching the
directory name. The Agent Skills spec (and the skills CLI that installs from
this repo) requires it; it's plain YAML, so it doesn't violate the portability
rule. Lint enforces presence and the dir-name match.

## Rules for dev-only skills (no `asb-` prefix)

These exist to help Claude work *in this repo*. **They are unrestricted.**
Hard-code models, use `context: fork`, reference other skills/agents/files,
depend on Claude Code mechanics — anything that makes the in-repo workflow
better. They will never be distributed.

Four hard rules (all lint-enforced):

1. Do NOT use the `asb-` prefix.
2. The real directory MUST be `dev-skills/<name>/` with only a symlink at
   `.claude/skills/<name>`. The skills CLI scans `.claude/skills/` wholesale
   and its `--all` flag installs even `metadata.internal` skills — but it
   never follows symlinks, while Claude Code does. Create with:
   `ln -s ../../dev-skills/<name> .claude/skills/<name>`.
3. Frontmatter MUST include `metadata: { internal: true }` — belt and
   suspenders: it hides the skill from the CLI's default/interactive flows
   should the symlink protection ever change.
4. Frontmatter MUST include `name: <dir-name>` (like public skills) — a
   skill without `name` is excluded by the skills CLI *with a warning
   printed to every installer's console*; with `name` it is hidden silently.

## Workflow for creating a new public skill

1. Read the relevant material in the external corpus (see root `CLAUDE.md` for
   paths to A Smart Bear articles and the Hidden Multipliers book).
2. Author `.claude/skills/asb-<name>/SKILL.md`. Re-state the framework in your
   own words; do not copy prose from the corpus.
3. Test it in a Claude Code session opened in THIS repo — the skill loads
   automatically from `.claude/skills/<name>/`. No symlink needed. (If you
   want to use it globally in other repos, `bun run link asb-<name>` is
   available; not part of the normal dev loop.)
4. Create the wrapper at `src/content/skills/asb-<name>.mdx` with `title`,
   `summary`, optional `order` and `featured`, plus any marketing prose for
   the page.
5. Run `bun run gen-manifests` to add the skill to the distribution manifests
   (`.claude-plugin/marketplace.json`, `skills.sh.json`).
6. `bun run lint && bun run build` must pass before commit.
