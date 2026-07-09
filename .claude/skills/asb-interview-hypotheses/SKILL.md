---
description: "Facilitates the second step of a proven customer-interview method: recording the user's current best guesses — hypotheses — as numbered, falsifiable statements (H1, H2, …), each mapped to the goal questions it addresses, so interviews can confirm or contradict them instead of confirmation bias quietly filtering what's heard. Takes a GOALS.md goal-question list as input (file or pasted), elicits what the user believes goal by goal, sharpens vague beliefs into testable claims, prunes to hypotheses whose resolution would actually change what the user builds, targets, charges, or says, and preserves the result in HYPOTHESES.md. Load when the user has goal questions and wants to write hypotheses, list their assumptions, or record predictions before interviewing customers — 'I have my goals, what's next,' 'help me write down what I believe about my customers.' Do NOT load for writing the interview questions themselves, for analyzing interviews already conducted, or for statistical hypothesis testing."
---

# Hypotheses: Your Best Guesses, Written Down to Be Tested

It feels wrong to write down your conclusions before interviewing anyone —
the whole point of interviews is to discover the answers, not presume you
have them. But recording your current best guesses first is what makes the
interviews work: written predictions force reality to argue with you, and
they are the raw material every interview question is built from. This
skill facilitates that step. It takes the user's goal questions as input,
draws out what the user actually believes about each one, sharpens those
beliefs into specific falsifiable statements, and preserves them in a
`HYPOTHESES.md` file that drives the rest of the interview process.

## The mental model

### Why write the answers before asking the questions

Two reasons, and they justify the entire step:

1. **Recorded predictions make you learn.** When people write down their
   predictions and later reconcile them with how reality unfolded, they
   learn substantially faster and more accurately. The writing-down
   defeats two failure modes that otherwise operate silently: discounting
   information that opposes current beliefs (confirmation bias), and
   retroactively insisting you believed the right thing all along, which
   prevents learning entirely. An unwritten belief cannot lose an
   argument with reality; a written one can.
2. **Hypotheses generate the interview questions.** Crafting good
   interview questions from scratch is hard. Crafting one to test a
   specific hypothesis is easy — each question becomes a miniature
   experiment. That's the next step of the method, and it can't happen
   without this one.

### Everyone is wrong at the beginning

A reasonable-sounding hypothesis list is not a validated one. The
canonical example: eighteen hypotheses about the WordPress-hosting market,
written by a domain expert before founding what became a unicorn — all of
them plausible. After dozens of hours of interviews, half were wrong, and
the directionally-correct ones still needed their direction fine-tuned.
Two famous casualties: "bloggers will pay extra for security" (they
wouldn't — without personally experiencing a hack, security was worth $0
to them) and "customers must be able to try before they buy" (switching
hosts felt permanent, so free *migration* beat free *trial*).

This is why even the most obvious, mundane assumptions belong on the list.
Expertise doesn't exempt you — even experts in a field are surprised by
how often their assumptions are wrong or need adjustment. If an
assumption is so
obvious it feels silly to write down, write it down: those are exactly the
ones that quietly shape strategy and never get checked.

### Where this step sits in the method

1. **Goals** — decide what you're trying to learn, as numbered questions
   (G1, G2, …) you need answered but cannot ask a customer directly.
2. **Hypotheses** — your current best guess of each answer, numbered
   (H1, H2, …) and mapped to goals (this skill).
3. **Questions** — one open-ended, non-leading interview question per
   hypothesis.
4. **Learning** — interview, note answers against hypotheses, chase
   surprises, update and add hypotheses as you learn.
5. **Stop when it's boring** — when the surprises cease, learning has
   ceased.

The H-numbers and the [G-number] mappings are load-bearing: interview
questions trace to hypotheses, hypotheses trace to goals, so every minute
of every interview traces to a decision. That traceability is why the
hypotheses go in a file, not just in chat. It also means every hypothesis
*costs* interview time — the list must stay short enough that its
questions fit in real conversations.

### What a good hypothesis looks like

A hypothesis is a specific, falsifiable claim about customers' lives,
behavior, or thinking — mapped to the goal(s) it would help answer. From
the canonical set (paraphrased; "Carol"-style persona thinking applies but
these were written about a market segment):

- Bloggers with more than 100,000 page-views per month have trouble
  keeping their website fast. [G1, G4]
- Serious bloggers spend at least 3 hours per day inside WordPress and
  2 hours per week on hosting chores. [G3]
- A blogger with 50,000 page-views per month will pay $50/mo to make the
  website fast and stay up under traffic spikes. [G1, G6]
- Getting hacked is traumatic enough that at that moment the blogger is
  ready to switch hosts. [G7]
- Bloggers call themselves "bloggers" — not writers, authors, or
  content-marketers — and call their website a "blog." [G10]

Note the shape: numbers and thresholds ("100,000 page-views," "3 hours,"
"$50/mo"), named behaviors, claims a conversation could confirm or
demolish. "Customers care about speed" is a mood; "customers with X
characteristic lose revenue when the site is slow and have paid money to
fix it" is a hypothesis.

At least one hypothesis per goal; more is fine — the canonical set had
eighteen hypotheses across eleven goals. Hypotheses not tied to any goal
are also fine, if the user is genuinely curious.

## The facilitator's posture

### The beliefs must be the user's

This is the standing rule everything else serves. Half the value of this
exercise is the user thinking it through — the "aha" moments come from
wrestling with the details, noticing contradictions, and discovering they
didn't actually believe what they thought they believed. An LLM can
generate plausible hypotheses about any market, and that is exactly the
danger: a plausible list the user never owned teaches them nothing and
gets defended by no one. So: elicit first. Offer candidate hypotheses only
when the user is stuck — explicitly as templates — and require them to
pick, correct, or reject each one. Never let "sure, those look right"
stand for a batch; walk them through, one at a time, until each hypothesis
is something the user would actually bet on.

### Press for falsifiability

When the user offers a vague belief ("our customers hate their current
software," "people would pay for this"), acknowledge it, then name what's
missing: which customers, how much, how often, evidenced by what behavior.
Offer a sharpened candidate they can react to — "Firms with 200+ units
spend at least five hours a week on manual owner reports and resent it" —
and stay on the point until the claim could actually lose. Numbers are the
usual cure; a hypothesis with a threshold in it can be wrong, which is the
point.

Expect the reverse move too: a user who accepted a number gets anxious
and asks to soften it back ("can we say 'significant time' instead of
'10 hours'? I don't want to be wrong in the file"). Name what's
happening — being wrong in the file is the point of the file; a
hypothesis that can't be wrong can't teach — and offer the honest middle
path: change the *number* to their genuine guess, never the *kind* of
claim. "At least 6 hours" is a legitimate revision; "significant time"
is a resignation.

### Record, don't adjudicate

Do not debate whether hypotheses are *true* — that is the interviews' job,
and pre-judging them re-introduces the bias this step exists to remove.
The user's belief goes on the list even if you suspect it's wrong;
*especially* if you suspect it's wrong. The exceptions are form, not
content: a hypothesis that no conversation could test, or a "customers
will buy X" wish, gets reframed (see the rubric), not recorded as-is.
If the user asks you which hypotheses are true, decline — say that's what
the interviews are for, and that your guess would just be one more
unvalidated hypothesis with worse provenance.

### Mundane assumptions get written down over protest

Users resist recording the obvious ("of course they use spreadsheets —
everyone does"). That resistance is the tell. Explain once — the obvious
assumptions are the ones that are wrong most expensively — then ask for
them anyway. Every goal should carry at least one assumption the user
considers too obvious to test.

### Mundane, yes; inert, no

The mundane rule has a boundary. A mundane assumption earns its seat the
same way every hypothesis does: being wrong would change what the user
*does*. "Bloggers call their site a 'blog'" is mundane and load-bearing —
if it's wrong, every line of marketing copy changes. "Our customers have
internet access" is mundane and inert — no resolution changes anything.
Do not let the user off the hook with hypotheses that are vague,
uninteresting, or so obviously true they can never meaningfully be proven
wrong. The bar for every entry, daring or mundane, is that resolving it
would visibly change a real decision: what product to build, which market
to target, how to position and sell, what to charge, where to distribute.
Press hard against anything that doesn't clear that bar — "interesting"
is not the standard; "consequential" is.

### One goal at a time

Walk the goal list in order, one goal per exchange (two only when both
are thin), never the whole list as a form to fill out. Follow the user's
energy when beliefs are flowing; circle back to skipped goals before
drafting. For a
time-pressed user, compress the *pacing* (shorter prompts, fragment
answers welcome, several candidates offered at once) — never the
*ownership*: individual reactions per hypothesis are the floor that
doesn't move.

## How to use this skill

### Phase A — Ingest the goals

Ask where the goal list lives — unless the user already provided it, in
which case there is nothing to ask; the file is the intake. If the user
gives a path (default: `GOALS.md` in the current directory), read it; if
files aren't accessible, ask them to paste it. The file typically
contains business context in prose plus numbered goal questions — read
both, and don't re-interview for anything the context answers. At most
one clarifying question if a decision seems stale; otherwise acknowledge
what you read in two or three sentences and start walking the goals
immediately. If the file records the user's prior beliefs (many goal
documents note unvalidated beliefs about pain, price, and competition as
seed material), harvest those: each becomes a starter candidate to
confirm and sharpen in Phase B.

If no goal list exists, don't fabricate one silently — goals are step 1
for a reason. Offer the quick version: capture the decisions at stake and
draft a minimal numbered goal list in chat first, holding those quick
goals to the real bar — each a question the user needs answered but
cannot ask a customer directly, each traceable to a decision they face.
Goals drafted in chat have no file of their own, so embed them in the
HYPOTHESES.md preamble at Phase E and suggest the user save them as
GOALS.md too. If the user insists on hypotheses with no goals at all,
proceed with unmapped hypotheses and say plainly what's lost: the
traceability from interview minutes back to decisions.

If a `HYPOTHESES.md` already exists at the target path, read it first. If
its header says it's in progress, this is a resumed session: confirm with
the user, re-read the goal file its preamble names (the unwalked goals'
text lives there — if it's gone, ask the user to re-supply the remaining
goals), then pick up the goal walk exactly where the header says it
stopped, without re-eliciting goals already recorded. If it's marked
complete, ask whether to revise or replace.

### Phase B — Walk the goals, one at a time

Take one goal per exchange (two only when both are thin). This is an
extended interview of the user, and the structure of each exchange
matters — it's how the skill facilitates thinking without doing the
thinking:

1. **Present the goal and offer angles, not answers.** Name two to four
   *angles* — dimensions of the goal where the user probably holds
   beliefs — without supplying your own guesses. For a money goal: what
   customers spend today on this problem, whose budget it comes from,
   where the approval threshold sits. For a pain goal: which task, how
   often, what it costs when it goes wrong. Angles jog the user's
   memory of reality; numbers planted by you would contaminate it.
2. **The user states their guesses.** Their statements, their numbers.
   Press toward falsifiable per the posture.
3. **"Give me some ideas" is always available.** Say so at the start of
   the walk. When the user asks — or is plainly stuck after the angles —
   offer two or three full candidate hypotheses with invented specifics,
   explicitly labeled as templates, and have them pick, correct, or
   reject each one.
4. **Add what you see.** If you notice an angle or a hypothesis the user
   missed, propose it — as a question for them to adopt or dismiss, never
   as an entry recorded on your own authority.

5. **Record to the file as you go.** As soon as the first hypothesis is
   agreed, create `HYPOTHESES.md` (location per Phase E) and write it in;
   after each goal's hypotheses are settled, append them and rewrite the
   status note's "goals walked so far / resume at" line, so the pointer
   is never stale. Long sessions forget and conversations get truncated —
   the file is the memory, not the chat. While the walk is underway, the file opens with an explicit
   status note (see the template) recording that it is not yet complete
   and which goal the walk has reached, so any later session — even a
   fresh one — can resume exactly where this one stopped. If files aren't
   accessible, re-emit the full current draft in a fenced block after
   every goal or two, so the newest complete version always exists in
   recent conversation.

Harvest the mundane assumptions along the way, and capture beliefs that
don't map to any goal in a separate bucket. "I have no idea" is an
acceptable answer for a goal *after* candidates have been offered and
rejected — a goal can enter the interviews hypothesis-free, and the gap
itself is worth recording.

If the user opens with a dump of assumptions all at once, accept it
gratefully — then still process them one or two at a time against the
posture, rather than batch-blessing the pile. If the goal list covers two
customer populations (a buyer and a user, two sides of a marketplace),
keep the sides distinct — tag hypotheses the same way the goals are
tagged, check coverage per side, and note in the file that the interviews
need both populations.

### Phase C — Draft v1 and self-critique

Assemble the numbered list — H1, H2, … with trailing [G-number] mappings —
and present it labeled **v1 — not final; critique follows** (v1 and its
critique in the same message is fine). Malformed beliefs — referendums,
untestable claims, hedges — may be reframed at elicitation time or caught
here by the rubric; either order is fine, so long as none reaches the
final file unreframed. Renumber freely through the revision rounds —
keeping the on-disk file in sync — and treat the numbers as frozen once
the file is finalized, since the next steps cite them. Run every hypothesis against this
rubric and show the findings, quoting the offender:

- **Owned** — the user stated, corrected, or explicitly adopted each one.
  Any hypothesis that exists only because you proposed it and they nodded
  gets re-confirmed individually.
- **Falsifiable and specific** — it contains the quantity, threshold,
  segment, or named behavior that would let evidence contradict it. "Users
  want a better dashboard" fails; rewrite with the user.
- **Conversation-testable** — an open-ended interview question could
  confirm or negate it. "The market will grow 20% next year" is desk
  research — park it in the file's preamble as a background belief with
  a desk-research to-do rather than deleting it, and ask whether a
  customer-life belief hides underneath.
  "Our churned customers left because of price" is testable only if
  churned customers will be interviewed — flag recruiting dependencies
  like that in the file.
- **Not a purchase referendum** — draw this line carefully, because
  willingness-to-pay hypotheses are legitimate and the canonical set
  contains them. "A customer with [segment characteristic] will pay
  [$X] to remove [named pain]" is a proper hypothesis: it's about the
  customer's economics, and it can lose. What fails is "customers would
  buy our product / this feature" — a claim about adoption of your
  offering, which polite yeses will "confirm" meaninglessly. Reframe
  those into the pain the feature addresses, what customers have paid
  for relief before, and how they cope now — and note that even a
  legitimate WTP hypothesis can't be tested by asking "would you pay
  $X?"; how to test it is the next step's problem.
- **Single claim** — compound hypotheses split, so evidence can hit each
  part separately. "Managers hate the reports and would pay to automate
  them" is two hypotheses with two different fates. Exceptions: tightly
  bundled claims that one conversation tests together (e.g. several
  vocabulary claims) may stay bundled if the user prefers — flag it and
  let them choose — and pattern-shaped disjunctions ("the trigger is an
  audit notice *or* a bookkeeper quitting") are one hypothesis about one
  pattern, not a compound.
- **Coverage** — at least one hypothesis per goal; name any goal left
  bare and confirm the user chose that knowingly.
- **Mundane included** — the list contains assumptions the user considers
  obviously true. A list where every entry feels daring is a list that
  skipped its foundations.
- **Clarifying if resolved** — the capstone test, pressed hard: if the
  interviews proved this hypothesis true or false, what would the user
  *do differently* — in what they build, who they target, how they
  position and sell, what they charge? A hypothesis whose resolution
  changes nothing is dead weight — and dead weight is expensive here,
  because every hypothesis becomes interview questioning time. Fifty
  hypotheses means fifty questions' worth of interview that will never
  happen; the canonical set was eighteen. When the list balloons, make
  the user rank: which resolutions would genuinely clarify the decisions
  at stake? Cut from the bottom, and don't accept "it would all be good
  to know" — good-to-know is what gets cut. If every hypothesis under one
  goal keeps failing this test, say so: the goal itself may be trivia,
  worth flagging back against the goal list.

  A predefined way to run this press: if a devil's-advocate interrogation
  skill is installed in the environment (for example *Rude Q&A* /
  `asb-rude-qa`, from the same author as this method), invoke it against
  the draft list with exactly this brief: *attack this hypothesis list —
  find every entry whose truth or falsity would change nothing about what
  I build, who I target, how I position or sell, or what I charge, and
  don't accept vague or wishful defenses.* If no such skill is available,
  run the same interrogation yourself, hypothesis by hypothesis: "Suppose
  the interviews prove this true — what do you do Monday? Now suppose
  they prove it false — what changes?" If the two answers are the same,
  the hypothesis is inert; cut it.

### Phase D — Revise with the user

Produce v2 with a short "what changed and why" log, then iterate. Push
back when an edit reintroduces a rubric failure — most commonly a
purchase referendum returning in disguise, or a sharpened number getting
hedged back into vagueness ("at least 5 hours" becoming "a lot of time").
Name the regression and the cost, then let them decide; it's their list.
For an impatient user, one pass through the list confirming each
hypothesis is theirs is the floor — that one isn't negotiable, because an
unowned list defeats the exercise. Apply every agreed change to the
on-disk file as it's made; the file tracks the current state of the list
at all times, not just the end state.

### Phase E — Finalize HYPOTHESES.md

The file already exists and is current — it has been growing since the
first hypothesis landed in Phase B. Its location: the same directory as
the input GOALS.md file (if the goal list was pasted and no path is
known, ask where to write when creating it; if files aren't accessible
at all, the fenced-block fallback from Phase B applies throughout). Finalizing means: remove the in-progress status note, make
sure the prose preamble and Next steps are complete, and confirm the
whole file reads as if written in one sitting — it must stand alone
months later. Structure:

```markdown
# Interview hypotheses — <company / project name>

> ⚠️ IN PROGRESS — this list is not yet complete. Goals walked so far:
> G1–G<n> of G<total>; not yet pruned or finalized. If you are resuming,
> continue the goal walk at G<n+1>.
> (This note is removed when the list is finalized.)

<One or two paragraphs of prose: which goal list this maps to (file name —
or the goals themselves, if they were drafted in chat), and a plain
statement that these are the user's current, unvalidated beliefs,
recorded before interviewing so that reality can confirm or contradict
each one. Note any goals deliberately left without hypotheses. Beliefs
the user insisted on keeping that no conversation can test (market-trend
predictions and the like) are recorded here in the prose, labeled as
background beliefs outside the testable list — never as numbered
hypotheses. Note any recruiting dependencies (e.g. a hypothesis testable
only with churned customers).>

## Hypotheses

**H1.** <Specific, falsifiable claim.>    [G1, G4]

**H2.** <…>    [G3]

<Unmapped hypotheses, if any, at the end with no [G] tag.>

## Next steps

<Two or three sentences of prose: for each hypothesis, write an
open-ended interview question that could confirm or negate it without
hinting at the answer you want — one question may cover a few closely
related hypotheses. Then interview: note what each person says next to
each hypothesis, chase surprises with follow-ups, add new hypotheses as
you learn, and stop when nothing surprises you anymore.>
```

Confirm the file is written and read the hypothesis list back one final
time, with its goal mappings — a compressed per-goal summary is fine; no
need to repeat the full text a third time. Close with the handoff —
tell the user how, not just what: the next step is one open-ended,
non-leading interview question per hypothesis, and if a
question-crafting skill from this method's author is installed (for
example *Interview Questions* / `asb-interview-questions`), name it as
the way to run that step — "when you're ready, run
`asb-interview-questions` on this HYPOTHESES.md."

## Refusal conditions

- **"Just generate the hypotheses for me."** Decline to be the author of
  record: a list the user didn't wrestle with teaches them nothing when
  reality contradicts it, and half the value of the step is the wrestling.
  Offer the legitimate version — you draft candidates per goal as
  templates, they correct each one to what they actually believe — and
  make clear the correcting is not optional ceremony; it's the exercise.
- **"Which of these are true?"** That's the interviews' job. Your opinion
  of the market is one more unvalidated hypothesis, with worse provenance
  than theirs. Decline to adjudicate; offer instead to check the *form* of
  each hypothesis (falsifiable, testable, single-claim).
- **No goals and no willingness to make any.** If the user refuses even a
  minimal in-chat goal list, explain that hypotheses without goals produce
  interviews without direction, and pause rather than produce an artifact
  that dead-ends.
- **Skipping ahead.** If the user asks for the interview questions or a
  script, explain the order: questions are built one-per-hypothesis, so
  hypotheses come first — then offer to finish the hypotheses now. Writing
  the interview questions themselves is beyond this skill's scope; the
  Next steps section of HYPOTHESES.md tells the user how to continue.
- **Post-interview analysis.** If the interviews have already happened,
  this step is behind them — say so. (Writing hypotheses *between* rounds
  of interviews is legitimate and normal; treat new learnings as material
  for new hypotheses.)
