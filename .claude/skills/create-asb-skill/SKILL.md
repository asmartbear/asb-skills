---
description: "Interactive, multi-phase workflow for authoring a new public asb-* skill from one of Jason Cohen's concepts. Invoke explicitly via /create-asb-skill — auto-invocation is disabled to avoid accidentally kicking off this long workflow."
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.claude/skills/jason-corpus-search/search.sh:*), Bash(bun run lint:*), Bash(bun run build:*), Bash(mkdir:*), Bash(ls:*), AskUserQuestion
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

### Forging-time state — no side file

The work product is the state:

- Phases 1–3 happen in chat. Jason can ask you to summarize at any point.
- From Phase 4 onward, the partial `.claude/skills/asb-<slug>/SKILL.md` on
  disk IS the resumption point. If the session ends mid-draft, the file is
  the memory.
- The `.mdx` wrapper is written last (Phase 6).

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
   or chapter names. Capture as many as he names.

Confirm back what you heard. Move to Phase 1.

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

3. **Triage hits with Jason.** Present adjacent results with one-line
   summaries. Use `AskUserQuestion` (multi-select) to let Jason mark which
   are actually relevant. Read the confirmed ones.

4. **Hold in working memory** (and summarize back to Jason):
   - **Direct quotes worth preserving** with source attribution.
   - **Vocabulary** Jason uses for this concept — his actual terms.
   - **Examples** (companies, scenarios, anti-patterns).
   - **Adjacent frameworks** he connects this to.
   - **Open questions** — places where the corpus is fuzzy that Phase 2 will
     need to press for precision.

5. **Track the canonical source list** for the .mdx wrapper later:
   - Each article → `{slug, title, url: https://longform.asmartbear.com/<slug>/}`
     (note the trailing slash — required)
   - Each chapter → `{title, section?}`

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

3. **Interaction shape.** Which of these — and why?
   - Diagnostic walk-through (ask, listen, classify).
   - Generation/proposal (LLM produces an artifact, user refines).
   - Audit (LLM evaluates user's existing thing against the framework).
   - Coaching (LLM presses user with questions, doesn't propose).
   - Multi-phase facilitation (LLM walks user through a long process, maybe
     across sessions).

4. **Wielding artifact — does the produced skill need one?** Some skills
   facilitate a multi-step process for the end user (a diagnostic
   worksheet, a positioning exercise, a pricing audit) where intermediate
   state is worth persisting across sessions. If so, the SKILL.md should
   instruct the wielder to create and update a markdown file at an end-
   user-chosen path, tracking phase and decisions. Decide explicitly:
   - Is the process long enough or multi-session enough to warrant a file?
   - What goes in it? (A YAML header tracking current phase, plus captured
     decisions.)
   - Who chooses the path? (End user, with a sensible default.)
   - Most skills DON'T need a wielding artifact — only opt in when the
     process genuinely spans sessions or produces a deliverable the end
     user would want to keep.

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

---

## Phase 4 — Draft SKILL.md

Goal: write the actual `.claude/skills/asb-<slug>/SKILL.md`. From this phase
on, the on-disk file is the working draft. `mkdir -p` the directory if it
doesn't exist; write the file; iterate with Edit.

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

## Phase 5 — Adversarial review

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

## Phase 6 — Publish

Goal: land the wrapper, lint, report.

### Steps

1. **Write the wrapper** `src/content/skills/asb-<slug>.mdx`. Template:

   ```mdx
   ---
   title: <skill display title>
   summary: <one line, ~150 chars max — used for site listing and <meta description>>
   order: <integer, optional — controls position in sidebar/home list>
   featured: <true|false, optional — surfaces on home page>
   ---

   <2–4 paragraphs of public-facing marketing/explanatory prose. Tone:
   inviting, concrete, no jargon. Should make the reader want to install
   the skill. Often includes a short example of what the skill does in
   practice — e.g. "Ask Claude to apply this skill to your X, and it will…".>

   ## Where this comes from

   - [<article title>](https://longform.asmartbear.com/<slug>/) (A Smart Bear)
   - *<Chapter name>* (section "<subsection>", if applicable) in *Hidden Multipliers* — <https://hiddenmultipliers.com>
   ```

   Ask Jason for `title`, `summary`, and whether to set `featured` / `order`.
   Propose defaults derived from the Phase 2/3 conversation.

2. **Run lint and build:**
   ```sh
   bun run lint
   bun run build
   ```
   Report results. If lint fails, fix and re-run.

3. Tell Jason: file paths written, lint/build status, suggested next step
   (`bun run dev` to preview locally, then commit and push).

---

## URL rules (for the wrapper .mdx)

These appear in the wrapper's "Where this comes from" section.

- **A Smart Bear articles**: `https://longform.asmartbear.com/<slug>/`
  - The `<slug>` is the on-disk filename without the `.md` extension.
    File `pricing-determines-your-business-model.md` →
    `https://longform.asmartbear.com/pricing-determines-your-business-model/`
  - **The trailing slash is required.**
- **Hidden Multipliers book**: the book is not online chapter-by-chapter.
  Reference the chapter (and subsection, if relevant) by name in prose.
  The URL is always just `https://hiddenmultipliers.com`.
  - Example: `*Pricing power* (section "The whale curve") in *Hidden Multipliers* — <https://hiddenmultipliers.com>`

Italicize chapter and book names. Don't link to local Obsidian paths — those
files are never published.

---

## Operating principles across all phases

- **Press hardest in Phases 2 and 3.** Those are where vague skills are
  born. Light adversarial energy in Phases 1, 4, 5 is fine.
- **Don't fill in answers for Jason.** Propose, then ask. The goal is *his*
  framework on the page, not yours.
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
