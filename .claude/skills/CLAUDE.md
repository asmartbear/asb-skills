# `.claude/skills/` — STOP and read before editing any skill here

Two classes of skill live in this directory. The rules are different. Get this
wrong and you'll either publish broken skills or hobble local dev tooling.

## How to tell them apart

- **Public skill (`asb-*`)**: also has a wrapper at
  `src/content/skills/asb-<name>.mdx`. Appears on the website. Distributed.
- **Dev-only skill (no `asb-` prefix)**: no wrapper. Internal to this repo.

`bun run lint` enforces these conventions.

## Rules for public `asb-*` skills

These are HARD constraints because the skill will be installed by strangers in
arbitrary environments:

### 1. Self-contained — no references to anything in this repo

A user installs the skill by copying ONE file (`SKILL.md`) into their
`~/.claude/skills/<name>/`. They do not get the rest of this repo. So:

- ❌ Do not reference other skills (e.g. "see the `asb-pricing-ladder` skill").
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

## Rules for dev-only skills (no `asb-` prefix)

These exist to help Claude work *in this repo*. **They are unrestricted.**
Hard-code models, use `context: fork`, reference other skills/agents/files,
depend on Claude Code mechanics — anything that makes the in-repo workflow
better. They will never be distributed.

The only hard rule: do NOT use the `asb-` prefix.

## Workflow for creating a new public skill

1. Read the relevant material in the external corpus (see root `CLAUDE.md` for
   paths to A Smart Bear articles and the Hidden Multipliers book).
2. Author `.claude/skills/asb-<name>/SKILL.md`. Re-state the framework in your
   own words; do not copy prose from the corpus.
3. Test in a real Claude session: `bun run link asb-<name>`, iterate, then
   `bun run unlink asb-<name>`.
4. Create the wrapper at `src/content/skills/asb-<name>.mdx` with `title`,
   `summary`, optional `order` and `featured`, plus any marketing prose for
   the page.
5. `bun run lint && bun run build` must pass before commit.
