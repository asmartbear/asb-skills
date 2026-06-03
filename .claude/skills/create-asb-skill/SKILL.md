---
description: "Interactive, multi-phase workflow for authoring a new public asb-* skill from one of Jason Cohen's concepts. Invoke explicitly via /create-asb-skill — auto-invocation is disabled to avoid accidentally kicking off this long workflow."
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(.claude/skills/jason-corpus-search/search.sh:*), Bash(bun run lint:*), Bash(bun run build:*), Bash(mkdir:*), Bash(ls:*), Bash(cp .claude/skills/create-asb-skill/template.md:*), AskUserQuestion
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

- The `.mdx` wrapper at `src/content/skills/asb-<slug>.mdx` is created at
  Phase 0 from `template.md` and is **kept current through every phase** —
  references go in as you read them, the summary and long description
  sharpen as the framework crystallizes. If the session ends mid-stream,
  the on-disk .mdx already reflects everything decided so far.
- The SKILL.md at `.claude/skills/asb-<slug>/SKILL.md` is created at Phase
  4. From that point on, the on-disk file is the working draft and the
  resumption point for the SKILL.md side.
- Phases 1–3 don't write any SKILL.md yet (decisions accumulate in chat
  and in the .mdx). Phase 6 polishes both files and lints.

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

Copy `.claude/skills/create-asb-skill/template.md` →
`src/content/skills/asb-<slug>.mdx` and fill in what you know now. Write
title and summary in the **marketing voice** described below — these are
not labels, they're hooks. Don't aim for perfect at Phase 0; aim for
"clearly already trying to sell it." Later phases sharpen.

- `title:` — hook + descriptive. See "Marketing voice."
- `summary:` — benefit-first one-liner. See "Marketing voice."
- Long description — one rough sentence is enough at Phase 0, but already
  led by the reader's payoff, not "this skill does X."
- **Primary references** — record each source Jason named, as a proper
  bullet (article URL with trailing slash, or italicized chapter name).
  See "URL rules" near the end of this document.
- **Further reading** — leave the TODO marker; Phase 1 fills this in.

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
   and append references as you read them:
   - Articles Jason explicitly named → **Primary references**.
   - Articles/chapters the corpus search surfaced that you skimmed and
     found useful → **Further reading**.
   - URL format: `https://longform.asmartbear.com/<slug>/` (trailing slash
     required). Chapters: `*Chapter name* (section "...") in *Hidden Multipliers* — <https://hiddenmultipliers.com>`.
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

### Update the .mdx with a concrete usage example

Now that the interaction shape is clear, add a short concrete example to
the long description in `src/content/skills/asb-<slug>.mdx` — something
like "Ask Claude to apply this skill to your <X>, and it will walk you
through <process> until you have <output>." Keep it inviting and grounded
in real situations the end user would recognize.

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
   - Long description — 2–4 paragraphs that open with the reader's
     payoff. Concrete, no jargon. Should make the reader want to install
     the skill. Should include the usage-example sentence added in Phase 3.
   - **Primary references** — confirm each one has a proper link and is
     actually a primary source, not adjacent reading.
   - **Further reading** — confirm any items here are real, useful, and
     non-redundant with Primary. If the section ended up empty, remove
     the heading entirely rather than leaving an empty section.
   - Ask Jason whether to add `order:` (integer; controls sidebar/home
     position) and `featured: true|false` (surfaces on home page). Both
     optional.

2. **Run lint and build:**
   ```sh
   bun run lint
   bun run build
   ```
   Report results. If lint fails, fix and re-run.

3. Tell Jason: file paths written, lint/build status, suggested next step
   (`bun run dev` to preview locally, then commit and push).

---

## Marketing voice (for title, summary, and long description in the .mdx)

The wrapper is the public face of the skill on the website. Title and
summary are **marketing copy**, not labels. They have to pull a reader in
and earn the click. Apply this voice from Phase 0 onward, and tighten in
Phases 2 and 6.

### Title

Hook + descriptive. The title MUST tell the reader what the skill is — a
pure hook with no information is a fail — but it should do so in a way
that's emotionally interesting, pithy, or evocative. The reader should
feel "what's that about, tell me more" and then immediately see what it
is. Pithy beats clinical; vague is unacceptable.

- ❌ Clinical/labeling: "Acquisition diagnostic skill", "Pricing framework"
- ❌ Vague hook: "Sharpen your thinking", "Get unstuck"
- ✅ Hook + descriptive: "Diagnose why your acquisition channel is broken",
  "Stress-test an idea until it cracks or sharpens"

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

### Long description (the 2–4 paragraph body)

Open the FIRST paragraph with the reader's payoff — the change they get,
the problem this solves, the situation it cuts through. Make them want to
keep reading. THEN, in subsequent paragraphs, explain what the framework
is, when it applies, and how the wielder actually facilitates it. Close
with the concrete usage example from Phase 3 ("Ask Claude to apply this
skill to your X, and it will…").

Concrete, no jargon. If a sentence could appear in any skill's
description, it's filler — cut it. The reader should finish the body
already convinced it's worth installing.

### Test the voice

Read your draft as if you were the reader scrolling the home page. Does
the title make you want to click? Does the summary make you want to read
the body? Does the body make you want to install the skill? If any answer
is "no" or "meh," it's not done.

---

## Reference sections in the .mdx wrapper

The wrapper has two reference sections, each holding any number of items
(including zero — drop the heading entirely if empty):

- **Primary references** — the article(s) and chapter(s) Jason explicitly
  named as the source for the concept. Usually 1–3.
- **Further reading** — adjacent articles or chapters that informed the
  skill (surfaced by the Phase 1 corpus search) and are worth pointing the
  reader at for more depth. Any number.

Both sections use the same item formats:

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
- **Don't ask permission to read.** Reading more of the corpus is always
  cheap; asking Jason "should I read X?" for each candidate is friction
  and a sign you're hedging. Skim widely, then bring back what's germane.
  Only ask before reading if a hit is obviously off-topic.
- **Keep the .mdx updated as you go.** The wrapper at
  `src/content/skills/asb-<slug>.mdx` is a live working artifact, created
  at Phase 0 from `template.md` and edited continuously. Whenever you
  learn something the wrapper should reflect — a new primary source, a
  good further-reading hit, a sharper way to phrase the framework, a
  better summary line — open the file and update it then. Don't batch
  wrapper edits to Phase 6. Earlier text is allowed (encouraged) to be
  rough; later edits sharpen it. The summary in particular should evolve
  from broad placeholder at Phase 0, to sharp one-liner by Phase 2, to
  polished by Phase 6.
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
