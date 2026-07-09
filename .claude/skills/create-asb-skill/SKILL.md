---
description: "Interactive, multi-phase workflow for authoring a new public asb-* skill from one of Jason Cohen's concepts. Invoke explicitly via /create-asb-skill — auto-invocation is disabled to avoid accidentally kicking off this long workflow."
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.claude/skills/jason-corpus-search/search.sh:*), Bash(bun run lint:*), Bash(bun run build:*), Bash(mkdir:*), Bash(ls:*), Bash(cp .claude/skills/create-asb-skill/template.mdx:*), Bash(cp .claude/skills/create-asb-skill/archetypes/:*), AskUserQuestion
---

# create-asb-skill — turn a Jason Cohen concept into a public asb-* skill

This skill facilitates Jason building a new public skill for
[skills.asmartbear.com](https://skills.asmartbear.com). It is **interactive
and multi-phase**. Most of the value is in the conversation it forces, not in
boilerplate generation. Do not skip phases, do not silently fill in answers,
do not race to a draft.

This skill is **dev-only**. It freely references other things in this repo
(`jason-corpus-search`, `doc-skills`, lint scripts). The skill it *produces*,
however, is a public `asb-*` skill and MUST be fully self-contained and
Claude-Code-agnostic — see `.claude/skills/CLAUDE.md` for the hard rules.

## Forging vs wielding — keep these straight

Two layers of work happen in this skill, and the same words ("adversarial,"
"artifact") mean different things at each layer. Confusing them produces
muddled drafts. Use this vocabulary throughout:

- **Forging** = what's happening right now. You and Jason building the new
  `asb-foobar` skill. The *forger* is you (this LLM session). Jason is the
  expert being interviewed.
- **Wielding** = what will happen later, in some other session, when an end
  user loads the finished `asb-foobar` skill to apply Jason's framework to
  their own problem. The *wielder* is that future LLM. The *end user* is
  whoever installed the skill.

| Concept | Forging-time | Wielding-time |
| :------ | :----------- | :------------ |
| Who's adversarial against whom | **You press Jason** in Phases 2 & 3 to force precision so the produced skill is sharp, not vague. | The wielder presses the end user — when the framework warrants it — to refuse fuzzy inputs and reach a sharp application. Designed in Phase 3, baked in at Phase 4. |
| Tone of the pressing | **Short, curt, even rude is fine.** Jason wants you to grill him. "That's vague — sharpen it." "Counterexample, now." No softeners. Bandwidth and time matter more than feelings. | **Tone is gentle. Substance is unyielding.** The wielder is polite in *how* it asks, never in *whether* it accepts a weak answer. It does not let the end user off the hook with vague, wishful, hand-wavy, or "good enough" answers — it stays on the same point, in the same conversation, however many rounds it takes, until the answer is actually sharp. Sharp coach, not drill sergeant — but the coach does not move on until the rep is right. Politeness is in the framing only; the bar does not drop. |
| Artifact | The `asb-foobar` skill itself: `.claude/skills/asb-foobar/SKILL.md` plus `src/content/skills/asb-foobar.mdx`. Nothing else. No side-state file. | An *optional* separate markdown file the produced skill MAY tell the wielder to maintain for the end user — ongoing context for a multi-step exercise, often also the final deliverable. Most produced skills won't need one; opt in deliberately during Phase 3. |

So when this document says "press hard" in a forging phase, that's YOU
pressing JASON. When it talks about "wielding-time adversarial posture" or
"a wielding artifact" inside Phase 3 or Phase 4, that's about the produced
skill's relationship with its future end user. Use these words explicitly in
chat with Jason too — they keep the two layers from blurring.

### How the two files are used at runtime — and why this matters

Two files, two completely different jobs. Get this wrong and you'll under-
or over-invest in the wrong one.

- **`.mdx` wrapper** (`src/content/skills/asb-<slug>.mdx`) — this is the
  **public-facing webpage** on skills.asmartbear.com. The site renders:
  title (frontmatter) → italic summary (frontmatter) → Installing box →
  the wrapper body (`## What this is about` with 2–4 paragraphs +
  `## Example invocation` + `## From the source`). The SKILL.md content is
  **not** shown on the page; readers get it via the Installing box (download /
  view-source / raw / copy). So the wrapper body is the *sales surface*: it
  has to convince a stranger that this is worth installing, give them a vivid
  example of using it, and point them at Jason's source articles for context.
  Inviting, concrete, marketing-flavored.
- **`SKILL.md`** (`.claude/skills/asb-<slug>/SKILL.md`) — this is the
  **prompt that loads into a wielder LLM** when the end user invokes the
  skill. The end user never reads it for content (only the LLM does). So
  it's a tightly-written operational document: framework re-stated in its
  own words, vocabulary, wielding-time posture and standing rules, how-to
  steps, refusal conditions. Self-contained, Claude-Code-agnostic.

Concretely: do not put marketing prose in SKILL.md, and do not put step-by-
step wielder instructions in the .mdx. Long descriptions don't help the
wielder LLM (it doesn't load them); standing rules don't help the reader
(they're in the wrong voice).

### A "what good looks like" example

When unsure of voice, structure, or how the two files complement each
other, read the live exemplar pair:

- Wrapper: `src/content/skills/asb-rude-qa.mdx`
- SKILL.md: `.claude/skills/asb-rude-qa/SKILL.md`

The wrapper shows the marketing voice, the `## What this is about` heading
with inviting description paragraphs, the `## Example invocation` shape
(slash-command fenced block + prose paragraph describing what the skill does
without showing literal output), and the `## From the source` foundation-vs-
supporting split with why-relevant explanations on every item. The SKILL.md
shows wielding-posture rules, the standing dwell/move-on rules, a wielding
artifact spec, and refusal conditions.

### Forging-time state — no side file

The work product is the state:

- The `.mdx` wrapper at `src/content/skills/asb-<slug>.mdx` is created at
  Phase 0 from `template.mdx` and is **kept current through every phase** —
  references go in as you read them, the summary and long description
  sharpen as the framework crystallizes. If the session ends mid-stream,
  the on-disk .mdx already reflects everything decided so far.
- The SKILL.md at `.claude/skills/asb-<slug>/SKILL.md` is created at Phase
  4. From that point on, the on-disk file is the working draft and the
  resumption point for the SKILL.md side.
- Phases 1–3 don't write any SKILL.md yet (decisions accumulate in chat
  and in the .mdx). Phase 8 polishes both files and lints.

If Jason returns and says "continue forging," look for the in-progress
SKILL.md on disk, read it, ask which phase he wants to resume at, and
proceed.

---

## Phase 0 — Setup

Ask Jason for, in this order:

1. **Concept name** (human-readable, e.g. "Acquisition failure diagnostic").
2. **Skill slug** (must start with `asb-`, kebab-case). Propose one from the
   concept name; let Jason override.
3. **Source pointers** — the article(s) or chapter(s) where the concept
   lives. Jason may give article slugs (e.g. `pricing-determines-your-business-model`)
   or chapter names. Capture as many as he names; these become **Primary
   references** in the wrapper.

### Then immediately create the .mdx wrapper

Copy `.claude/skills/create-asb-skill/template.mdx` →
`src/content/skills/asb-<slug>.mdx` and fill in what you know now. Write
title and summary in the **marketing voice** described below — these are
not labels, they're hooks. Don't aim for perfect at Phase 0; aim for
"clearly already trying to sell it." Later phases sharpen.

- `title:` — full per-page title. Hook + descriptive. See "Marketing voice."
- `cardTitle:` — short home-page-card title (1–3 words). Almost always
  needed because `title` is usually too long for a card. See "Marketing voice."
- `hook:` — verb-led one-liner (5–8 words) shown on the home-page card.
  Distinct from `summary`. See "Marketing voice."
- `summary:` — benefit-first one-liner. See "Marketing voice."
- `input:` / `output:` — leave the TODO markers; Phase 3 fills these in
  once the interaction shape is clear.
- `related:` — leave commented out for now. Phase 8 (or any later session
  that adds an adjacent skill) decides whether this skill should point at
  follow-on skills.
- **`## What this is about`** — already present from the template; add one
  rough sentence of long description under it, led by the reader's payoff,
  not "this skill does X." Phase 6 expands to 2–4 paragraphs.
- **`## Example invocation`** — leave the TODO marker; Phase 3 fills this in once
  the interaction shape is clear.
- **`## From the source`** — record each source Jason named here, as a
  proper bullet. Foundation (the 1–2 critical sources) goes in the lead
  paragraph + first bullet list; Supporting (everything else, often
  empty at Phase 0) goes in the second bullet list. See the "From the
  source" section near the end of this document for full format.

This file is the **live working artifact** for the wrapper-side of the
forging — keep it updated continuously (see "Keep the .mdx updated as you
go" in the operating principles). Confirm what you wrote back to Jason and
move to Phase 1.

**Don't** auto-pick the slug without showing Jason. **Don't** start searching
the corpus until Phase 1.

---

## Phase 1 — Extract: raw material

Goal: gather everything Jason has written that's relevant, in one working
mental model, so later phases work from grounded material instead of
paraphrase-of-paraphrase.

### Steps

1. **Read the primary sources Jason named.** For each:
   - Article: `Read /Users/jcohen/Obsidian/Longform/Projects/Articles/Content/<slug>.md`
   - Chapter: locate via
     `Glob /Users/jcohen/Obsidian/Longform/Projects/Hidden Multipliers/Content/**/*.md`
     then `Read`. If Jason named a subsection, grep for the heading.

2. **Semantic search for adjacent material.** Run `jason-corpus-search`'s
   wrapper with 2–4 different phrasings of the concept:
   ```sh
   .claude/skills/jason-corpus-search/search.sh --semantic "<phrasing>" --limit 10
   ```
   Phrase queries as sentences ("companies that raised prices and survived"),
   not keywords. The wrapper bakes in the right filters — do not call
   `cli storage search` directly. Multiple different phrasings surface more
   than one careful query does.

3. **Just read the hits.** Don't ask Jason which adjacent articles or
   chapters look worth reading — skim them all. Reading is cheap; asking is
   friction. Not every word of every hit will be germane, but skim
   liberally and pick out the parts that are. The only time to ask before
   reading is if the search returns something that's obviously a different
   topic with a coincidentally similar title — and even then, lean toward
   skimming first.

4. **Hold in working memory** (and summarize back to Jason):
   - **Direct quotes worth preserving** with source attribution.
   - **Vocabulary** Jason uses for this concept — his actual terms.
   - **Examples** (companies, scenarios, anti-patterns).
   - **Adjacent frameworks** he connects this to.
   - **Open questions** — places where the corpus is fuzzy that Phase 2 will
     need to press for precision.

5. **Update the .mdx wrapper as you go.** Open `src/content/skills/asb-<slug>.mdx`
   and slot references into `## From the source` as you read them:
   - The 1–2 most critical articles (the one Jason named as the primary
     source, plus at most one other that's load-bearing — e.g. the
     philosophical/conceptual home of the framework) → **Foundation**
     bullets, each with a one-line why-this-is-critical explanation.
   - Adjacent articles or chapters that informed specific pieces of the
     mechanism, the target state, or refusal conditions → **Supporting**
     bullets, each with a one-line how-it-relates explanation.
   - URL format: `https://longform.asmartbear.com/<slug>/` (trailing slash
     required). Chapters: `*Chapter name* (section "...") in *Hidden Multipliers* — <https://hiddenmultipliers.com>`.
   - Do NOT append "(A Smart Bear)" after each item — the URL makes the
     source obvious; the suffix is noise.
   - Also expand the long description with a rougher-but-fuller version of
     what the framework is, based on what you've now read. It will get
     sharpened later; don't aim for tight prose yet.

Confirm extraction with Jason before moving on; he may add a source you
missed.

---

## Phase 2 — Distill: the framework

Goal: a tight, precise statement of the framework. This is where most skills
fail — by being vague.

### Draft a four-part statement

1. **Core claim** — in one sentence. What does this framework assert?
2. **When it applies** — what situations trigger it? What signals?
3. **Mechanism** — *why* does it work? What's the causal story?
4. **Vocabulary** — the 2–6 key terms, each defined in one line.

Show the draft to Jason.

### Then play devil's advocate — hard

Press Jason on every fuzzy edge. Forging-time tone: **short, curt, even rude
is fine.** No softeners, no "I just want to make sure I understand," no
preamble. Jason explicitly wants the grill. Pick the weakest 2–3 angles for
this particular concept and fire them off:

- "Give me the simplest counterexample. A case where this framework predicts
  X but the real outcome is Y."
- "What's the boundary? At what point does this stop applying?"
- "Two of your terms — [A] and [B] — feel like they could mean the same
  thing. What's the difference?"
- "If a stranger read only this paragraph, what would they get wrong?"
- "Where does this conflict with another framework you've written about?"

Iterate the four-part statement until Jason signs off. Do not move on while
something is "approximately right" — that imprecision compounds in later
phases.

### Update the .mdx as the framework sharpens

Once the four-part statement is signed off, return to
`src/content/skills/asb-<slug>.mdx` and **tighten** what's there. Apply
the marketing voice (see "Marketing voice" near the end of this document):

- `title:` — if the Phase-0 hook now feels off given the sharpened
  framework, rewrite. Hook + descriptive.
- `summary:` — rewrite as a sharp, benefit-first one-liner that reflects
  the now-precise framework. Lead with the reader's payoff, then the how.
- Long description — replace the rough Phase-1 prose with a tighter
  version. Still 2–4 paragraphs, still benefit-led, now grounded in the
  distilled vocabulary.

---

## Phase 3 — Operationalize: facilitation design

Goal: design what the LLM (loaded with the future SKILL.md) actually *does*
with a user. This is the highest-leverage phase. A skill that just recites a
framework is a lecture; a skill that facilitates the user applying it is
useful.

### Answer these in order, with Jason

1. **Trigger.** What does the user's prompt look like when this skill should
   auto-load? Write 5 example prompts. Then write 2 prompts that *look*
   related but should NOT trigger this skill.

2. **Inputs.** What does the LLM need from the user to apply the framework?
   What questions should it ask first?

3. **Interaction shape — convene the Archetype Council.** Read
   `.claude/skills/create-asb-skill/archetypes/README.md`. Present the
   Phase 2 four-part statement to all five personalities (Interrogator,
   Auditor, Elicitor, Drafter, Decision-Forcer) and render each one's
   answer in chat, in its own voice, 2–4 sentences: *"If this skill were
   mine, here is how I'd run it — and here is why I am / am not the right
   fit."* Include the recusals — Jason sees the whole council. Then declare
   a verdict: one personality wins, or two blend (name the **primary**,
   whose skeleton gets copied at Phase 4, and exactly which sections the
   secondary contributes). Confirm with Jason. If the concept genuinely
   fits none of the five, say so and design free-form — but treat no-fit as
   a flag: re-examine the Phase 2 distillation first, since a framework
   that fits no archetype is often a framework that isn't sharp yet.

   The remaining questions in this phase (inputs, artifact, posture,
   output, refusals) fill the chosen skeleton's `TODO(...)` slots — keep
   your notes keyed to the slot names so Phase 4 is mechanical.

4. **Wielding artifact — does the produced skill need one?** Some skills
   facilitate a multi-step process for the end user (a diagnostic
   worksheet, a positioning exercise, a pricing audit) where intermediate
   state is worth persisting across sessions. If so, the SKILL.md should
   instruct the wielder to create and update a markdown file at an end-
   user-chosen path, tracking phase and decisions. Decide explicitly:
   - Is the process long enough or multi-session enough to warrant a file?
   - What goes in it? (A YAML header tracking current phase, plus captured
     decisions.)
   - Who chooses the path? (End user, with a sensible default. If the
     skill consumes an input file, the output goes in the same directory
     as the input.)
   - Most skills DON'T need a wielding artifact — only opt in when the
     process genuinely spans sessions or produces a deliverable the end
     user would want to keep.
   - **Live file, not end-of-session file.** When the artifact is built
     item by item (a numbered list forged across many exchanges), the
     wielder creates the file as soon as the FIRST item is settled and
     appends after each one — long sessions forget and contexts get
     compacted; the file is the memory, not the chat. The file opens
     with an explicit `⚠️ IN PROGRESS` status note recording exactly
     where the walk stopped (plus any plan the resumed session must
     inherit, e.g. a grouping), so a fresh session can resume from disk
     alone; finalizing removes the note. This pattern is proven in
     `asb-interview-hypotheses` / `asb-interview-questions` — copy it,
     don't reinvent it.

4b. **Pacing — one item per exchange.** For any skill that forges
   multiple items with the user (goals, hypotheses, questions, list
   entries), bake in strict pacing as a standing posture rule: a SMALL
   opening move (acknowledge the input, flag anomalies, then start item
   one — never an opening wall of plans + batched drafts), exactly one
   item drafted/worked per exchange (candidate variants of the SAME item
   are fine; drafts for two different items are not), any
   merge/grouping/skip proposed and confirmed BEFORE acting on it, and a
   settle-then-write rhythm against the live file. This was learned the
   hard way: a produced skill that passed prose review and simulation
   dumped a full plan plus three grilled drafts in its opening message
   during real use. These skills facilitate the user; a user who can't
   react to a message is being performed for, not facilitated.

4c. **Ownership vs. craft — who wins a disagreement?** Decide, per part
   of the produced artifact, which of two hard-bar semantics applies:
   - **User-owned content** (their beliefs, their decisions): the wielder
     presses hard but ultimately records the user's version — "it's their
     list." Candidates offered are templates the user must correct;
     batch-nodding is refused; but the user's genuine belief goes in even
     when the wielder disagrees.
   - **Craft-gated content** (anything with objective quality criteria,
     e.g. a non-leading interview question): the criteria are
     NON-negotiable — a violating item is never recorded, in any form,
     "not even both versions," however the user insists. The refusal is
     always of the broken item, never of the user's underlying intent,
     which always has a compliant version available.
   Naming which semantic governs which section prevents both failure
   modes: a wielder that overrides the user's beliefs, and a wielder that
   lets a "it's my interview" appeal breach a quality gate.

5. **Wielding-time adversarial posture.** Critical and frequently
   underused. Most asb-* skills should not just *apply* the framework — they
   should facilitate the end user reaching a sharp answer, which usually
   requires the wielder pushing back. Decide explicitly:
   - Should the wielder accept the end user's first answer, or press for a
     sharper one? (Almost always: press.)
   - Where should it play devil's advocate? (Where the framework's leverage
     lives — e.g. "are you sure that's really the bottleneck?")
   - When should it refuse to proceed with vague inputs and demand
     specifics?
   - Should it propose a guess and force the end user to defend or revise it?

   **Tone vs. substance — keep these separate.** The wielder is polite in
   tone and unyielding in substance. Sharp coach, not drill sergeant — but
   the coach does not move on until the rep is right. Weak, vague,
   hand-wavy, or wishful-thinking answers DO NOT pass; the wielder stays on
   the same point, in the same conversation, however many rounds it takes,
   until the answer is genuinely sharp. Politeness is in the framing only;
   the bar does not drop.

   Concrete moves:
   - Acknowledge the answer before pushing on it ("I hear that — and here's
     where it still goes fuzzy:…") instead of "no" or "vague."
   - Name the *specific* gap, not a general complaint. "What's the
     timeframe?" beats "be more specific."
   - Offer a guess or two if the end user is stuck — then ask them to pick
     or revise. Don't leave them staring at a blank prompt.
   - Stay on the point until it's actually sharp. Three rounds in is not a
     reason to accept "good enough." Five rounds in is not either. The
     wielder moves on when the answer earns it, not when the conversation
     gets tired.
   - When the end user gives a wishful-thinking answer ("we'll figure that
     out later," "it'll probably work"), call it out explicitly and ask
     them to commit to something concrete now.

   Bake these into the SKILL.md as standing rules for the wielder — both
   *what* to press on AND *how* to press, with explicit notice that
   politeness never lowers the substantive bar.

6. **Output.** What does the user walk away with? A diagnosis? A list? A
   plan? A revised draft? A persistent artifact file?

7. **Refusal conditions.** When should the LLM say "this framework doesn't
   apply here"? Concrete cases.

### Devil's advocate on the design

- "If I describe my situation badly, will this skill confidently misdiagnose
  me? Walk me through how it avoids that."
- "What's the laziest possible output the LLM could produce while technically
  following these instructions? Patch that."
- "Is the user better off after talking to this skill than after just reading
  the underlying article? If not, why does the skill exist?"

### Fill in `input:` and `output:` in the .mdx frontmatter

Now that the interaction shape is clear, fill in `input:` and `output:` in
the .mdx frontmatter — both single-line strings. They render as a two-row
"Input / Output" tile above the install box on the per-skill page, giving
readers an at-a-glance shape of what the skill consumes and produces. Both
must be set for the tile to render; if only one applies, leave both blank.

- `input:` — what the user brings. *"A plan, pitch, decision, or
  positioning — a one-line dilemma or a fully-supported brief."*
- `output:` — what the user gets back. *"A markdown document with
  sharpened decisions, accepted consequences, and the next questions you
  owe yourself."*

Keep them short and concrete; this is a glance-level tile, not prose.

### Fill in the `## Example invocation` section of the .mdx

Now that the interaction shape is clear, fill in the `## Example invocation` section

of `src/content/skills/asb-<slug>.mdx`. Structure:

1. **Lead-in sentence** in second-person voice: "You can invoke the skill
   like this:" (NOT "A user might invoke" — see the second-person voice
   rule below).

2. **Fenced code block** with ```text fence (slash commands aren't real
   code; we just want a clean monospace box). Contents: a realistic
   slash-command invocation with enough context that the interrogation /
   diagnosis / coaching has something specific to bite on. Don't make it
   a one-word toy example.

3. **One or two sentences** saying roughly what happens — the shape of
   the session and what the reader walks away with. Do NOT narrate the
   step-by-step process; readers won't read a detailed how-it-works
   paragraph. Do NOT show literal LLM output. Address the reader as "you."

---

## Phase 4 — Draft SKILL.md

Goal: write the actual `.claude/skills/asb-<slug>/SKILL.md`. From this phase
on, the on-disk file is the working draft.

Start from the council's winning skeleton, not a blank page:

```sh
mkdir -p .claude/skills/asb-<slug>
cp .claude/skills/create-asb-skill/archetypes/<personality>.md .claude/skills/asb-<slug>/SKILL.md
```

Then resolve every `TODO(slot-name)` marker using the Phase 1–3 material.
The skeleton is scaffolding, not a cage: rewrite freely, rename phases to
fit the framework's vocabulary, delete sections that don't apply (e.g. the
working-document step when Phase 3 opted out of a wielding artifact). For a
blend, import the named sections from the secondary personality's file.
Iterate with Edit.

**Exit gate:** before leaving this phase, run
`grep -n "TODO(" .claude/skills/asb-<slug>/SKILL.md` — it must return
nothing.

### Hard constraints on the draft

Follow `doc-skills` for the SKILL.md spec. The constraints below are the
ones specific to public asb-* skills (see `.claude/skills/CLAUDE.md`):

1. **Frontmatter is minimal.** Only `description` (universal). NO
   `allowed-tools`, `model`, `context`, `agent`, `hooks`,
   `disable-model-invocation`, `user-invocable`, `paths`. Anything Claude
   Code-specific breaks portability.
2. **Description field**: third person, under 1024 chars, leads with what
   the skill does, then *when* to load it. Includes the natural language a
   user would actually say. Double-quoted string (not folded `>`).
3. **No references to anything in this repo.** No mention of other skills,
   other files, the corpus paths, agents, slash commands.
4. **Re-state, do not copy.** Paraphrase the framework into the skill's own
   words. No verbatim block quotes from articles or the book.
5. **All nuance baked in.** The future user has no corpus. Every distinction
   from Phase 2, every refusal condition from Phase 3, every example needed
   to apply the framework — must be in this file.
6. **Bake in the wielding-time adversarial posture AND tone from Phase 3.**
   The "How to use this skill" section should give the wielder explicit
   standing instructions on:
   (a) **What** to press on — every fuzzy term, every wishful claim, every
       "we'll figure it out later," every place the framework's leverage
       lives.
   (b) **How** to press — gentle in tone, unyielding in substance.
       Acknowledge before pushing, name the specific gap, offer guesses when
       the end user is stuck. Sharp coach, not drill sergeant.
   (c) **When to stop pressing** — only when the answer is genuinely sharp,
       not when the conversation has gone N rounds. Politeness never lowers
       the substantive bar; weak, vague, or wishful answers DO NOT pass.

   Both failure modes ship broken skills: a curt/scolding skill makes the
   end user feel bad; a polite-reciter skill nods along with sub-standard
   answers. The wielder helps the end user *earn* a sharp answer.
7. **If Phase 3 opted in to a wielding artifact**, include explicit
   instructions in SKILL.md for creating, updating, and resuming from that
   file (YAML header schema, phase tracking, default path). The wielder has
   no other state.
8. **Body under 500 lines.** Use clear headings. Prose, not bullet soup.

### Structure to aim for

The archetype skeleton already provides this shape — this block is the
reference for what the resolved draft should still look like when you're
done rewriting:

```
---
description: "..."
---

# <skill display title>

<one-paragraph framing: when this matters and what the user gets>

## <framework section 1>
...

## <framework section 2>
...

## How to use this skill

When the user describes <triggering situation>:
1. <what to ask>
2. <how to diagnose / generate / evaluate>
3. <what to recommend>
4. <where to press the user; what fuzzy answers to refuse>

<refusal conditions paragraph>
```

After drafting, read your own draft cold and ask: "If this were the only
thing I had, could I apply the framework?" Mark gaps. Patch. Then go to
Phase 5.

---

## Phase 5 — Source-map faithfulness audit

Goal: prove every load-bearing claim in the draft is grounded in Jason's
actual writing or an explicit forging-time decision — BEFORE adversarial
review, so review critiques a faithful draft rather than polishing an
invented one. This is the defense against the forger's paraphrase quietly
becoming the published framework.

### Steps

1. **Build the source map in chat** (not a committed file). One row per H2/H3
   section of the draft, and per distinct claim within it:

   ```
   <section / claim> → <grounding>
   ```

   Grounding is exactly one of:
   - **(a) Source passage** — article slug or chapter name plus a few
     identifying words of the passage ("strategic-choices — 'both sides are
     smart'").
   - **(b) Forging decision** — "Phase 2/3 conversation — Jason confirmed
     <decision>". For things Jason decided during forging that aren't in the
     corpus.
   - **(c) UNGROUNDED** — neither. Flag it.

2. **Re-open sources as needed.** Read the corpus files again; re-run
   `jason-corpus-search` for claims you can't place. Do NOT ground from
   memory — memory of the corpus is exactly where drift hides.

3. **Patch the three failure classes:**
   - **Ungrounded** — the forger invented it. Show it to Jason: either he
     explicitly signs off (it becomes class b) or it gets cut.
   - **Contradiction** — the draft asserts X where the source says Y. Show
     Jason both, side by side. Fix the draft — or, if Jason is deliberately
     departing from his own published take, record that decision out loud
     (it becomes class b, with the departure named).
   - **Drift** — a paraphrase that changed the meaning, scope, or strength
     of the original ("usually" became "always"; a two-condition rule lost a
     condition). Tighten the draft to match the source. **Drift runs in
     both directions**: check for rules STRICTER than the source, not just
     weaker. (Real case: a draft banned all willingness-to-pay hypotheses
     as "purchase referendums" when Jason's canonical example list
     explicitly contains "will pay $50/mo" hypotheses — the source bans
     asking "would you buy?", not holding priced beliefs. Over-restriction
     is invented doctrine, just as much as over-loosening.)

4. **Show Jason the summary**: counts per grounding class, plus every flag
   and how it was resolved. His sign-off gates Phase 6.

---

## Phase 6 — Adversarial review

Goal: stress-test the draft before it ships. Be hostile to your own work.

Run these tests; patch the on-disk SKILL.md after each:

1. **Description targeting.** Write 8 plausible user prompts: 4 that SHOULD
   trigger this skill, 4 that look similar but should NOT. For each, predict
   whether a model reading just the description (no body) would load this
   skill. Any miss = revise the description.

2. **Cold read.** Re-read the draft body as if you had never seen the
   corpus. List every place you'd be confused, every term you'd guess at,
   every step where you wouldn't know what to do. Patch all of them.

3. **Adversarial user.** Imagine a user who describes their situation
   ambiguously or in a way that *looks* like a match but isn't. Walk through
   the skill. Does it confidently misapply? If yes, strengthen refusal
   conditions or add a clarifying-question step.

4. **Wielding-posture audit (both directions).** Two failure modes to check:
   - **Too soft:** does the draft let the wielder accept the end user's
     first vague answer? Does it walk through the framework politely without
     pressing? If yes, patch in tenacious follow-up — name the specific gap,
     refuse weak inputs, propose-and-defend.
   - **Too harsh:** does the draft instruct or license the wielder to be
     curt, dismissive, or scolding toward the end user? Forging-time grilling
     tone is for you-and-Jason only. Wielding tone is gentle-but-forceful —
     sharp coach, not drill sergeant. Acknowledge before pushing, offer
     guesses when the end user is stuck, never make them feel bad.
   Both failure modes ship broken skills. Patch wherever the balance is off.

5. **Portability scan.** Grep the draft for Claude-Code-isms: `$ARGUMENTS`,
   `allowed-tools`, `context:`, `subagent`, `slash command`, `/`-commands,
   references to this repo. Any hit = remove or rewrite.

Show Jason the post-review diff and get sign-off.

---

## Phase 7 — Simulated use

Goal: watch the draft skill actually being wielded before it ships. Prose
review (Phases 5–6) catches textual failures; only simulated use catches
behavioral ones — a wielder that recites instead of applies, nods along with
weak answers, or forgets to refuse.

Follow the procedure in `.claude/skills/exercise-asb-skill/SKILL.md` against
the on-disk draft:

1. Quarantine: the wielder side of each role-play uses ONLY the draft file.
2. 3–5 scenarios, required mix: canonical user, terse/underspecified user,
   boundary case, refusal case (optionally a lazy answerer). Show the list
   to Jason before running.
3. Run labeled transcripts; judge each against the fixed rubric (applied vs.
   recited, specific vs. generic, dwell fired, refusal fired, tone/substance
   split, artifact handling).
4. Patch the draft for every FAIL/WEAK; re-run only the failed scenarios
   until clean.
5. Show Jason the verdict table and the resulting draft diff. His sign-off
   gates Phase 8.

---

## Phase 8 — Publish

Goal: polish the wrapper, lint, build, report. The .mdx wrapper has been
live and updated continuously since Phase 0; by now it should be most of
the way there.

### Steps

1. **Final polish of `src/content/skills/asb-<slug>.mdx`.** Re-read it
   cold and tighten anything that still feels rambly. Apply the marketing
   voice (see "Marketing voice" below):
   - `title:` — hook + descriptive. Reads like something a reader would
     want to click on, not a label on a filing cabinet.
   - `summary:` — one sharp benefit-first line, under ~150 chars. Lead
     with what the reader gets, then how. Used for site listing and
     `<meta description>`.
   - **`## What this is about`** — 2–4 paragraphs that open with the
     reader's payoff. Concrete, no jargon, **second-person voice** ("you,"
     not "the user"). Should make the reader want to install the skill. The
     dedicated `## Example invocation` section below handles the concrete-
     example work; the description doesn't need to repeat that.
   - **`## Example invocation`** — confirm the slash-command code block is
     realistic, and that the prose after it is one or two sentences
     (roughly what happens and what you walk away with — NOT a step-by-step
     how), in second-person voice, no literal LLM output.
   - `related:` — at Phase 8, ask Jason whether this skill should list any
     existing public skills as natural follow-ons. If yes, add a `related:
     [asb-foo, asb-bar]` array to the frontmatter. Each named skill must be
     an existing public skill (lint errors on unknowns). One-directional;
     don't worry about the reverse pointer unless the other skill should
     also point here. If there are no obvious follow-ons, leave the field
     out entirely — the "Related skills" section just won't render.
   - **`## From the source`** — confirm Foundation (1–2 critical) and
     Supporting (rest) are correctly split, each item has a one-line why-
     relevant explanation, no "(A Smart Bear)" suffix anywhere. If
     Supporting ended up empty, drop the lead-in line and the empty bullet
     list rather than leaving an empty section.
   - Ask Jason whether to add `order:` (integer; controls sidebar/home
     position) and `featured: true|false` (surfaces on home page). Both
     optional.

2. **Run lint and build:**
   ```sh
   bun run lint
   bun run build
   ```
   Report results. If lint fails, fix and re-run.

3. Tell Jason: file paths written, lint/build status, confirmation that
   Phases 5 (source-map audit) and 7 (simulated use) both passed, and the
   suggested next step (`bun run dev` to preview locally, then commit and
   push).

---

## Skill families and chained artifacts

Some skills come in families — sequential steps of one method, each
consuming the previous step's output file (proven pattern:
`asb-interview-goals` → GOALS.md → `asb-interview-hypotheses` →
HYPOTHESES.md → `asb-interview-questions` → QUESTIONS.md). When forging a
family member, apply these conventions:

- **Shared slug namespace** (`asb-<family>-<step>`) and numbered-item
  conventions that chain: each artifact's items get stable prefixed
  numbers (G1…, H1…, Q1…) and later artifacts cite earlier ones by those
  numbers (`[G4]`, `[H2, H7]`). Numbers freeze when a file is finalized,
  since downstream steps cite them.
- **Output file lives in the same directory as the input file.**
- **Self-containment still holds, via graceful description.** A family
  member never *requires* its siblings: it accepts the input artifact
  from any source (file or pasted), describes the artifact rather than
  naming the producing skill ("a goal-question list, numbered G1, G2, …"),
  and its Next-steps prose describes how to continue the method in
  method terms. BUT at the handoff moment — the closing "here's what
  comes next" line — the skill should ALSO name the sibling that
  performs the next step, invoke-if-installed style ("when you're
  ready, run `asb-interview-learning` on this directory"). Live-use
  lesson: a wielder described the synthesis step perfectly but never
  said which installed skill runs it, leaving the user knowing WHAT
  comes next but not HOW; the method description is the fallback, the
  named sibling is the affordance.
- **Invoke-if-installed is the sanctioned exception** to the
  no-references rule: a public skill MAY name another public asb-* skill
  as an *optional* enhancement ("if a devil's-advocate skill such as
  *Rude Q&A* / `asb-rude-qa` is installed, invoke it with this brief: …")
  PROVIDED an equivalent inline fallback is fully specified so the skill
  works standalone. Jason approved this pattern explicitly; the fallback
  is not optional.
- **Description boundaries between siblings.** Each family member's
  `description` must route correctly against its neighbors: the earlier
  skill's "Do NOT load" names the later step ("…or when a goal-question
  list already exists and the user wants hypotheses"), and each
  description names its input and output artifacts.
- **Wrapper `related:` links chain the family** (each step points at the
  next, and back), and each wrapper's long description says where the
  step sits in the method ("This is the second step of…").
- **`order:` enforces method sequence on the site.** Family members get
  consecutive `order:` values in method order (the asb-interview-*
  family holds 20, 21, 22) so the sidebar and home page list the steps
  in the order they're meant to be used — never rely on alphabetical
  accident. A new step slots into the family's block.

## Marketing voice (for title, summary, and long description in the .mdx)

The wrapper is the public face of the skill on the website. Title and
summary are **marketing copy**, not labels. They have to pull a reader in
and earn the click. Apply this voice from Phase 0 onward, and tighten in
Phases 2 and 8.

### Title (full per-page title, the `title:` field)

Hook + descriptive. The title MUST tell the reader what the skill is — a
pure hook with no information is a fail — but it should do so in a way
that's emotionally interesting, pithy, or evocative. The reader should
feel "what's that about, tell me more" and then immediately see what it
is. Pithy beats clinical; vague is unacceptable.

- ❌ Clinical/labeling: "Acquisition diagnostic skill", "Pricing framework"
- ❌ Vague hook: "Sharpen your thinking", "Get unstuck"
- ✅ Hook + descriptive: "Diagnose why your acquisition channel is broken",
  "Stress-test an idea until it cracks or sharpens"

### Card title (the `cardTitle:` field) — short home-card label

The home-page card has limited width and shows a stack of (cardTitle →
hook → slug). The full `title:` is usually too long to fit cleanly on a
card. `cardTitle:` is the 1–3-word version — the everyday name for the
skill, not the marketing subtitle.

- title: *"Rude Q&A: The Constructive Devil's Advocate"* → cardTitle: *"Rude Q&A"*
- title: *"Diagnose why your acquisition channel is broken"* → cardTitle: *"Acquisition diagnostic"*

If the `title:` is already short (≤ 3 words), omit `cardTitle:` and it
falls back to `title`.

### Hook (the `hook:` field) — verb-led card one-liner

Renders on the home-page card under the cardTitle. Distinct from
`summary`: the hook is meant to be *scanned* in one beat, the summary is
read. Verb-led, present-tense, 5–8 words. Falls back to `summary` if
omitted, but `summary` is usually too long for the card.

- ❌ Description: "A skill for stress-testing your plans."
- ❌ Adjective-led: "Sharp, unsparing devil's advocate for your plans."
- ✅ Verb-led: "Grills your plan until it cracks."
- ✅ Verb-led: "Diagnoses why your funnel is broken."

### Summary (the one-line `summary:` field)

**Benefit-first.** Lead with what the reader GETS — the outcome, the
problem solved, the change. THEN briefly say HOW (what the skill is /
does). Not the other way around. Verbs of *transformation* over verbs
of *description*.

- ❌ Description-led: "This is a devil's-advocate interrogator that asks
  hard questions about your plan."
- ✅ Benefit-led: "Stress-test your ideas to a fine point with a relentless
  devil's-advocate interrogation that surfaces every weak assumption."

The summary doubles as the site's `<meta description>` for that page, so
it's also doing SEO work — search-result snippet style.

### Input / Output (the `input:` and `output:` fields)

These render as a small two-row tile above the install box on the per-
skill page — Input across the top, Output across the bottom — giving the
reader a glance-level shape of the skill. Both must be set for the tile
to render; if only one side applies, leave both blank.

Voice: terse, concrete, scan-readable. Not prose. One sentence each.

- ✅ `input:` *"A plan, pitch, decision, or positioning — a one-line dilemma or a fully-supported brief."*
- ✅ `output:` *"A markdown document with sharpened decisions, accepted consequences, and the next questions you owe yourself."*
- ❌ `input:` *"Whatever you've got — anything works really."* (vague)
- ❌ `output:` *"Insights and clarity around your situation."* (fluff)

### `## What this is about` (the 2–4 paragraph body)

Open the FIRST paragraph with the reader's payoff — the change they get,
the problem this solves, the situation it cuts through. Make them want to
keep reading. THEN, in subsequent paragraphs, explain what the framework
is, when it applies, and how the wielder actually facilitates it. The
dedicated `## Example invocation` section that follows handles the
concrete-example work; don't shoehorn an example into the description.

Concrete, no jargon. If a sentence could appear in any skill's
description, it's filler — cut it. The reader should finish the section
already convinced it's worth installing.

### Second-person voice — everywhere in the .mdx

Address the reader directly: "you," not "the user" / "a user" / "the
end user." This includes the `## What this is about` paragraphs, the `## Example invocation` section's
lead-in and prose paragraph, and any other prose in the wrapper. The
wrapper is the website page — it's talking to the reader, not describing
them in third person.

- ❌ "A user might invoke the skill like this:"
- ✅ "You can invoke the skill like this:"
- ❌ "After reading the outline, the user is pressed on whether…"
- ✅ "After reading your outline, you're pressed on whether…"

The `## From the source` bullets are an exception — they describe
articles, not the reader, so third-person prose about each article is
correct there.

### Test the voice

Read your draft as if you were the reader scrolling the home page. Does
the title make you want to click? Does the summary make you want to read
the body? Does the body make you want to install the skill? If any answer
is "no" or "meh," it's not done.

---

## The `## From the source` section in the .mdx wrapper

The wrapper has one references section, titled `## From the source`,
structured into two parts (Foundation + Supporting). The exemplar at
`src/content/skills/asb-rude-qa.mdx` shows the full shape. The template
at `.claude/skills/create-asb-skill/template.mdx` is the authoritative
scaffold — copy it at Phase 0 and fill in.

### Foundation — the 1–2 critical sources

Lead with a short prose sentence identifying the foundational article(s).
Variants depending on count:

- One critical article: *"The primary article behind this skill is
  [**Title**](URL), where Jason …"*
- Two critical articles: *"Two articles form the foundation of this
  skill:"* followed by a bullet list with both.

Each Foundation bullet is a bolded link to the article followed by an
em-dash and one line on **why this article is critical / what role it
plays** in the skill — not just a paraphrase of the article. E.g. *"the
technique itself, including why unfair questions are a feature rather
than a flaw"* or *"the philosophical scaffolding underneath — Rude Q&A is
the operational answer to the question this article poses."*

### Supporting — everything else

Lead with one prose line identifying what kind of role these articles
play, e.g. *"Supporting articles each cover a piece of the mechanism or
the target the interrogator is reaching for:"* — adapt the phrasing to
the skill.

Each Supporting bullet is the bolded link + em-dash + one line on what
**specific piece** of the framework, mechanism, target, or refusal-
condition this article supplies. Not a generic "related reading" tag —
explain the precise relationship.

If there are zero Supporting items, omit the lead-in line and the empty
bullet list entirely. Don't leave the prose stub stranded.

### Item formatting rules

- **A Smart Bear articles**: `https://longform.asmartbear.com/<slug>/`
  - The `<slug>` is the on-disk filename without the `.md` extension.
    File `pricing-determines-your-business-model.md` →
    `https://longform.asmartbear.com/pricing-determines-your-business-model/`
  - **The trailing slash is required.**
- **Hidden Multipliers book**: the book is not online chapter-by-chapter.
  Reference the chapter (and subsection, if relevant) using Jason's
  standing convention: `As in Chapter <N> of *Hidden Multipliers*:
  *<Chapter title>* (section "…")`. The URL is always just
  `https://hiddenmultipliers.com`.
  - Example: `As in Chapter 10 of *Hidden Multipliers*: *A multiplier of one's own* (section "How to Extract Insights from Customers") — [hiddenmultipliers.com](https://hiddenmultipliers.com)`
  - The `source:` frontmatter title follows suit: `"Chapter 10 of Hidden Multipliers: A multiplier of one's own"`.
- **MDX gotcha**: `<https://example.com>` autolinks BREAK the MDX build
  (the parser reads `<h` as a JSX tag). Always use
  `[text](https://example.com)` form in wrapper files.
- Bold the article title inside the link (`[**Title**](URL)`).
- **Do NOT append "(A Smart Bear)"** after each item — the URL makes the
  source obvious; the suffix is noise.
- Italicize chapter and book names. Don't link to local Obsidian paths —
  those files are never published.

---

## Operating principles across all phases

- **Press hardest in Phases 2 and 3.** Those are where vague skills are
  born. Phases 5–7 carry their own structured adversarial mechanisms;
  light adversarial energy in Phases 1 and 4 is fine.
- **Don't fill in answers for Jason.** Propose, then ask. The goal is *his*
  framework on the page, not yours.
- **Don't ask permission to read.** Reading more of the corpus is always
  cheap; asking Jason "should I read X?" for each candidate is friction
  and a sign you're hedging. Skim widely, then bring back what's germane.
  Only ask before reading if a hit is obviously off-topic.
- **Keep the .mdx updated as you go.** The wrapper at
  `src/content/skills/asb-<slug>.mdx` is a live working artifact, created
  at Phase 0 from `template.mdx` and edited continuously. Whenever you
  learn something the wrapper should reflect — a new primary source, a
  good further-reading hit, a sharper way to phrase the framework, a
  better summary line — open the file and update it then. Don't batch
  wrapper edits to Phase 8. Earlier text is allowed (encouraged) to be
  rough; later edits sharpen it. The summary in particular should evolve
  from broad placeholder at Phase 0, to sharp one-liner by Phase 2, to
  polished by Phase 8.
- **One concept per skill.** If during distillation the framework keeps
  splitting in two, stop and ask whether this should be two skills.
- **Re-read `.claude/skills/CLAUDE.md`** if you're unsure whether something
  belongs in the public skill — the public/dev-only rules are strict.
- **Use `jason-corpus-search` liberally in Phase 1.** Several queries with
  different phrasings surface more than one careful query.
- **Resuming**: if Jason points you at an in-progress SKILL.md and says
  "continue," read it, ask which phase he wants to resume at, and proceed.
- **The adversarial posture is the meta-lesson.** The same pressing-for-
  sharpness energy you use on Jason during forging is what most produced
  asb-* skills should apply to their end users during wielding. Carry it
  through — and use the words "forging" and "wielding" explicitly in chat
  with Jason so the two layers don't blur.
