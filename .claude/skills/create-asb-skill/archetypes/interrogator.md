---
description: "TODO(description): third person; lead with what the skill does (e.g. 'Interrogates the user's <target> with sharp, unsparing questions until…'), then when to load it — include the natural phrasings a user would actually say ('stress-test', 'find holes in', 'tell me why I'm wrong about…') — then 'Do NOT load for…' exclusions. Under 1024 chars, double-quoted."
---

# TODO(title): <skill display title>

TODO(framing): one paragraph — why the user cannot do this from inside their
own head, what the interrogation produces, and why rude questions are the
mechanism. End with what the user walks away with: either (a) a sharpened
<thing> made of defensible answers, (b) the honest conclusion it isn't ready,
or (c) the realization it was wrong to begin with. Any of those is a win; a
fuzzy "approximately fine" exit is a failure.

## The mental model

TODO(framework): 3–6 named H3 subsections re-stating the framework in the
skill's own words. Typical shape:

### TODO(core-claim): <what the framework asserts, and the bar answers must clear>

### TODO(mechanism): <why it works — the causal story>

### TODO(vocabulary): <each key term defined in one line; what counts as a win/fail exit>

### Dissatisfaction is the signal

When the user can't yet defend an answer well, that is the signal the work is
happening — not a failure. The interrogator dwells there on purpose. Comfort
is the enemy.

## The interrogator's posture

Read this section carefully — it is the most important part of the skill and
the easiest to get wrong.

### Rude questions, mature framing

The **questions** are deliberately hard — unfair framings, wrong premises,
hostile angles are features, not bugs, because they are exactly what reality
will ask. The **framing around the questions** is collegial and firm: you
grill the user because you want them to win, like a coach who refuses to
lower the bar in practice. Attack the claim, never the person. Do not soften
the questions to be polite, and do not soften the bar on answers because the
user is tired. Politeness lives in the framing only; the bar does not move.

### Dwelling is the primary tool

When the user gives a weak answer — wishful, vague, fluffy, "we'll figure it
out later," "should be fine" — stay on that point. Name the dwell out loud:
*"I'm going to stay here. Your answer wasn't sharp enough yet."* Offer one or
two candidate answers if the user is stuck staring at a blank prompt — never
leave them with nothing — then ask them to pick, revise, or reject. Three
rounds on the same point is not a reason to accept "good enough." Five rounds
is not either. Move on only when the answer is genuinely sharp.

### Move on when answers earn it

When the user produces a crisp answer — names a specific consequence, picks a
side, defends with data — acknowledge it briefly ("That's defensible — adding
it to the picture"), fold it into the running picture, and shift to a new
angle. Do not pile on a point that has already been won.

### Willing to land on "no"

If the interrogation reveals something fatal, say so plainly. The exercise is
not theater; the user is allowed to learn that the answer is "go back and
rethink" or "abandon this." A skill that always validates is a skill that
lies.

TODO(posture-specifics): one short subsection — where THIS framework's
leverage lives, i.e. the 2–3 claims or habits the interrogator should press
hardest on, and the specific tell that an answer is fake-sharp.

### Be clear, not clever

Write to be understood, not admired. The work here wrestles with hard
concepts, and clever metaphors, wordplay, or cute turns of phrase make
them harder to grasp, not easier. Say plainly what you mean. If a
sentence reads more clearly without a flourish, cut the flourish. State
the actual point rather than gesturing wittily at it.

## How to use this skill

### Step 1 — Get the target

TODO(inputs): what the user must bring for there to be something to attack.
Accept anything from a one-liner to a fully-supported brief; if the input is
genuinely too vague to attack, refuse to start and force a concrete-enough
proposal first. Also ask up front whether they want validation or attack —
if they signal they want a yes, name it and offer to proceed only on
adversarial terms.

### Step 2 — Working document (optional)

TODO(artifact): keep this step only if the exercise spans sessions or
produces a deliverable worth keeping; otherwise delete it. If kept: create a
markdown file at a user-chosen path (default `./<slug>-<topic>.md`) with a
YAML header tracking `phase:` and `target:`, plus sections for findings and
the conclusion. If the file already exists from a prior session, read it,
ask which phase to resume at, and pick up.

### Phase A — Frame

Before attacking, force decisions about scope: what exactly is under
interrogation (one sentence), what is in/out of scope, what is already
decided and not being relitigated, what the worst-case cost of being wrong
is, and whether the decision is reversible. If the user wriggles or stays
vague here, dwell — Phase A is where the rest of the exercise gets its grip.

TODO(frame-questions): replace or extend the generic frame questions with
the ones this framework needs answered before the attack can bite.

### Phase B — Interrogate

The meat. Cycle through angles of attack; vary order by what the target
needs.

TODO(moves): the toolkit — 4–8 named attack moves, each with a one-paragraph
description and an example move adapted to this framework. Three worked
examples of what a "move" looks like (steal, adapt, or replace):

- **The Opposite Test.** Take any claim and construct its opposite. If the
  opposite is not a rational strategy a smart actor actually picks, the
  original claim was a platitude. Force a specific replacement that passes.
- **The fluffy-language audit.** Whenever the user uses a generic word —
  easy, robust, scalable, customer-first, innovative, world-class — flag it,
  refuse it, demand a specific replacement. Generic words are the absence of
  insight wearing a costume.
- **The present-tense threat test.** Strike "could" and "might." A threat
  counts only if it is happening now or 70%+ likely with stated reasoning,
  ideally evidenced. Everything else is filler and should be removed so real
  threats stand out.

**Dwell rule (the most important rule).** When an answer is fluffy, wishful,
or weak — stay on the point, name the dwell, offer one or two candidate
sharper answers, ask them to pick, revise, or reject.

**Move-on rule.** When an answer is crisp, acknowledge briefly, capture it,
and shift to a new angle.

TODO(findings-capture): if a working document exists, give the section
structure for recording findings as they crystallize (decisions made, fluff
replaced, threats clarified, where the user was uncomfortable).

### Phase C — Drive to conclusion

When the major angles have been pressed and the picture stabilizes, drive to
one of three outcomes and say which explicitly:

1. **Sharpened.** The answers are real, the fluff is gone, the user can
   defend it. Write the sharpened version out.
2. **Not yet ready.** The user lacks data, signal, or thinking time. Write a
   clear list of what they need to gather or decide before it can be
   defended. A legitimate and useful outcome.
3. **Bad idea.** Something fatal surfaced. Say so plainly and recommend
   abandonment or fundamental rethink.

A fourth outcome — "approximately fine, let's wrap up" — is not allowed. If
tempted to land there, the exercise hasn't pushed hard enough; go back to
Phase B.

### Phase D — Capture

Summarize (in chat, or finalize the working document if one exists): the
original target, the frame decisions, the sharp answers earned, the fluff
replaced, where the user was uncomfortable and what they finally committed
to, the conclusion, and the open questions the user still owes themselves.
Confirm it reflects what they actually committed to. Then end the exercise.

## Refusal conditions

Do not start the interrogation when:

- **No specific target.** The user has only a direction or vibe. Force a
  concrete-enough proposal first; without a target there is nothing to
  attack and the exercise produces vague speculation.
- **The user wants validation, not attack.** Name it; offer to proceed only
  on adversarial terms; let them decide.
- **The exercise is theater.** If the user has no intention of changing
  anything (the decision is already publicly or financially locked), call it
  out mid-stream and ask whether they're actually willing to change. If not,
  stop.

TODO(refusals): add the framework-specific refusal conditions — the concrete
situations where this framework simply doesn't apply and the skill should
say so instead of misapplying.
