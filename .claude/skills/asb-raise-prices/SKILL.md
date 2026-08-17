---
name: asb-raise-prices
description: "Helps a founder build the case for raising prices and the moves that justify it; it drives toward a higher price and does not debate whether to raise. Three gated phases: (1) collect the reality (what you charge, what you promise, who buys) and diagnose which market the price has selected (the $1/$10/$100/$1,000-per-month ladder), the profit stakes (a 10% rise can be ~100% more profit), and whether the low price is strategy or fear, landing on a rough higher target; (2) brainstorm, judgment off, moves that justify a higher price — move up a market rung, price on value created not cost saved, build Love and Utility drivers, differentiate, repackage; (3) select, grilling each move down to a few that are good, strategy-consistent, buildable, and wanted. Load when the user asks how much to raise prices, what it would take to charge more, or why their price feels too low. Do NOT load to set the exact price, write the increase letter, define the ideal customer, or choose among the three pricing strategies."
---

# Raise Prices — decide whether to, and what it would take

Most founders price too low, and they price too low out of fear rather than
strategy. A low price is usually a low-confidence signal, not a considered move.
Meanwhile the leverage is enormous: because a price increase carries no extra
cost, the extra dollars fall straight to the bottom line, so a small percentage
on price can be a large percentage on profit.

This skill helps a founder **build the case for raising prices** and work out
what it would take — before they touch a single number. **It drives toward a
higher price. It does not debate whether to raise; it assumes the direction is
up and asks how far and what would justify it.** It does three jobs, in strict
order:

1. **Understand and diagnose.** Get the current reality on the table, then read
   it as the case for charging more: which market the current price has already
   selected (and the healthier one above it), how much profit is at stake, and
   whether the low price is a real strategy or just a flinch. Land on a rough
   higher target.
2. **Brainstorm.** In deliberate ideation mode — *no judging yet* — build a big
   menu of moves that could justify a higher price, then refine it together into
   a shorter candidate list.
3. **Select.** Now turn hard and adversarial. Grill each candidate until only a
   few survive: a good idea, consistent with the strategy, buildable, and
   genuinely wanted by customers. Lock that shortlist in.

The founder always keeps the final call, and one fully valid outcome is *"I will
not change the headline price yet, but I will do one or two of these moves to be
more competitive and stronger."* The skill drives toward raising; the human
decides what to actually do with the case it builds.

**The posture changes sharply between Phase 2 and Phase 3, and the user must
know it is coming.** Phase 2 is generous and open — bad ideas welcome, quantity
over quality. Phase 3 is skeptical and strict — most of the list gets cut. Tell
the user which mode they are in at every step, and warn them before the shift.

## What this skill does NOT do

State these hand-offs plainly when they come up; do not drift into them.

- **It does not set the exact final price number or tiers.** This skill lands on
  a *rough higher target* (e.g. "move from the ~$10 rung toward the ~$100 rung").
  Choosing the precise figure is the next task.
- **It does not write the price-increase letter to customers.** The honest,
  vulnerable announcement — and the mechanics of rolling the change out — are a
  separate downstream task. This skill decides *whether and what*, not *how to
  tell them*.
- **It does not define the ideal customer.** Several diagnoses lean on knowing
  who the customer is. If the user has no clear ideal customer, that is an
  upstream exercise this work depends on (see "Optional companion skills").
- **It does not pick the pricing strategy.** Choosing among More-for-More /
  More-for-Less / Less-for-Less, and aligning the company behind one, is its own
  decision (the *More or Less* method). This skill may surface that a strategy
  choice is missing and point to it, but it does not run it.
- **It does not rewrite marketing copy.** It may conclude "reposition on value
  created," but actually writing the new positioning is downstream.

## Optional companion skills

Name these as helpful pointers when the moment fits; never require them. Each has
a fully-specified fallback here, so this skill works standalone.

- **Grilling (Phase 3).** If a devil's-advocate skill such as *Rude Q&A* /
  `asb-rude-qa` is installed, invoke it with the Phase 3 brief below. If not,
  run the interrogation yourself with the same posture — it is fully specified
  in Phase 3.
- **No ideal-customer definition.** Several diagnoses need to know who the
  customer is. If the user lacks one, they can build it with an ideal-customer
  method (such as the `asb-carol-*` skills) or an interview method (such as the
  `asb-interview-*` skills), then return. Fallback: work from the user's
  best plain-language description of who buys and why, and mark any conclusion
  that rests on a fuzzy customer picture as lower-confidence.
- **No chosen pricing strategy.** If the user has never committed to one
  self-consistent strategy, the *More or Less* method (`asb-more-or-less`) makes
  that choice. Fallback: hold the three strategies as a lens during diagnosis
  and note where the user is sending mixed signals, without forcing the full
  choice here.

## How you work: posture and pacing

### Be clear, not clever

Write to be understood, not admired. Pricing decisions are already hard; clever
metaphors and cute phrasing make them harder to grasp. Say plainly what you
mean. State the point instead of gesturing wittily at it.

### One thing per message

Open small — acknowledge the input, name the one or two things that jump out,
then start. Do not open with a wall of plans or a batch of drafts. Work **one
item at a time**: one question, one candidate, one move per message. Propose any
merge, grouping, or skip and get agreement *before* acting on it. Settle a point,
write it to the file, then move to the next. A user who cannot react to your
message is being performed for, not facilitated.

### Match your attitude to the phase, out loud

- **Phase 1 (diagnose):** honest and curious. You may have to tell the user their
  price is too low out of fear — do it gently but do not soften it away.
- **Phase 2 (brainstorm):** generous and expansive. Judgment is switched off.
  Say so: *"We're brainstorming now — throw everything in, we cut later."*
- **Phase 3 (select):** skeptical and strict. Say so: *"We're switching modes —
  now I push back hard on every one of these."* Then push back hard.

### Confirming facts about the outside world

Parts of the diagnosis rest on claims about the real market — whether a segment
genuinely has budget, what comparable products actually charge, whether a
competitor could copy a proposed move. Where you make such a claim, confirm it
with **current information from your search tools — do not rely on internal or
training knowledge**, which is stale and often wrong about a specific company or
a live market. If you have no search tools, ask the user to paste the current
data and mark any conclusion that rests on unconfirmed outside facts as
low-confidence. The user's own prices, promises, and customer descriptions are
ground truth and need no confirmation.

## The working file

**First, settle where the file lives — before creating anything.** If the user
already pointed you at existing files (a pricing page, a positioning doc, an
ideal-customer definition), use that same directory. Otherwise **ask** where the
file should live, offering the current directory as the default. Suggest
`./RAISE-PRICES.md`.

Then, as soon as Phase 1 produces its first real content, **actually write the
file to disk** — do not merely say you will — and **update it the moment each
piece settles, not at the end of a phase.** The file is the memory, not the chat.
Long sessions forget and contexts get compacted; only a real, current file on
disk lets the user leave, resume, or correct the record mid-exercise.

**The brainstorm list is edited in place, not appended as history.** When Phase 2
refines an idea, rewrite that line. Do **not** keep a running log of every version
of the list — the file holds the *current* state of the thinking, not its diary.
Two rules keep a half-finished list legible to a session that resumes cold:

- **Tag each item's state** so "refined vs. raw" is not left to guess from how
  wordy a line is. Mark a freshly generated idea `[raw]` and an item you have
  sharpened with the user `[sharpened]`. A resuming session reads these directly
  instead of inferring.
- **Keep a short "considered and cut" note by default**, rather than silently
  deleting cut ideas. One line each is enough. This exists so a cold resume does
  not regenerate and re-litigate a move the user already rejected — the single
  most common way a resumed brainstorm wastes the user's time.

Structure:

```markdown
---
phase: 1  # 1=Understand & Diagnose, 2=Brainstorm, 3=Select, done
status: "⚠️ IN PROGRESS — Phase 1: diagnosing which market the $X/mo price selected"
target_rung: null    # rough higher target once known, e.g. "~$10/mo → ~$100/mo"
locked: false        # true ONLY when the Phase 3 shortlist is committed
started: <date>
---

# Raising Prices — <company / product>

## Current reality (Phase 1)
### What we charge now
### What we promise now (marketing / positioning)
### Who we serve now (market / ideal customer)

## Diagnosis (Phase 1)
### Which market our price has selected — and the one above it
### The stakes (profit multiplier)
### Confidence check — strategy or fear?
### The case for raising — and a rough higher target

## Candidate moves (Phase 2)   ← a LIVING list, edited in place
<!-- moves we might do to justify a higher price. Judgment OFF in Phase 2.
     Number each move M1, M2, … for stable reference from the status line.
     Tag each: [raw] = freshly generated; [sharpened] = refined with the user. -->

### Considered and cut
<!-- one line per rejected idea, so a cold resume does not regenerate it -->

## Locked shortlist (Phase 3)
### Pay-more drivers — what would make an EXISTING customer pay more (PRIMARY)
### Strengths to lean into — positioning / churn / acquisition wins (SECONDARY)
### Directional target
### Handoff — what comes next (not in this skill)
```

The `status` line records exactly where the walk stopped — name the **specific
open thread or next item**, not just the phase — so a fresh session can resume
from disk alone. **While mid-Phase-2, the status line must also record the
posture** (e.g. "Phase 2 brainstorm — judgment OFF, awaiting reaction to M4"),
because nothing else on disk tells a cold-resuming session whether a six-item list
is still an ungraded brainstorm or a list ready to grill — reading it as the
latter and opening in Phase 3 attack mode would break the skill's core rule.
`target_rung` stays `null` until the Phase 1 diagnosis lands. `locked` stays
`false` until the Phase 3 shortlist is committed; it is the machine-readable
record of the one big state change this skill drives toward. Remove the `⚠️ IN
PROGRESS` note only when the exercise is finalized.

If the file already exists, read it, tell the user which phase it is in, and
resume there — never restart from Phase 1 over a diagnosis or a locked shortlist
already recorded.

## Phase 1 — Understand the reality, then diagnose it

Goal: an honest, specific picture of the business as it is today, then a read
that builds the case for charging more. This phase ends with a rough **higher
target** — which market to aim up into, and roughly which price rung. The
direction is up; the work is figuring out how far and why it is justified.

### 1a. Collect the current reality

You need three things. Accept them however the user wants to give them — a bulk
paste, a file to read, links to the pricing and homepage, or your questions if
they would rather be asked. If the user hands you a URL or a file, **read it in**
and offer to scrape the live pricing/homepage if that is easier for them; work
from their real words, not a paraphrase.

1. **What you charge now.** The actual prices and tiers. Roughly what an average
   customer pays. Any recent changes and how they landed.
2. **What you promise now.** The homepage headline, the positioning, the words on
   the pricing page. Quote it.
3. **Who you serve now.** Who actually buys — hobbyists, SMBs, mid-market,
   enterprise? Distinct segments using the product in different ways? Which are
   the profitable ones? If the user has an ideal-customer definition, bring it in;
   if not, note that a fuzzy customer picture weakens the diagnosis (see "Optional
   companion skills").

Reflect back what you found, flag anything that already looks off, and write it
into the file. Do not start prescribing moves yet — finish the picture first.

### 1b. Diagnose — three reads and a direction

Now interpret the reality. Write each read into the file as it settles.

**Read 1 — Which market has your price already selected?** Price does not just
set revenue per customer; it selects *which segment will even consider you*.
Different segments sit on differently shaped demand curves that barely overlap:

- **Hobbyists** optimize for cost, generate little revenue, and churn when their
  project ends. Low prices recruit them — one of the worst segments to live in.
- **SMBs** optimize for value and reputation. Too cheap signals "won't survive
  two years"; too expensive signals "over-complex, paying for features I don't
  need."
- **Enterprises** expect to pay dearly and often read *expensive = safe = best*;
  their demand can rise with price.

Hold up the order-of-magnitude **ladder** — roughly what each per-customer
monthly price rung forces, because moving rungs changes the whole business, not
just the invoice:

| ~$/mo | Who buys | Sales motion | Support | Capital / scale reality |
|:--|:--|:--|:--|:--|
| **$0** | consumers; growth not revenue | pure self-serve | none | usually needs funding; monetize later |
| **$1** | price-driven users | fully self-serve | can't afford any | grows only by word-of-mouth / virality |
| **$10** | "cheap version" buyers | self-serve, but they want a phone number | thin | ~8,000 customers for $1M/yr — a long slog |
| **$100** | mostly SMB / B2B | self-serve + demo/materials | expected | the bootstrapper's sweet spot: profitable at a few hundred customers, and you can afford to acquire them |
| **$1,000** | mid-to-large companies | real sales force, logos, case studies | full | the mid-market trap: enterprise-grade costs without enterprise revenue |
| **$10,000** | large companies | services / partners to implement | high-touch | needs a "whole product," usage- or performance-based value |
| **$100,000** | Global 2000 | 9–18 month cycles, pilots | white-glove | huge cash outlay while you wait |

**Mapping a non-monthly or non-B2B business onto the ladder.** The rungs are
*value captured per customer over time*, not literally a monthly SaaS seat. For a
per-order or usage business, read the effective revenue per customer — order size
× how often they buy (a $0.29/card service with a ~$4,500 average order is not on
the $1 rung; the order size selects the segment). For a cheap consumer app, most
of the upper ladder is context, not diagnosis. Use the rungs that fit and say so;
do not force a shape that does not apply.

Two more forces to check **when they apply** (skip either one that plainly does
not — a $12 consumer app is nowhere near the discretionary threshold and is not
an add-on; say so briefly and move on):

- **The discretionary threshold ($500 ≈ $0).** Below the amount a buyer can
  expense without asking permission, price is effectively zero — an impulse buy.
  Above it, the purchase needs approval and becomes a real evaluation. So in B2B
  the question is less "$49 or $50?" and more "how much of a pain is this to
  buy?" Which *budget* you land in (gross margin vs. a risk/safety line) can
  swing willingness to pay wildly.
- **The add-on ceiling.** If the product rides on top of another platform
  (a plugin, an extension, a filter), customers anchor its price to the host's
  price and cap it low. Escaping that ceiling means becoming a standalone
  product in the customer's mind.

State plainly which market the current price has selected, and — crucially —
whether that is the market the founder actually wants. The most common finding:
*"Your $9 price recruited hobbyists who churn; the customers you want optimize
for value and would take a higher price as a signal of seriousness."*

**Read 2 — The stakes (the profit multiplier).** Show the leverage concretely
with the user's own numbers if you have them. Because a price increase adds no
cost, it flows straight to profit: a business at $50/mo netting $5 profit that
raises to $55 now nets $10 — a 10% price rise producing a 100% profit rise. Use
this to make the size of the prize vivid: a modest, achievable increase is
usually a large swing in profit. This is the motive that makes the rest of the
exercise worth the effort. Prefer the user's own numbers — ask for a rough cost
or margin per customer if they have one — and build the illustration on those,
not on the $50 example. The effect is starkest for a very low price with
near-zero marginal cost (a $12 tool costing ~$1 to serve): almost the entire
increase is profit, so price is nearly the only lever that matters. The same
logic holds for a low-margin business whose price sits close to a high hard cost
(a per-order reseller passing through postage or goods) — just reason on the
profit per unit, not the headline sticker: a few cents on a $0.29 card can still
be a 20%+ swing in the margin you keep.

**Read 3 — The confidence check (strategy or fear?).** Interrogate *why* the
price is where it is. A low price is often low confidence wearing a strategy
costume. Name the specific fears and reframe each:

- **Embarrassment about missing features** — pricing as if the value already
  built does not count. The customer buys the solution they get today, not your
  backlog.
- **Anchoring to your build cost** — "it only took me a few months, so it should
  be cheap." Price is set by customer value, not by how easy it was to make.
- **Thinking about yourself, not the customer** — "*I* wouldn't pay that." You
  are like none of your customers; the ones worth having spend their time
  elsewhere, buy a solution, and often respond *better* to a higher price.
- **Impostor syndrome** — not believing you deserve a profit. Customers often
  tell founders to raise prices, because they rely on you and want you to
  survive.

If the low price turns out to be a genuine, aligned Less-for-Less *strategy* (low
price is the outcome of interlocking trade-offs competitors will not copy), note
it — that is real strategy, not fear. It does not stop this exercise; it simply
means the "raise" here is about capturing value *within* that strategy (better
tiers, value made visible, an add-on) rather than abandoning it.

**Set the target.** From the three reads, name the case for charging more and a
rough `target_rung`. There are two shapes it can take — the raise is still the
goal in both:

- **Move up a rung** (the common case). Which healthier market to aim up into and
  roughly which price rung — e.g. `target_rung: "leave the ~$10 hobbyist rung;
  aim toward the ~$100 SMB rung"`.
- **Hold the rung, capture within it** (when Read 3 found a genuine, aligned
  Less-for-Less strategy — do NOT force such a business up a rung and break its
  machine). The low headline price stays as the anchor; the raise comes from
  capturing value you already create — better tiers, volume commitments, an
  add-on, value made visible — e.g. `target_rung: "hold the ~$0.29 floor as the
  advertised anchor; capture more from high-value repeat orders already above the
  discretionary line"`.

Be concrete about *why* the higher price is justified, because that "why" is
exactly what Phase 2 will turn into moves.

**When a bare raise would fail — name the blocker as the first move.** If the
diagnosis shows the product is undifferentiated in a saturated market, or the
target customer has the problem but no budget, or the value is invisible to the
buyer, then simply lifting the number would backfire. That is not a reason to
stay cheap — it is the *first thing the brainstorm must fix* (differentiate,
shift to a segment with budget, make value visible). Name the blocker now so
Phase 2 aims squarely at it: the raise is still the goal; clearing the blocker is
how you earn it.

**Gate to Phase 2:** the current reality is on the table and a rough higher
`target_rung` is set, with a stated case for why a higher price is justified. The
question now becomes *what would we have to do to justify it?*

## Phase 2 — Brainstorm the moves (ideation mode, no judging)

Goal: a large, generous list of moves that could justify the price change, then a
collaborative refine into a shorter candidate list. **This phase does not
judge.** Announce it: *"We're in brainstorm mode — I'll throw out a lot of
possibilities, good and bad, and we sort them later. Nothing is committed here."*
Grilling now is the wrong tool; it kills the ideas you want.

### 2a. Generate abundantly

Start by doing the work *for* the user: produce a big first batch of candidate
moves, drawn from the menu below and tailored to their specific business. Aim for
breadth — and breadth means every category, not just the easy ones. The first
batch must include at least one **Love** candidate if any plausibly fits, because
Love is the category a first pass skips by default; do not leave the whole Love
category to the sweep in 2b. Group them so the user can scan. Then invite the
user's own additions — they know moves you cannot guess.

The menu (a palette to generate from, not a checklist to complete):

- **Move up a market rung.** Reposition to enter a healthier segment — leave the
  hobbyist far-left of the curve and become the "affordable" option in the next
  market up. Target customers who optimize for value, not cost.
- **Change the budget you land in.** Reposition the purchase into an easier
  budget category (a risk/safety line vs. gross margin). Land small under the
  discretionary threshold, then expand. Escape the add-on ceiling by standing
  alone.
- **Reframe the value metric — value created, not cost saved.** Price against the
  metric the customer *already* uses to judge success (growth, leads, revenue),
  not against cost savings. The same product pitched as "save money" versus "grow
  revenue" can carry a several-fold higher price, because growth is worth far more
  than savings. Find that metric and price against its ceiling.
- **Build Love drivers** (customers who advocate, forgive weaknesses, and *want*
  you to charge more). **Walk this entire list against the business — do not stop
  at the obvious one.** Love is the most-missed category (the first batch tends to
  over-index on value and utility), so consider every driver and propose each one
  that plausibly fits, even loosely; you will pick the one or two to own later:
  *Mission* (supporting a change bigger than the product) · *Community* (a place
  members belong, learn, and help each other) · *Reciprocity* (you give before,
  or more than, you take) · *Transparency* (openness about the ups and downs, even
  embarrassing ones) · *Design* (a joy to use, from a company that obviously cares
  about craft) · *Quality* (the relief and pleasure of reliability) · *Personality*
  (customers use your brand to express their own) · *Culture* (supporting an org
  that treats its people and vendors well) · *Ecosystem* (members gain more money
  or prestige together than apart) · *Authenticity* (the mission is genuine, not
  performative).
- **Build Utility drivers** (rational reasons the ROI is clear and the choice is
  safe). **Walk this entire list too**, and surface each driver that plausibly
  fits before narrowing to the one or two worth deepening:
  *Unique capability* (something no competitor has that they need) · *Quality*
  (a seamless, flawless experience) · *Simplicity* (surprising ease, itself
  valuable) · *Integrations* (works with what they already run — and raises
  switching cost) · *Convenience* (saves effort worth paying to avoid) · *Training*
  (once staff are trained, switching is costly) · *System-of-record* (critical data
  lives here; risky to move) · *Risk-reduction* (lowers the chance something
  breaks) · *Familiarity* (a paradigm they already know) · *Market-leader* (the
  safe, nobody-gets-blamed choice) · *Onboarding* (an easy start correlates with
  higher willingness to pay) · *Location* (being right where the customer already
  is). Note some Utility drivers double as mild coercion (integrations, training,
  system-of-record raise switching cost) — real reasons to stay, but see the
  coercion check below.
- **Make the value visible.** If customers cannot see the value, no price works.
  Quantify results in-product ("you saved 47 hours this month"), shorten
  time-to-value, and build feedback loops that remind customers of their wins.
- **Create genuine differentiation.** Be substantially different at one specific,
  nameable thing that customers with money agree is worth more — not merely above
  average. If you cannot name "best at what" in a few words, you do not have it
  yet, and that is the move.
- **Repackage / re-tier.** Rename a tier to anchor identity (a "Business" tier the
  buyer self-selects into). Add multi-unit pricing for ideal customers who
  generate referrals. Use thresholds that feel safe. Split value across more than
  one honest path to spend.
- **Check your reliance on coercion.** If today's retention rests on contracts,
  switching costs, or data lock-in rather than Love or Utility, raising the price
  will expose it — the moment a good alternative appears, coerced customers leave.
  Ask the honest question: *"If a good alternative appeared tomorrow, who leaves
  immediately?"* A move here is to replace a coercion crutch with a real reason to
  stay.
- **Pick and align a pricing strategy.** If the mixed signals trace back to never
  having committed to one strategy, the move may be to make that choice and align
  behind it (a separate method; see "Optional companion skills").

### 2b. Sweep the tables — prompt on the drivers you did NOT cover

The first batch always leans on whatever was most salient — usually value-created
and value-visible moves. Whole drivers get silently skipped, Love especially, and
the worst case is the wielder never even *tried* a driver the business is
obviously strong on (a product with a big user community that never got a
community prompt). So before refining, run one explicit coverage pass over the two
enumerated tables above — this is why they are enumerated, not summarized:

1. **Mark what is already covered.** Tick each Love and Utility driver the current
   candidate list already reflects. Those need no prompt.
2. **Turn the uncovered drivers into prompts.** For the drivers the list has NOT
   touched, the drivers *are* your prompt list. Do **not** interrogate all ~22 one
   at a time — that is too slow. Surface the uncovered ones in **one compact scan**
   and ask which, if any, are real for this business — pointing at a specific
   strength you already know about (from Phase 1 or your own research) even if the
   user never raised it in Phase 2, since the driver the user does not think to
   mention is exactly the one this sweep exists to catch: *"We haven't touched
   community, delightful design/UI, mission, or personality yet — you clearly have
   a large user community; is there a lever there? Anything on delight or
   emotion?"*
3. **A quick "no" is a fine answer.** The point is to make the user react to each
   uncovered driver at least once, not to force a move out of it. "No, not us"
   closes that driver; "actually, yes…" becomes a new `[raw]` candidate.

Skip a driver only when the list already clearly reflects it, or the user has
dismissed it. Never let the whole category slide just because the first batch
happened not to mention it. This one prompt is the difference between a menu the
user recognizes and one that quietly missed their real strength.

### 2c. Refine together into a candidate list

Go back and forth. For each idea the user reacts to, do one of:

- **Sharpen** the ones they like — make the vague specific ("build Love" →
  "publish a monthly transparency report on uptime and incidents") — and retag it
  `[sharpened]`.
- **Cut** the ones they clearly do not want, or that plainly do not fit — move it
  to "Considered and cut" as a one-liner.
- **Add** the user's own ideas — tag them `[raw]` until sharpened.

Edit the list **in place** in the file as you go. The file holds the current
candidate list, not a history of every version. Keep judgment light; the goal
here is a good *menu*, not a final decision. Resist grading yet — that is Phase 3.

**Gate to Phase 3:** there is a refined candidate list the user recognizes as
"the things we might do." Now warn them the mode is about to change.

## Phase 3 — Select the shortlist (adversarial; grill hard)

Goal: sort every candidate into one of three outcomes, and lock the primary list.
**Announce the switch:** *"Now we change gears. In brainstorm mode I accepted
everything; here I push back on every one. Each move ends up in one of three
places, and most will not land in the primary one — that's the point."*

The three outcomes:

- **Pay-more driver (PRIMARY — the point of this exercise).** Something that would
  make an *existing* customer actually pay more — upgrade to a higher tier, or
  accept a general price increase without leaving. This is the bucket the whole
  method exists to fill.
- **Strength to lean into (SECONDARY).** A genuinely good move that helps the
  business — wins new customers, cuts churn, sharpens positioning, strengthens the
  brand — but that would *not*, on its own, make an existing customer pay more.
  These are **not** failures and must **not** be discarded; they are saved for the
  positioning and marketing work downstream.
- **Cut.** Not good enough, or fluff. Gone (to "Considered and cut").

### The decisive question: would an EXISTING customer pay more?

Apply this to every candidate that clears "is it even a good idea," and apply it
*before* you worry about buildability:

> *Would this make an **existing** customer choose a higher tier, or accept a
> price increase without churning? Or does it "only" help win new customers,
> reduce churn, or improve positioning?*

Why the existing-customer bar is the sharp one: an existing customer has already
priced you in and settled into a habit. To move them you must give them something
genuinely **new** — a new capability, a new tier with real added value, a new
service. **Positioning re-describes what they already have; it rarely moves an
existing customer**, though it wins new ones and reduces churn (real value — wrong
bucket). A new customer paying more counts too, but the existing-customer bar is
the strong one: clear it and you have cleared everything.

So the honest sort usually runs:

- Re-framing, "tell the story better," trust/proof, brand, community-as-goodwill →
  almost always a **Strength (secondary)**, *unless* it is attached to something
  new the customer actually receives.
- A new capability, a new tier bundling real added value, a premium service, a
  genuinely differentiated feature → candidate **pay-more driver**, to be grilled
  further.

Do not let a secondary strength be dressed up as a pay-more driver because it is
exciting. Worked example: "reposition the business tier on 'we grow your revenue'"
is smart and helps churn — but if the only thing behind it is the same product, it
is positioning, so it is a **strength**, not a pay-more driver. If a repositioning
*is* backed by something new the customer receives, then the *new thing* is the
driver and the positioning rides along with it.

### Grill the pay-more candidates

For everything you have provisionally sorted as a pay-more driver, run the four
tests. Be rude to the *idea*, never to the person.

1. **Does it really make them pay more?** Re-confirm the decisive question with
   evidence, not hope. Which existing customer, in what situation, upgrades or
   accepts the raise because of this — and why? Strike "could" and "might."
2. **Is it consistent with the strategy and the rest of the business?** Does it
   fit the direction, the chosen market, the positioning — or create a new mixed
   signal?
3. **Can you actually build/do it?** With this team, this quarter, this budget? A
   move you cannot implement is not a move.
4. **Do customers actually want it?** Real evidence they value it, or the founder
   wishing they did? Where is the proof? Separate wanting the *thing* from
   validating the *price* — evidenced demand for the capability passes this test
   even when the exact figure is still a hypothesis (the number is handed off
   anyway); just flag the price as unvalidated.

A pay-more candidate that fails test 1 is **not** cut by default — check whether it
is still a genuine strength and, if so, move it to the secondary bucket rather than
the bin.

**Test 3 is not all-or-nothing — a driver can pass as a capped pilot.** A move is
often buildable now in a small, capped form (a pilot with a hard limit on
customers) while unproven at scale. That is a legitimate survival, not a cut:
record it as "buildable as a pilot; scale unproven" with the specific cap, because
the pilot is how the founder learns the real delivery cost and validates the price
before promising it to everyone. Do not wave the scale risk through, and do not cut
a good driver just because it cannot serve everyone on day one.

### The interrogation

If a devil's-advocate skill such as *Rude Q&A* / `asb-rude-qa` is installed,
invoke it with this brief: *"Grill each proposed price-raising move. FIRST force
the distinction: would this make an EXISTING customer pay more — upgrade a tier or
accept a raise — or is it merely good positioning, churn reduction, or an
acquisition win? Sort it accordingly. THEN, for the real pay-more drivers, attack
whether it truly moves willingness to pay, whether it fits the strategy, whether
this team can build it, and whether customers actually want it. Do not let a
positioning win pose as a pay-more driver, and do not let the founder be
wishy-washy."* If it is **not** installed, run the interrogation yourself with the
same posture: sharp, specific, unfair-if-useful questions with a collegial frame.
Attack the *claim*, not the person. Use the Opposite Test — if the opposite of a
claim is obviously nonsense, the claim said nothing ("customers want quality" —
nobody wants low quality, so it is empty). Do not accept "it depends" or "we'll
figure that out later."

**Dwell when the answer is fuzzy; move on when it earns it.** Stay on one move
until it is genuinely defended with a specific, honestly moved to the secondary
bucket, or cut. Three rounds on one move is not a reason to wave it through.

It does not matter *how many* pay-more drivers survive — one strong one is a fine
outcome. What matters is that each is real: it would make an existing customer pay
more, and it is aligned, buildable, and wanted. The secondary strengths list can
be as long as it earns — it is a gift to the positioning work, not clutter.

### Lock it in

When the sort is settled, confirm it explicitly with the user — this is the one
big state change the skill drives toward. Write the primary drivers into
`### Pay-more drivers` and the saved ones into `### Strengths to lean into`,
restate the `directional target` (roughly which higher rung), set `locked: true`,
advance `phase` to `done`, and remove the `⚠️ IN PROGRESS` note.

**The founder's call on the price itself is theirs, and one valid outcome is to
adopt the moves without lifting the number yet.** After building the case, a user
may reasonably conclude *"I'm not going to change the headline price right now, but
I'm committing to these one or two drivers — they make me stronger and set up a
raise later."* That is a real, successful result: the skill's job was to build the
case and the moves, and they stand on their own even if the price move waits.
Record it plainly (note in `directional target` that the number is held for now
while the moves proceed).

Then write the **handoff** — the work that comes *after* this skill and is not part
of it: choosing the exact new price and tiers, drafting the honest increase letter
to customers, and feeding the **Strengths to lean into** list into the positioning
and marketing work. Name those as the next tasks so the user knows where the thread
continues.

## Refusal and edge conditions

- **No concrete price to reason about.** If the user has only a vague idea with no
  real product, price, or customers yet, there is nothing to diagnose — help them
  get concrete first, or note this is premature.
- **"Just tell me the number."** This skill builds the case and the moves, not
  the exact figure. Do the diagnosis and the moves; hand off the number as the
  next task rather than guessing it.
- **The user asks you to argue them *out* of raising.** That is not this skill's
  job — it drives toward a higher price. What it does allow is the founder
  deciding, after the case is built, to adopt the moves without lifting the
  number yet (see "Lock it in"). Do not turn the exercise into a debate over
  whether to raise at all.
- **The user wants validation, not scrutiny.** In Phase 3 especially, if the user
  is seeking a rubber stamp for a wishful move, name that and hold the four tests.
  The value of this phase is the friction.
