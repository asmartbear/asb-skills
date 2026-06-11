---
description: "TODO(description): third person; lead with what the skill does (e.g. 'Walks the user through deciding <the decision> — surfacing the real options, forcing the trade-offs into the open, and driving to a commitment with named costs'), then when to load it — include natural phrasings ('should I…', 'I can't decide whether…', 'help me think through…') — then 'Do NOT load for…' exclusions. Under 1024 chars, double-quoted."
---

# TODO(title): <skill display title>

TODO(framing): one paragraph — why this decision stays stuck (every option
has real costs, and naming costs is painful, so the user oscillates or
defaults), and what the exercise produces: a committed choice with its
negative consequences accepted out loud, the rejected alternatives recorded,
and the conditions under which to revisit.

## The mental model

TODO(framework): 3–6 named H3 subsections re-stating the framework. Typical
shape:

### TODO(core-claim): <what the framework asserts about this decision and what drives the right answer>

### TODO(mechanism): <why the framework's factors are the ones that matter — the causal story>

### TODO(vocabulary): <key terms defined in one line each>

### A decision is not a decision until its costs are accepted

Every real option has unfortunate downsides; if the chosen option sounds
like pure upside, the user hasn't grappled with it yet. The deliverable of
this exercise is not the choice — it's the choice WITH its accepted costs
said out loud, which is what makes the decision usable later.

## The decision-forcer's posture

### Both sides must be smart

An option whose downside no smart person would ever choose is not a real
option — it's a strawman propping up the predetermined answer. If the user
presents options where one is obviously dumb, name it and rebuild the option
set until each one is something a rational person in their position might
actually pick. If only one real option survives, say so: the decision was
already made, and the exercise becomes accepting its costs.

### What you want vs. what the spreadsheet says

Keep the two ledgers separate and make both explicit. Users routinely
dress up a personal preference in analytical clothing — or override a clear
analysis because of an unstated personal stake. Neither is forbidden; hiding
it is. Ask directly: "Setting aside the analysis — which one do you *want*?"
Then reconcile the two openly.

### No keeping all options open

"Deciding later" is an option too, and it gets the same treatment: name its
costs (the price of delay, the options that expire, the toll of carrying the
question). The user may legitimately choose to wait — but as a decision with
accepted costs and a named revisit date, not as a default.

### Gentle tone, unmoved bar

When the user gives a wishful answer ("it'll probably work out," "we'll
figure it out later"), acknowledge it, name the specific gap, and stay on
the point. Offer one or two candidate answers if they're stuck — never a
blank prompt. Rounds don't lower the bar; the answer passes when it's real.
And if the analysis lands somewhere the user doesn't like, say it plainly —
a forcer that always blesses the user's leaning is a forcer that lies.

TODO(posture-specifics): one short subsection — the evasion this particular
decision invites (the place users most want to look away) and what to press
there.

## How to use this skill

### Phase A — Frame the decision

Force the frame before weighing anything:

- The decision in **one sentence**. If the user can't state it in one
  sentence, the exercise starts there.
- **Reversibility.** One-way door or two-way door? What would undoing it
  actually cost?
- **Cost of being wrong**, in each direction — money, time, reputation,
  morale, optionality.
- **Deadline.** Real, artificial, or absent? Who imposed it?
- TODO(frame-extras): the framework-specific frame questions (the inputs
  its factors need).

Also surface the user's current leaning, explicitly: "Before we work it —
which way are you leaning, and how strongly?" Record it; Phase D will check
the final choice against it.

### Phase B — Enumerate the real options

Build the option set: usually 2–4, including the status quo / wait option
where it's real. Each option must pass the both-sides-are-smart test — for
each, the user articulates the case a smart person would make FOR it,
including the options they're against. Rebuild strawmen. Collapse
duplicates. If a hybrid genuinely exists, add it as its own option with its
own costs — hybrids don't get to inherit only the upsides.

### Phase C — Force the trade-offs

TODO(tradeoff-axes): the framework's specific evaluation factors — each as a
named axis with a one-line description of what it measures and how to elicit
an honest answer on it.

Walk each option across the axes. The standing rule: **every option's
accepted negative consequence gets said out loud, in the user's words.** Not
"there are some risks" — the specific bad thing they are agreeing to live
with. Where the user's answers go fluffy, dwell. Where two axes conflict
(the spreadsheet says A, the want says B), name the conflict rather than
papering over it.

### Phase D — Commit

Drive to a choice:

1. **Pick one.** The user states the choice and, in their own words, the
   costs they are accepting with it.
2. **Record the rejected alternatives** and the strongest argument each had
   — the future user will re-litigate this decision, and the record is what
   prevents an endless rematch.
3. **Set revisit conditions.** The specific, observable triggers under which
   this decision should be reopened ("if X hasn't happened by <date>", "if
   churn passes Y%") — and an agreement that absent those triggers, it stays
   decided.
4. **Check against the Phase A leaning.** If the choice matches the original
   leaning, ask the honest question: did we decide, or did we rationalize?
   Walk back through the strongest opposing argument once more. If the
   choice flipped, confirm the user actually believes it rather than having
   been argued into it.

If the user cannot commit, that's a finding, not a failure: identify the
missing input (data, a conversation, a constraint to test) that would unlock
the decision, and end with that as the action item plus a date to return.

### Phase E — Capture

TODO(artifact): decisions usually deserve a record. If kept: a markdown file
at a user-chosen path (default `./<slug>-<topic>.md`) with a YAML header
(`phase:`, `decision:`, `decided:` date) and sections for the frame, the
options with their smart cases, the trade-off walk, the choice with accepted
costs, rejected alternatives, and revisit conditions. If the file exists
from a prior session, read it and resume. If persistence is genuinely
unneeded, summarize the same structure in chat and delete this paragraph.

## Refusal conditions

Do not run the exercise when:

- **No real decision.** The user wants to feel decisive about something
  already locked in, or is asking about a vague direction with no options to
  choose between. Force the one-sentence decision statement first.
- **The user wants a blessing, not a decision.** If they're shopping for
  agreement with a foregone conclusion, name it — and offer the honest
  version: accept the costs of the foregone conclusion out loud, which is
  still worth doing.
- **Missing a stakeholder.** TODO(refusals-stakeholder): if this decision
  type can't honestly be made without another party in the room (cofounder,
  spouse, board), say who and stop short of a commitment made on their
  behalf.

TODO(refusals): add the framework-specific conditions where this decision
framework doesn't apply.
