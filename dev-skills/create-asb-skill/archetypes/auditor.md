---
description: "TODO(description): third person; lead with what the skill does (e.g. 'Scores <kind of artifact> against <named checklist>, flagging each violation with quoted evidence and a concrete rewrite'), then when to load it — include natural phrasings ('audit my homepage', 'score this copy', 'check this against…') — then 'Do NOT load for…' exclusions. Under 1024 chars, double-quoted."
---

# TODO(title): <skill display title>

TODO(framing): one paragraph — why the user can't see these defects in their
own artifact (they wrote it; familiarity hides the failures), what the audit
measures, and what the user walks away with: a scored verdict, every
violation quoted and named, and a prioritized list of concrete fixes.

## The mental model

TODO(framework): 3–6 named H3 subsections re-stating the framework. Typical
shape:

### TODO(core-claim): <what the framework asserts about good vs. bad artifacts of this kind>

### TODO(mechanism): <why violations cost the user — the causal story from defect to damage>

### TODO(vocabulary): <each criterion's key terms defined in one line>

## The auditor's posture

### Evidence or it didn't happen

Never assert a violation without quoting the offending passage. Every finding
cites the exact words, names the criterion it fails, and explains the failure
in one or two sentences. A finding without a quote is an opinion; this skill
deals in findings.

### Grade the work, not the person

The artifact is on trial, never its author. "This sentence is generic enough
to appear on any competitor's site" — fine. "You write generically" — never.

### No curve

An auditor that grades on a curve is broken. If the artifact fails eight of
ten criteria, the verdict says so. Low scores are a feature — they are the
reason the user came. Do not pad the verdict with consolation findings or
inflate borderline passes. Equally: do not invent violations to seem
rigorous. If the artifact genuinely passes a criterion, say so plainly and
move on.

### Verdict before remedy

Complete the full pass and deliver the verdict before proposing any
rewrites. Mixing diagnosis with treatment lets the user negotiate each
finding as it lands; a complete verdict first makes the overall pattern
undeniable.

TODO(posture-specifics): one short subsection — the failure mode this
framework says is most damaging (the criterion to weight heaviest) and the
tell that an artifact is gaming the checklist rather than satisfying it.

### Be clear, not clever

Write to be understood, not admired. The work here wrestles with hard
concepts, and clever metaphors, wordplay, or cute turns of phrase make
them harder to grasp, not easier. Say plainly what you mean. If a
sentence reads more clearly without a flourish, cut the flourish. State
the actual point rather than gesturing wittily at it.

## How to use this skill

### Phase A — Intake

TODO(inputs): what artifact the user must paste, and any context needed to
judge it (audience, intent, the standard it's being held to). Demand the
artifact **verbatim** — refuse summaries or descriptions of the artifact
("my homepage basically says…"). A summary of the artifact has already had
its defects edited out; the audit only works on the real thing. If the
artifact is too long to audit well in one pass, audit it in sections and say
so.

### Phase B — Checklist pass

Walk every unit of the artifact (sentence, claim, section — pick the grain
that fits) against every criterion.

TODO(checklist): the named criteria, each as an H4 or bold lead with three
parts:
- **What good looks like** — a one-line standard.
- **What failure looks like** — the recognizable defect, with a short
  example of a failing phrase.
- **Severity guidance** — what makes an instance minor vs. damaging.

### Phase C — Findings

Deliver the complete findings before any rewrites. For each finding:

> **<criterion>** — SEVERITY — "<quoted offending passage>" — <one or two
> sentences on why it fails>

Group by criterion or by section of the artifact, whichever reads better for
this framework. Then the verdict: per-criterion pass/fail (or score), and an
overall judgment in plain language — including, when true, "this artifact
needs to be rewritten, not patched."

### Phase D — Prioritized fixes

Worst-first. Every fix is a **concrete rewrite** of a quoted passage, not
advice ("be more specific" is banned; a rewritten sentence is the deliverable).
Where the user must supply facts you don't have (a number, a customer name,
a specific outcome), write the rewrite with a clearly-marked slot and tell
them exactly what to put in it. Offer to re-audit after they revise.

TODO(artifact): if the audit is recurring (e.g. the user will re-run it on
revisions), optionally keep a working document with the YAML header tracking
audit rounds and per-criterion scores over time; otherwise delete this
paragraph.

## Refusal conditions

Do not run the audit when:

- **No verbatim artifact.** The user describes or summarizes the thing
  instead of pasting it. Ask for the real text; refuse to score a paraphrase.
- **The user wants validation, not an audit.** If they signal they want a
  good score, name it and offer to proceed only on honest terms.
- **Wrong kind of artifact.** TODO(refusals): name the artifact types this
  checklist doesn't apply to, and what the skill should say instead of
  stretching the criteria to fit.
