---
description: "TODO(description): third person; lead with what the skill does (e.g. 'Drafts a <artifact> grounded in the user's real situation, then critiques and revises it against <the framework's standard> until it's honest and specific'), then when to load it — include natural phrasings ('write me a…', 'help me draft…', 'I need to tell my customers…') — then 'Do NOT load for…' exclusions. Under 1024 chars, double-quoted."
---

# TODO(title): <skill display title>

TODO(framing): one paragraph — what artifact this produces, why the generic
version of that artifact fails (and what failure costs), and what standard
the finished draft is held to. The user walks away with a final artifact
plus the reasoning behind its key choices.

## The mental model

TODO(framework): 3–6 named H3 subsections re-stating the framework. Typical
shape:

### TODO(core-claim): <what the framework asserts a great <artifact> does, and the standard it must meet>

### TODO(mechanism): <why that standard works on the recipient — the causal story>

### TODO(vocabulary): <key terms defined in one line each>

## The drafter's posture

### No inputs, no draft

Refuse to draft from nothing. A draft built on placeholder facts is generic
by construction, and generic is the failure mode this skill exists to
prevent. Gather the minimum inputs first (Phase A); if the user says "just
write something and I'll fix it," explain that the fixing IS the inputs, and
ask the first question.

### Never present v1 as final

The first draft is raw material for the critique, not a deliverable. Always
run the self-critique before the user sees a "final." Present v1 explicitly
as v1.

### Critique your own work harder than the user would

The user is predisposed to accept a competent-looking draft — that's why
generic artifacts survive. You are not. Run the critique rubric ruthlessly
and show the findings, including the ones that embarrass the draft.

### Every revision ships with its reasoning

"What I changed and why" accompanies every round — which critique findings
drove which edits, what was deliberately kept despite criticism, and what
trade-off each choice accepts. The user should finish understanding the
artifact's choices well enough to defend them without you.

### Honest beats impressive

Where the framework calls for naming a weakness, a real reason, or an
uncomfortable fact, do not let the draft hedge it into corporate fog. Flag
hedging in the user's input too: if they supply a sanitized version of the
facts, ask for the real one — the artifact only works if it's true.

TODO(posture-specifics): one short subsection — the specific dishonesty or
genericness this artifact type gravitates toward, and the test a passage
must pass to stay in the draft.

## How to use this skill

### Phase A — Gather inputs

TODO(minimum-inputs): the facts the draft cannot exist without — list them
explicitly (the real reason, the specific numbers, the named recipient, the
history, the constraint). Ask for them one or two at a time, not as a form
to fill out. Press past vague answers: a generic input produces a generic
artifact, so the dwell rule applies here — acknowledge, name the specific
gap, offer a candidate answer if the user is stuck, and stay on the point
until the input is real. Wishful inputs ("our customers love us") get the
same treatment as missing ones: ask for the evidence or the specific story.

### Phase B — Draft v1

Write the full artifact, grounded in the gathered inputs, following the
framework's structure.

TODO(draft-structure): the artifact's shape — sections, order, length,
register, and the framework-specific elements it must contain. Include a
one-line note on voice (whose voice is this artifact in, and what does that
voice sound like?).

Present it labeled as **v1 — not final; critique follows.**

### Phase C — Self-critique

Run the draft against the rubric and show every finding with the offending
passage quoted.

TODO(critique-rubric): 4–8 named checks derived from the framework — each
with what-good-looks-like and what-failure-looks-like in one line. Always
include, adapted to this artifact type:
- **Generic test** — could this passage appear in any company's version of
  this artifact? Then it says nothing; replace with something only this user
  could write.
- **Honesty test** — does any passage hedge, spin, or omit the uncomfortable
  fact the framework says must be named?
- **Specificity test** — are claims backed by the real numbers, names, and
  events gathered in Phase A, or did abstractions creep back in?

### Phase D — Revise and iterate with the user

Produce v2 with the "what I changed and why" log. Then iterate: the user
reacts, you revise, every round documented the same way. Push back when the
user's edits reintroduce the failures the critique removed — name the
specific regression and the cost, then let them decide; it's their artifact.
Rounds continue until the artifact passes the rubric AND the user signs off
— not until the conversation gets tired.

### Phase E — Final artifact and meta-notes

Deliver the final artifact cleanly (ready to send/use, no scaffolding).
Append short meta-notes: the key choices made and the trade-off each
accepts, anything deliberately omitted and why, and — where relevant — what
reaction to expect and how to handle it.

TODO(artifact): if the drafting process spans sessions or the meta-notes are
worth keeping, persist artifact + notes to a markdown file at a user-chosen
path (default `./<slug>-<topic>.md`) with a YAML header tracking `phase:`
and revision history; otherwise deliver in chat and delete this paragraph.

## Refusal conditions

Do not draft when:

- **Inputs are missing and the user won't supply them.** Name what's
  missing and why the draft fails without it. Offer to gather them now,
  one question at a time.
- **The artifact would be dishonest.** TODO(refusals-honesty): if the
  framework's power comes from honesty and the user insists on a version
  that hides the real facts, decline to produce that version — explain that
  it's not a worse draft, it's a different (and broken) artifact.
- **Wrong situation for this artifact.** TODO(refusals): name the situations
  where this artifact is the wrong move entirely (and what to do instead),
  so the skill doesn't confidently produce a well-crafted mistake.
