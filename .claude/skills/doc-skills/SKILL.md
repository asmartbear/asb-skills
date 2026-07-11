---
description: "Reference for creating, editing, or updating Claude Code SKILL.md files — including any change to a skill's YAML frontmatter, description, invocation rules, or body. Covers all YAML frontmatter fields (description, when_to_use, disable-model-invocation, user-invocable, allowed-tools, disallowed-tools, context, agent, effort, paths, shell, etc.), authoring best practices, and string substitutions. Load BEFORE writing or modifying any file in .claude/skills/, not only when creating a new one. For agent .md files, see doc-agents."
user-invocable: false
---

# Instructions when creating or editing skills.

## What is a Skill?

A **skill** (`.claude/skills/<name>/SKILL.md`) extends what Claude can do in the
current conversation. Skills come in two flavors:

- **Reference skills** — conventions, patterns, domain knowledge. Claude
  auto-loads them when relevant and applies them inline alongside conversation
  context.
- **Task skills** — step-by-step instructions for a specific action (deploy,
  commit, generate). Typically invoked explicitly via `/name`. Can run inline or
  fork to a subagent with `context: fork`.

Skills follow the open [Agent Skills](https://agentskills.io) standard; Claude
Code adds invocation control, subagent execution, and dynamic context injection.
Custom commands have been merged into skills — `.claude/commands/foo.md` and
`.claude/skills/foo/SKILL.md` both produce `/foo`; if both exist, the skill wins.

For agent `.md` files, see the `doc-agents` skill.

## SKILL.md YAML Frontmatter

Sources:
- <https://code.claude.com/docs/en/skills> (Claude Code skills reference)
- <https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices> (authoring guide)

- Use a double-quoted string for the `description` field (not `>` folded scalar)
  — VS Code's YAML parser chokes on the folded syntax.
- **The `/slash-command` name comes from the skill's directory name**, not the
  frontmatter `name` field. `name` is only a display label. (Exception: in a
  plugin-root `SKILL.md`, `name` does set the command, because there's no
  containing skill directory.)

### All SKILL.md frontmatter fields

All fields are optional. Only `description` is recommended.

| Field                      | Required    | Description                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                     | No          | Display name in skill listings. Defaults to the directory name. Max 64 chars, lowercase letters/numbers/hyphens only, no XML tags, cannot contain "anthropic" or "claude". Does NOT set the slash-command name except in a plugin-root `SKILL.md`.                                                                                                                                  |
| `description`              | Recommended | What the skill does and when to use it. Claude uses this to decide when to auto-load. Max 1024 chars, no XML tags, third person ("Processes PDFs", not "I help with PDFs"). The combined `description` + `when_to_use` text is truncated at 1,536 chars in the skill listing — put the key use case first. If omitted, the first paragraph of markdown content is used as fallback. |
| `when_to_use`              | No          | Additional trigger context appended to `description` in the skill listing — trigger phrases, example requests. Counts toward the 1,536-char listing cap.                                                                                                                                                                                                                            |
| `argument-hint`            | No          | Hint shown during autocomplete. Example: `[issue-number]` or `[filename] [format]`.                                                                                                                                                                                                                                                                                                  |
| `arguments`                | No          | Named positional arguments for `$name` substitution in skill content. Accepts a space-separated string or a YAML list. Names map to positions in order (e.g. `arguments: [issue, branch]` makes `$issue` = arg 0, `$branch` = arg 1).                                                                                                                                               |
| `disable-model-invocation` | No          | `true` = explicit-only; prevents Claude from auto-loading. Only you can invoke via `/name`. Description is removed from context entirely. Also prevents preloading into subagents. Use for side-effect workflows (`/deploy`, `/commit`). Default: `false`.                                                                                                                          |
| `user-invocable`           | No          | `false` = hidden from the `/` menu; only Claude can invoke automatically. Description stays in context. Use for background knowledge that isn't actionable as a command. Default: `true`.                                                                                                                                                                                            |
| `allowed-tools`            | No          | Tools Claude can use without asking permission while this skill is active. Accepts a space- or comma-separated string, or a YAML list. Example: `Read Grep Glob` or `Bash(git *)`. Use `[]` to grant no tools (useful for delegate-only skills). Does not restrict the tool pool — only pre-approves. Takes effect after workspace trust is accepted for project skills.            |
| `disallowed-tools`         | No          | Tools removed from Claude's pool while this skill is active. Useful for autonomous skills that should never call certain tools (e.g. `AskUserQuestion` in a background loop). Same format as `allowed-tools`. Restriction clears on next user message.                                                                                                                              |
| `model`                    | No          | Model to use while this skill is active. Same values as `/model`, plus `inherit` to keep the session model. Override applies for the current turn only; the session model resumes on the next prompt.                                                                                                                                                                               |
| `effort`                   | No          | Effort level while this skill is active. Options: `low`, `medium`, `high`, `xhigh`, `max` (levels available depend on the model). Overrides the session effort level.                                                                                                                                                                                                                |
| `context`                  | No          | Set to `fork` to run in a forked subagent context. The skill content becomes the subagent's task prompt; it won't have access to conversation history. Only makes sense for task skills, not reference content.                                                                                                                                                                     |
| `agent`                    | No          | Which subagent type to use when `context: fork` is set. Options: built-in (`Explore`, `Plan`, `general-purpose`) or any custom subagent from `.claude/agents/`. Default: `general-purpose`.                                                                                                                                                                                          |
| `paths`                    | No          | Glob patterns that limit when Claude auto-loads this skill. Comma-separated string or YAML list. When set, Claude considers the skill only when working with matching files.                                                                                                                                                                                                        |
| `shell`                    | No          | Shell for dynamic-context-injection commands (see "Dynamic context injection" below). `bash` (default) or `powershell`. PowerShell requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`.                                                                                                                                                                                                    |
| `hooks`                    | No          | Lifecycle hooks scoped to this skill (`PreToolUse`, `PostToolUse`, `Stop`). See [hooks in skills and agents](https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents).                                                                                                                                                                                                      |

### Skill content lifecycle

When invoked, the rendered `SKILL.md` enters the conversation as a single
message and **stays there for the rest of the session** — Claude Code does not
re-read the file on later turns. Write guidance as standing instructions, not
one-time steps.

On auto-compaction, the most recent invocation of each skill is re-attached
after the summary, capped at 5,000 tokens per skill and 25,000 tokens combined
(filled most-recent-first; older skills can drop entirely). If a large skill
seems to stop influencing behavior after compaction, re-invoke it.

### Skill authoring guidelines

- **SKILL.md body under 500 lines.** Move detailed reference material to
  separate files in the skill directory and link from SKILL.md.
- **References one level deep.** SKILL.md links directly to `reference.md`,
  never `reference.md` → `details.md`. Claude may partially read deeply nested
  files (e.g. `head -100`) and miss content.
- **Table of contents for long reference files.** Files over 100 lines should
  open with a TOC so partial reads still reveal full scope.
- **Naming convention: gerund form** when practical (`processing-pdfs`,
  `analyzing-spreadsheets`). Noun-phrase (`pdf-processing`) is acceptable.
  Avoid vague names (`helper`, `utils`, `tools`).
- **Write descriptions in third person.** "Processes PDF files", not "I help
  you process PDFs" or "You can use this to…". Include both *what* and *when*.
  Skill selection is pure LLM reasoning — no embeddings, no keyword match — so
  the description must contain terms a user would naturally say.
- **Don't over-explain.** Claude already knows common concepts. Only add what
  it doesn't have (domain schemas, project conventions, tool usage). Every
  token in a loaded skill competes with conversation history.
- **Match degrees of freedom to fragility.** Low freedom (specific commands,
  no params) for fragile/critical ops; medium (scripts with knobs) for
  preferred-pattern tasks; high (textual guidance) for open-ended work.
- **Only grant tools the skill actually needs.** Prefer `allowed-tools: Read Grep`
  over a kitchen-sink list. Use `Bash(git *)` prefix-matching to scope shells.
- **Consistent terminology.** Pick one term and use it throughout
  (always "field", never mixing "field"/"box"/"element").
- **Avoid time-sensitive phrasing.** Don't write "before August 2025, use the
  old API" — put deprecated guidance in an "Old patterns" section instead.
- **Forward slashes in all paths**, even when documenting Windows usage.
- **MCP tool references use `ServerName:tool_name`** (e.g. `BigQuery:bigquery_schema`)
  to avoid "tool not found" when multiple MCP servers are loaded.
- **Skill descriptions share a character budget** (~2% of context window,
  fallback 16,000 chars). If skills get excluded, run `/context` to check.
  Override with `SLASH_COMMAND_TOOL_CHAR_BUDGET` env var.

### Authoring expert / reference skills (external-knowledge domains)

For a skill that makes Claude an "expert" on an external product, tool, or service
whose facts live online and change over time (e.g. `riverside`), encode the
*retrieval and verification method*, not a snapshot of the facts:

- **Encode the map, not the corpus.** The skill should make Claude expert by knowing
  *where to look and how to confirm* — a routing map of authoritative sources plus a
  verification protocol — not by memorizing facts that go stale. You can't fit the whole
  product's docs in a skill anyway.
- **Never answer from memory; retrieve then verify.** Model memory of a specific app is
  usually wrong or stale, and a confident wrong answer is worse than an honest "couldn't
  confirm." State that rule *and the reason* rather than relying on bare all-caps
  MUST/NEVER — Claude generalizes better from the why.
- **Tier the trusted sources** (official → first-party-adjacent → a small vetted
  third-party allowlist) and require citing the source URL and labeling official vs
  third-party. Explicitly exclude SEO listicles, affiliate roundups, and forums; a fact
  found only on an untrusted source is reported as unverified.
- **Search beats blind fetch for bot-blocked docs.** Many help centers (Zendesk,
  Intercom) return HTTP 403 to `WebFetch` but are fully search-indexed. Prefer
  `WebSearch` with `allowed_domains` scoped to the official domain to find articles, then
  fetch only pages that allow it; corroborate against a second source when full text can't
  be fetched. Never guess or construct a doc URL — find the real one.
- **Verify every URL before it goes in the skill** (same discipline as the
  `research-purchase` skill's link-verification rule), and keep the verified link catalog
  in a one-level-deep bundled `sources.md` (with a TOC) so SKILL.md stays a short routing
  table — progressive disclosure.
- **Pre-approve research tools** via `allowed-tools: WebSearch WebFetch Read` so answering
  doesn't trigger permission prompts.

### String substitutions in skill content

The Variable column below writes a space after `$` so the loader doesn't
substitute these examples while loading *this* skill — the real variables have
no space. (Same self-documentation trap as dynamic injection, below.)

| Variable                 | Description                                                                                                                                                                |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$ ARGUMENTS`            | All arguments passed when invoking the skill. If not present in content, arguments are appended as `ARGUMENTS: <value>`.                                                  |
| `$ ARGUMENTS[N]`         | Access a specific argument by 0-based index (shell-style quoting — wrap multi-word values in quotes to keep them as one argument).                                        |
| `$ N`                    | Shorthand for `$ ARGUMENTS[N]` (`$ 0` = first argument).                                                                                                                   |
| `$ name`                 | Named argument declared in the `arguments` frontmatter list. With `arguments: [issue, branch]`, `$ issue` expands to arg 0 and `$ branch` to arg 1.                       |
| `$ {CLAUDE_SESSION_ID}`  | Current session ID. Useful for logging or session-specific files.                                                                                                          |
| `$ {CLAUDE_EFFORT}`      | Current effort level (`low`, `medium`, `high`, `xhigh`, `max`). Use to adapt instructions to the active effort.                                                            |
| `$ {CLAUDE_SKILL_DIR}`   | Directory containing the skill's `SKILL.md`. For plugin skills, the skill's subdirectory, not the plugin root. Use in dynamic-injection commands to reference bundled scripts. |

### Dynamic context injection

A line consisting of an exclamation mark immediately followed by a
backtick-quoted command — `!` + `` `git diff HEAD` `` with no space between
them — is executed before Claude sees the skill content; the command output
is inlined in its place. A fenced code block whose opening fence is three
backticks immediately followed by `!` works the same way for multi-line
scripts. Use this to ground a skill in live state (current diff, current
branch, file listing) without making Claude run a tool first. The `shell`
frontmatter field selects bash (default) or powershell.

(The literal syntax is deliberately not written out in this file — the skill
loader would execute it on load. That's also the trap to avoid in any skill
that *documents* injection rather than *using* it.)

### Other skill features (not frontmatter)

- **Extended thinking**: Include "ultrathink" anywhere in skill content to
  enable thinking mode.
- **Supporting files**: Additional `.md`, scripts, templates in the skill's
  directory, referenced from `SKILL.md`. Bundled files cost no tokens until
  read; scripts can be executed via bash without loading their contents.
- **Live change detection**: edits to `SKILL.md` files under watched skill
  dirs take effect mid-session. Creating a brand-new top-level skills
  directory requires a restart.
