# asb-skills

Public Claude Code skills implementing frameworks from
[A Smart Bear](https://longform.asmartbear.com) and
[Hidden Multipliers](https://hiddenmultipliers.com).

Browse the skills at **[skills.asmartbear.com](https://skills.asmartbear.com)**.

## Install a skill

Every skill lives at `.claude/skills/asb-<name>/SKILL.md`. To use one in your
own Claude Code:

```sh
mkdir -p ~/.claude/skills/asb-<name>
curl -fsSL https://github.com/asmartbear/asb-skills/raw/main/.claude/skills/asb-<name>/SKILL.md \
  -o ~/.claude/skills/asb-<name>/SKILL.md
```

## Develop

```sh
bun install
bun run dev      # http://localhost:4321
bun run lint
bun run build
```

See `CLAUDE.md` for the project rules (especially the public/dev-only skill
distinction).

## Future

Ideas worth doing once the catalog grows or the priority changes. Not
backlog items in any tracked sense — just a parking lot.

- **Categorize the skills.** Once there are more than ~10 skills, group
  them on the home page (e.g. by problem the reader has, by stage of
  company, or by chapter of *Hidden Multipliers*).
- **Sort/filter strip on the home page** (Featured · Newest · All).
  Worth it once there are 6+ skills.
- **`npx`-style one-line installer.** Today users copy a `SKILL.md` file
  into `~/.claude/skills/<name>/`. A `npx <something> install asb-<name>`
  command would lower the friction. Either ship our own installer or
  document an existing community one.
- **RSS / "what's new" feed.** Auto-generated from new or updated skills.
  Lets readers subscribe and supports "new skill out" tweets without
  hand-writing each one.
- **"Recently added" rail on the home page.** A single horizontal row at
  the top of the home page surfacing the newest skill (or the next-most-
  recently-updated one). Gives the home page a sense of motion. Useful
  once there's a steady cadence of new skills.

## Future skills

Backlog of skills to build, drawn from A Smart Bear articles and
*Hidden Multipliers* chapters. Unordered.
When adding an entry, do a quick search of the corpus to identify the
source article(s) and link/cite them inline so the context is ready
when we sit down to build the skill.

<!-- Add entries here as: "- **Short name.** One-line idea. _Source:_ ..." -->

- **Know thyself.** Interrogate the user about who they are with guiding
  questions that surface stories and scattered anecdotes rather than tidy
  self-summaries; collect the raw material, clean it up, then mine it for
  the common themes that reveal who they really are. _Source:_ the
  _Yourself_ chapter of *Hidden Multipliers* (primary); also
  [be-yourself](https://longform.asmartbear.com/be-yourself/),
  [authentic](https://longform.asmartbear.com/authentic/),
  [scars](https://longform.asmartbear.com/scars/),
  [compass](https://longform.asmartbear.com/compass/).
- **Needs Stack for a persona.** Given a target persona, generate their
  Needs Stack — the ranked layers of what they need from a product, from
  table-stakes up through aspirational — so positioning and roadmap
  decisions can be made against an explicit hierarchy. _Source:_ the
  _Positioning_ chapter of *Hidden Multipliers* (primary); also
  [needs-stack](https://longform.asmartbear.com/needs-stack/).
- **Product positioning.** Generate positioning for a product grounded
  in creating value (not saving money), written in Jason's voice —
  concrete, specific, jargon-free — and built on top of the persona's
  Needs Stack (produced by the **Needs Stack** skill above). _Source:_
  the _Positioning_ chapter of *Hidden Multipliers* (primary); also
  [more-value-not-save-money](https://longform.asmartbear.com/more-value-not-save-money/),
  [specificity](https://longform.asmartbear.com/specificity/),
  [another-10x](https://longform.asmartbear.com/another-10x/),
  [opposite-test](https://longform.asmartbear.com/opposite-test/),
  [focus](https://longform.asmartbear.com/focus/).
- **Refine prose in Jason's voice.** Rewrite marketing/product prose to
  be direct, concrete, jargon-free, and honest — including naming the
  ways you're "worse" or "weak," because honesty (and the right framing
  of weakness) actually wins customers. _Source:_ relevant chapters of
  *Hidden Multipliers* (primary); also
  [worse-but-unique](https://longform.asmartbear.com/worse-but-unique/),
  [specificity](https://longform.asmartbear.com/specificity/),
  [authentic](https://longform.asmartbear.com/authentic/),
  [authentic-is-dead](https://longform.asmartbear.com/authentic-is-dead/),
  [opposite-test](https://longform.asmartbear.com/opposite-test/).
- **Customer-interview kit.** For a given product/persona, generate
  interview goals, hypotheses to test, and the questions to ask —
  framed so you learn whether the problem is real before you've
  written code. _Source:_ the _Discovery_ chapter of *Hidden
  Multipliers* (primary — you cited ch. 10; flagging since the
  Yourself chapter is unrelated); also
  [customer-development](https://longform.asmartbear.com/customer-development/),
  [find-customers-to-interview](https://longform.asmartbear.com/find-customers-to-interview/),
  [customer-validation](https://longform.asmartbear.com/customer-validation/).
- **Define Carol (ICP).** Walk through the full _ICP_ chapter of
  *Hidden Multipliers* to produce a sharp definition of Carol — the
  ideal customer persona — building up a growing document as each
  step lands. Likely splits into one skill per step, since each is
  complex and benefits from heavy input (sales transcripts, support
  tickets, brainstorming, customer interviews):
  1. **Keystones** — strengths → motivating characteristics that
     concentrate in your best customers and are absent in the worst.
  2. **Deal-breakers** — weaknesses → disqualifiers that define the
     anti-market and hone the keystone description.
  3. **Inciting events** — what triggers Carol to buy *now*, coupled
     to each keystone.
  4. **Market-segment definition** — synthesize the above into a
     specific, targetable segment description (the real "who is
     Carol").

  Each step appends to one shared "story of Carol" document.
  _Source:_ the _ICP_ chapter of *Hidden Multipliers* (primary);
  also [purgatory](https://longform.asmartbear.com/purgatory/)
  (especially for steps 1 — Keystones — and 3 — Inciting events).
- **Strengths & weaknesses (writestorm).** Run the strengths-and-
  weaknesses exercise from the second half of the _Carol_ chapter,
  driven by the writestorming protocol in the appendix. This is
  step 0 of the Define-Carol journey above — keystones and deal-
  breakers are derived from these strengths and weaknesses, so the
  output feeds straight into the shared Carol document. _Source:_
  the _Carol_ chapter of *Hidden Multipliers* (primary), together
  with the _Writestorming_ appendix (`app-writestorming`).
- **Willingness-to-pay strategy.** Force the user to commit to a
  concrete WTP strategy that actually fits their company — picking
  the specific motivators that drive *their* customers to pay, and
  pricing/packaging against them — rather than defaulting to
  generic "cost-plus" or "match the competition." _Source:_ the
  _Price is Not Just a Number_ chapter of *Hidden Multipliers*
  (`price-extra`, primary); also
  [willingness-to-pay](https://longform.asmartbear.com/willingness-to-pay/).
- **Should I raise prices?** Walk the user through deciding whether
  (and how) to raise prices on an existing product — surfacing
  willingness-to-pay signals, framing risk, the mechanics of
  repositioning vs. raw price-hike, and downstream effects on
  business model, retention, and marketing budget. _Source:_ the
  two pricing chapters of *Hidden Multipliers* (`price-extra` —
  _Price is Not Just a Number_; and `price-number` /
  `price-wpe` — _Pricing the Number_, primary); from the
  [pricing topic page](https://longform.asmartbear.com/topics/pricing/),
  the on-topic articles are:
  [more-value-not-save-money](https://longform.asmartbear.com/more-value-not-save-money/),
  [willingness-to-pay](https://longform.asmartbear.com/willingness-to-pay/),
  [pricing-determines-your-business-model](https://longform.asmartbear.com/pricing-determines-your-business-model/),
  [never-compete-on-price](https://longform.asmartbear.com/never-compete-on-price/),
  [discount-gambit](https://longform.asmartbear.com/discount-gambit/),
  [more-or-less](https://longform.asmartbear.com/more-or-less/),
  [price-vs-quantity](https://longform.asmartbear.com/price-vs-quantity/),
  [annual-prepay](https://longform.asmartbear.com/annual-prepay/).
- **Strategy stress-test.** Take a proposed strategy as input and
  walk the user through the framework in
  [great-strategy](https://longform.asmartbear.com/great-strategy/),
  playing a constructive devil's advocate that coaches the strategy
  into conforming to each specific step before letting it pass.
  Also pressure-tests the strategy for leverage and for whether a
  startup can plausibly beat the incumbent it's aimed at.
  _Source:_
  [great-strategy](https://longform.asmartbear.com/great-strategy/),
  [leverage](https://longform.asmartbear.com/leverage/),
  [startup-beats-incumbent](https://longform.asmartbear.com/startup-beats-incumbent/).
- **Problem/market check.** Walk the user through the table-based
  analysis from
  [problem](https://longform.asmartbear.com/problem/) to determine
  whether their idea is hitting a real, sufficient problem in a
  real market — filling out the table row by row and forcing
  honest answers in each cell — including whether the problem is
  one a startup can actually win against incumbents. _Source:_
  [problem](https://longform.asmartbear.com/problem/),
  [startup-beats-incumbent](https://longform.asmartbear.com/startup-beats-incumbent/).
- **Extreme-questions workshop.** Facilitate an "extreme
  brainstorming" session, posing the deliberately outsized
  questions ("what would 10× this look like? what would kill us
  tomorrow?") to break the user out of incremental thinking and
  surface non-obvious moves. _Source:_
  [extreme-questions](https://longform.asmartbear.com/extreme-questions/).
- **Impostor-syndrome therapist.** Hold a back-and-forth, therapist-
  style conversation with the user specifically on impostor
  syndrome and the adjacent founder-psych territory: self-doubt,
  uncertainty about whether you can do it, taking (and discounting)
  advice, dark days and emotional drain, the crucible of the early
  years, comparison anxiety, and feeling like a fraud. The skill
  should *expand* on
  [impostor-syndrome](https://longform.asmartbear.com/impostor-syndrome/)
  — not just summarize it — drawing on the cluster below. _Source:_
  [impostor-syndrome](https://longform.asmartbear.com/impostor-syndrome/)
  (primary); from the
  [psych topic page](https://longform.asmartbear.com/topics/psych/),
  the on-topic articles are:
  [feelings-of-inadequacy](https://longform.asmartbear.com/feelings-of-inadequacy/),
  [chaos-at-start](https://longform.asmartbear.com/chaos-at-start/),
  [startups-emotionally-draining](https://longform.asmartbear.com/startups-emotionally-draining/),
  [survivor-bias](https://longform.asmartbear.com/survivor-bias/),
  [bad-advice](https://longform.asmartbear.com/bad-advice/),
  [failure-to-face-the-truth](https://longform.asmartbear.com/failure-to-face-the-truth/),
  [success-guaranteed](https://longform.asmartbear.com/success-guaranteed/),
  [identity-selling-sadness](https://longform.asmartbear.com/identity-selling-sadness/),
  [drudgery](https://longform.asmartbear.com/drudgery/),
  [compass](https://longform.asmartbear.com/compass/),
  [fail](https://longform.asmartbear.com/fail/),
  [relativism](https://longform.asmartbear.com/relativism/),
  [be-yourself](https://longform.asmartbear.com/be-yourself/),
  [expert-distraction](https://longform.asmartbear.com/expert-distraction/),
  [your-idea-sucks-do-it-anyway](https://longform.asmartbear.com/your-idea-sucks-do-it-anyway/),
  [perseverance](https://longform.asmartbear.com/perseverance/).
  (Off-topic and excluded from the psych page:
  `ramen-profitable` — about how to frame profitability, not self-
  doubt; `rich-vs-king-sold-company`, `legacy`, `two-big-things`,
  `sacrifice-your-health-for-your-startup` — different concerns.)
- **Quarterly plan builder.** Run a team through the strategic-
  planning framework to produce their quarterly plan — goals,
  bets, and the work that flows from them — in the structure
  Jason lays out. _Source:_
  [strategic-planning](https://longform.asmartbear.com/strategic-planning/).
- **Pick product metrics.** Help a team select the right small set
  of product metrics — ones that actually drive decisions and
  catch real changes — instead of vanity dashboards. _Source:_
  [product-metrics](https://longform.asmartbear.com/product-metrics/).
- **Quit or push?** Interrogate the user on whether to stop or keep
  going on a current effort, using the signals and questions from
  [perseverance](https://longform.asmartbear.com/perseverance/) to
  separate grit from sunk-cost denial. May also surface a
  "yes, and…" reframing that dissolves the binary, and where
  appropriate apply the "two-box" Rich-vs-King framing to expose
  what the user actually wants underneath the decision. _Source:_
  [perseverance](https://longform.asmartbear.com/perseverance/),
  [say-yes](https://longform.asmartbear.com/say-yes/),
  [rich-vs-king-sold-company](https://longform.asmartbear.com/rich-vs-king-sold-company/)
  (situational).
- **Fast or slow decision?** Classify a pending decision as one that
  should be made fast (cheap, reversible) vs. slow (expensive,
  one-way-door), and recommend the appropriate process for each.
  _Source:_
  [decisions-fast-slow](https://longform.asmartbear.com/decisions-fast-slow/).
- **Should I make this investment?** Evaluate a larger investment
  (time, money, focus, hire, fundraise) against the framework in
  [investment](https://longform.asmartbear.com/investment/), and
  fold in the user's personality and personal desires — including
  "two-box" / Rich-vs-King-style trade-offs — so the answer reflects
  who they actually are, not just the spreadsheet. _Source:_
  [investment](https://longform.asmartbear.com/investment/),
  [rich-vs-king-sold-company](https://longform.asmartbear.com/rich-vs-king-sold-company/).
- **Harden the plan against uncertainty.** Stress a plan or
  strategy against true uncertainty (not just probability) —
  unknown unknowns, regime changes, irreducible ignorance — and
  reshape it so it stays viable across futures rather than
  optimizing for one. _Source:_
  [predict-the-future](https://longform.asmartbear.com/predict-the-future/).
- **Evaluate a startup idea/plan.** Pressure-test a proposed
  company idea or plan: catch the common dumb mistakes from
  [avoid-blundering](https://longform.asmartbear.com/avoid-blundering/),
  multiply through the survival-odds factors of
  [startup-drake-equation](https://longform.asmartbear.com/startup-drake-equation/),
  and check whether the idea has a real reason a startup could beat
  an incumbent at it (asymmetric advantage, not just "we'd do it
  better") per
  [startup-beats-incumbent](https://longform.asmartbear.com/startup-beats-incumbent/).
  _Source:_
  [avoid-blundering](https://longform.asmartbear.com/avoid-blundering/),
  [startup-drake-equation](https://longform.asmartbear.com/startup-drake-equation/),
  [startup-beats-incumbent](https://longform.asmartbear.com/startup-beats-incumbent/).

