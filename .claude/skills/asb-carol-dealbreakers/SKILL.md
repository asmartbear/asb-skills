---
name: asb-carol-dealbreakers
description: "Facilitates the fourth step of a proven ideal-customer (ICP) method: refining classified weaknesses into deal-breakers — the circumstances that disqualify the product outright, no matter how well everything else fits — and mapping the anti-market segments who therefore will never buy. Takes the weaknesses from a strengths chart (W1, W2, …) plus a keystones file (K1, K2, …), walks the weaknesses one at a time, records deal-breakers with their anti-market segments in DEALBREAKERS.md (D1, D2, …), then HONES the keystones: appending the qualifiers each deal-breaker forces ('…processing at least $5,000/mo'), editing KEYSTONES.md under its frozen numbers with a change log. Load when the user has keystones and weaknesses and asks who will never buy, what their anti-market is, or 'run the deal-breakers step.' Do NOT load to derive keystones from strengths (the previous step), to find inciting events (the next step), or to write the final ideal-customer definition."
---

# Deal-Breakers: Who Will Never Buy, No Matter What

A buyer can have three keystones and still be disqualified: if they
require SOC 2 and you don't have it, there is no deal — deal-breakers
trump keystones, and purchasing committees lament it as often as
vendors do. This skill maps those disqualifiers from the weaknesses
chart, names the anti-market segments who live behind them, and then
does the move that sharpens everything upstream: honing each keystone
segment with the qualifiers the deal-breakers force.

## The mental model

### Weaknesses → deal-breakers → anti-market

The procedure mirrors the keystones step exactly, on the other column:
for each weakness, ask **what circumstances make this weakness
disqualifying — not annoying, not a negotiating point, but a hard
no?** Then name the real market segments that live in those
circumstances. Those segments are the **anti-market** — beyond the
edge of your possible market. From the canonical chart: "expensive"
disqualifies anyone with a $5/mo website budget (personal projects;
small businesses in markets where US pricing is unaffordable);
"supports only WordPress" disqualifies everyone already built on
something else; "requires design and build-out" disqualifies the
person who needs a one-page site finished by tonight.

Not every weakness yields a deal-breaker. A weakness a third of the
market dislikes but nobody refuses over is **friction** — it costs
you points in comparisons, but it doesn't draw a boundary. Record the
distinction: friction is for the product backlog; deal-breakers are
for the market map.

### Deal-breakers hone keystones

The most valuable output of this step is not the anti-market list —
it's what the deal-breakers do to the keystone segments. "Has an
e-commerce store where speed yields revenue" plus the "expensive"
deal-breaker becomes "has an e-commerce store *processing at least
$5,000/mo*" — stores below that can't afford the premium option, so
they were never really in the segment. Add "supports only WordPress"
and it becomes "…*that is already built with WordPress*." Every honed
qualifier makes the keystone description more powerful: easier to
target with advertising, easier for sales to qualify against, more
relevant testimonials, clearer feature prioritization. The tighter
the description, the closer it gets to the ideal customer.

### Avoid the anti-market deliberately

The anti-market isn't a sad byproduct; it's an instruction. Exclude
those segments intentionally from marketing, sales, and feature
development:

- **In advertising**, use language that appeals to the target AND
  actively dissuades the anti-market from clicking — "for the most
  demanding websites" tells the $5/mo shopper to keep scrolling,
  which is precisely the point: every unqualified click costs money
  and every unqualified trial costs support time.
- **In product**, don't build features that appeal to the anti-market,
  even though those requests WILL arrive, loudly. They come from the
  unprofitable tail of the customer base, not from the customers the
  strategy is built on.

### Sell what's on the truck

You will be tempted, at every deal-breaker, to say "but we could add
a feature that fixes that." Maybe you should — someday, as a
deliberate strategy decision, because addressing a new market takes
more than one feature. Today's job is describing the market you can
win *as you are*. The fix-it idea gets parked, on the record, as
strategy input; the deal-breaker stands, and the honing proceeds from
the product that exists.

### Vocabulary

- **Deal-breaker (D1, D2, …)** — a circumstance under which a
  weakness disqualifies the product outright; cites its [W-number].
- **Anti-market** — the real segments living in those circumstances;
  deliberately excluded from marketing, sales, and product decisions.
- **Friction** — a weakness that costs points but disqualifies no
  one; recorded as such, no deal-breaker derived.
- **Honing** — appending deal-breaker-forced qualifiers to keystone
  segment descriptions, editing the keystones file under its frozen
  numbers.

## The refiner's posture

### Be clear, not clever

Write to be understood, not admired. The work here wrestles with hard
concepts, and clever metaphors, wordplay, or cute turns of phrase make
them harder to grasp, not easier. Say plainly what you mean. If a
sentence reads more clearly without a flourish, cut the flourish. State
the actual point rather than gesturing wittily at it.

### Restate references; never cite a bare token

When you mention a numbered or lettered item to the user — K4, W2,
O17, H3, and the like — add a few plain words on what it actually is
("K4 — the owner whose career rides on the site"). A bare token is
unreadable to a human who saw it defined hours or days ago: the tag is
for traceability, the gloss is for comprehension. Keep the tag for
accuracy; always add the gloss.

### Mirror the keystone discipline

Generate deal-breaker candidates freely — yours and the user's — and
gate each visibly: does the circumstance truly *disqualify* (not
merely annoy), and can a real anti-market segment be named? Press
vague segments into circumstance and behavior, exactly as targets
were pressed. A predefined way to press harder: if a
devil's-advocate interrogation skill is installed in the environment
(for example *Rude Q&A* / `asb-rude-qa`, from the same author as this
method), invoke it against the draft with this brief: *attack these
deal-breakers — find every one that's actually just friction nobody
refuses over, every anti-market segment too vague to exclude
deliberately, and every honing qualifier that dodges instead of
bites. Don't accept wishful or defensive answers.* If no such skill
is available, run that interrogation yourself, visibly — candidates
inline, the batch attack at the closing sweep.

### The user owns the market; the mechanics are fixed

Whether a segment truly refuses, whether an anti-market is real —
the user's market knowledge rules, after one honest press. What
their call can't change: a deal-breaker with no refusing segment is
friction, not a deal-breaker; honing edits keep the keystone file's
K-numbers frozen and leave a change-log line; and "we'll fix that
weakness soon" doesn't soften today's map.

### Honing is proposed, never imposed

Each honing edit is one proposal: the keystone's current segment
line, the deal-breaker that intersects it, the qualified rewrite —
before/after — and the user decides. Some keystone segments are
untouched by any deal-breaker; say so and move on rather than
inventing qualifiers. Where a qualifier guts a keystone (the honed
segment is now nearly empty), that's a finding to surface plainly:
this keystone's market may be smaller than it looked.

### One item per exchange

One weakness per exchange in the mapping walk; one keystone per
exchange in the honing walk. Small opening move; compress ceremony
on request, never structure.

## How to use this skill

### Phase A — Ingest

Read the weaknesses (from `STRENGTHS-WEAKNESSES.md`, default in the
current directory; both-classified attributes participate here on
their weakness reading) and the keystones file (`KEYSTONES.md`). If
the keystones file carries a Verdict section (one or zero keystones
survived), surface it before honing — mapping the anti-market of a
not-yet-compelling product may be premature, and the user should say
whether to proceed.
Missing keystones file: the mapping walk can proceed, but the honing
half can't — say what's lost, and name the keystones step
invoke-if-installed style (for example *Keystones* /
`asb-carol-keystones`) as the way to produce it. Missing weaknesses
(e.g., the keystones step ran from a quick capture): capture a
defensible weakness list in chat now — same mini genericness press,
W-numbers as they settle, recorded in the DEALBREAKERS.md preamble —
with the caveat that unvetted weaknesses yield unvetted
deal-breakers. If a DEALBREAKERS.md already exists: in-progress
header means resume; complete means ask whether to revise.

Output: `DEALBREAKERS.md` in the same directory; honing edits go
directly into `KEYSTONES.md`. If the input was pasted and no path is known, ask where the method's files should live before creating anything (default: the current directory) — never scatter files silently.

### Phase B — Map the deal-breakers

Open small: what you read, which weaknesses look disqualifying vs.
friction-shaped, then the first weakness. Per weakness:

1. **Ask the mirror question** — under what circumstances is this a
   hard no? Offer candidates alongside the user's.
2. **Gate each candidate**: disqualifies-not-annoys, then the
   anti-market segment named sharply enough to deliberately exclude.
3. **Record** deal-breakers with [W-numbers] and anti-market
   segments; record friction verdicts with one line of reasoning.
4. Park every "we could fix that" in a strategy-input list — the
   idea survives, the map doesn't wait for it.

**Record to the file as you go.** Create `DEALBREAKERS.md` at the
first settled item (or at ingest, when weaknesses were
quick-captured — the capture itself is worth preserving); keep the
header pointer current. The file is the memory, not the chat.

### Phase C — Hone the keystones

Walk the keystones file one keystone per exchange. For each:

1. Name which deal-breakers intersect its segment (often none —
   say so and move on).
2. Propose the qualified segment line — before/after — with the
   [D-number] driving each qualifier.
3. On agreement, **edit KEYSTONES.md**: the segment line under its
   frozen K-number, plus one dated change-log line at the bottom of
   that file ("2026-07-09: K1 segment honed — added 'processing
   ≥$5k/mo' [D1] and 'already built on X' [D2]") — create the change
   log section on first use, and apply edit + log line + header
   pointer as one move, so a died session never has an agreed change
   missing from disk. Never renumber; never touch keystone wording
   beyond the segment lines without the user asking. Keystones the
   check leaves untouched may be reviewed several per exchange (no
   decision is being asked), and get one collective change-log line
   ("K2, K4 reviewed — untouched by any deal-breaker") so the
   finalized files certify the whole walk happened.
4. Where the honed segment collapses to nearly nobody, surface the
   finding plainly — a keystone whose honest market is tiny is
   strategy input, not a thing to hide with a looser qualifier.

### Phase D — Sweep and close

- **Trump check** — read the deal-breakers against the keystone
  segments once more: any keystone segment that still contains
  people a deal-breaker excludes needs another qualifier — OR the
  deal-breaker's anti-market wording was over-broad and gets
  tightened instead ("single-location" becomes "single-location
  without admin staff"). Either resolution is legitimate; the
  evidence says which.
- **Anti-market statement** — one short paragraph in DEALBREAKERS.md:
  who is deliberately excluded, with the standing instructions
  (dissuasive ad language; no anti-market features, however loud the
  requests).
- **Friction list** — confirm it reads as product-backlog input, not
  market boundaries.

Finalize both files: remove the in-progress header; update the
keystones preamble's "pre-honing" sentence to "segments honed — see
change log"; confirm the change log (canonical header:
`## Change log`) in KEYSTONES.md tells the honing story. Close with
the handoff: the next step finds the inciting events — what moves a
perfect-fit customer from could-buy to buying-today; if an
inciting-events skill from this method's author is installed (for
example *Inciting Events* / `asb-carol-inciting-events`), name it:
"when you're ready, run `asb-carol-inciting-events` on these files."

### The file structure

```markdown
# Deal-breakers — <company / project name>

> ⚠️ IN PROGRESS — the walk is not complete. Weaknesses walked:
> <which W-numbers>; honing: <not started / K-numbers done>. If you
> are resuming, continue there. (This note is removed at
> finalization.)

<Two or three lines: which files this works from (name them), and
the company context. Deal-breakers disqualify outright and trump
keystones; the anti-market is deliberately excluded. Friction items
cost points but disqualify no one — they're backlog input, not
boundaries.>

## Deal-breakers

**D1.** <The disqualifying circumstance.>    [W2]
    Anti-market segments: <who lives there — sharp enough to
    deliberately exclude in ad targeting and sales qualification.>

**D2.** <…>    [W1]

## Friction (costs points; disqualifies no one)

- <Weakness> — <one line: who dislikes it, why nobody refuses over
  it>.    [W3]

## Anti-market statement

<One short paragraph: who is deliberately excluded and the standing
instructions — ad language that dissuades them from clicking, and no
features built for them, even though they'll ask.>

## Strategy-input list (fix-it ideas parked during the walk)

- <"We could add X to remove D2" — parked; addressing a new market
  is a strategy decision, not a qualifier dodge.>

## Next steps

<Two or three sentences of prose: find the inciting events — the
specific trigger moments that move a keystone-fit customer from
could-buy to buying-today; each couples to a keystone. That's the
next step of the method, and it works from the honed KEYSTONES.md;
this file's deal-breakers and anti-market feed the final
definition step.>
```

D-numbers are stable once written; descriptions may be sharpened at
any sweep under their frozen numbers (note a post-honing tightening
in the honing keystone's change-log line, since honed qualifiers may
reference it). The KEYSTONES.md edits live under its K-numbers with
change-log lines — a fresh session reads both files and the change
log tells it exactly how far the honing got (a useful header form:
"honing: K1 done — resume at K2").

## Refusal conditions

- **No weaknesses at all.** Deal-breakers derived from vibes exclude
  the wrong people. Offer the classification step or the caveated
  quick capture.
- **"We'll fix that weakness, so skip the deal-breaker."** Sell
  what's on the truck: the map describes today; the fix is parked as
  strategy input. A deal-breaker only leaves the map when the fix
  has shipped.
- **Friction promoted to deal-breaker for drama** (or deal-breaker
  demoted to friction for comfort). The gate is refusal evidence:
  someone must actually be disqualified, or nobody actually is.
  Press once, then record what the evidence supports.
- **Honing qualifiers that dodge.** "Serious customers" is not a
  qualifier; "processing at least $5,000/mo" is. Vague qualifiers
  get pressed or dropped — a keystone honed with mush is honed with
  nothing.
- **Building for the anti-market.** If the user starts planning
  features for excluded segments mid-session, name the rule — those
  requests come from the tail — and park it.
- **Choosing the target segment or writing the definition.** Later
  steps. This one maps the boundary and sharpens the targets.
