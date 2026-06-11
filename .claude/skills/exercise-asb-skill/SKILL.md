---
description: "Simulated-use exerciser for asb-* skills: role-plays realistic user scenarios through a SKILL.md and judges the transcripts against a fixed rubric, producing a verdict table and a patch list. Invoke as /exercise-asb-skill <skill-name> [path-to-draft] — works on published skills (regression test before/after edits) and on in-progress drafts (Phase 7 of create-asb-skill)."
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Edit, AskUserQuestion
---

# exercise-asb-skill — wind-tunnel for asb-* skills

A skill that reads well can still wield badly: it recites the framework
instead of applying it, nods along with weak answers, forgets to refuse the
user it should refuse, or produces advice any consultant could have given.
The only way to find those failures is to watch the skill being used. This
skill simulates that use and judges the result.

Two contexts, same procedure:

- **Forging** (inside `create-asb-skill`, Phase 7): exercise the on-disk
  draft, patch FAILs directly with Edit, re-run failed scenarios.
- **Iterating** (standalone): exercise a published skill before and/or after
  proposed edits. Propose patches as diffs and get Jason's sign-off before
  editing a published skill.

## Step 1 — Resolve the target and quarantine

Resolve the target SKILL.md:

- A skill name (`asb-rude-qa`) → `.claude/skills/<name>/SKILL.md`.
- An explicit path → that file.
- Neither given → ask.

Read the file ONCE, fully. Then adopt the **quarantine**: for the rest of
the exercise, the wielder side of every role-play may use ONLY what is in
that file. No knowledge of Jason's corpus, no memory of the forging
conversation that produced the skill, no familiarity with this repo. If the
wielder needs a definition, rule, or example that isn't in the file, that
absence is itself a finding — note it; do not fill it in from outside
knowledge. State the quarantine in one line before the first transcript.

(Hardening option, worth it for high-stakes re-tests: dispatch each scenario
to a subagent whose prompt contains only the SKILL.md text and the scenario,
so quarantine is enforced structurally rather than by discipline. This skill
is dev-only; subagents are allowed.)

## Step 2 — Design the scenarios

Construct 3–5 scenarios tailored to the target skill's domain. Required mix:

1. **Canonical user.** Rich, realistic input squarely inside the skill's
   sweet spot. Tests the happy path end to end.
2. **Terse/underspecified user.** A two-line prompt with most context
   missing. Tests whether the skill's intake questions and dwell rules fire
   — or whether the wielder fills in the blanks itself and barrels ahead.
3. **Boundary case.** A situation near the edge of where the framework
   applies. Tests whether the skill handles the edge honestly or
   confidently misapplies.
4. **Refusal case.** A user the skill should refuse per its own refusal
   conditions (vibe-only target, validation-seeker, theater). Tests that
   refusal actually fires, and fires kindly.
5. *(Optional)* **Lazy answerer.** A cooperative user whose answers are
   consistently weak — "should be fine," "we'll figure it out later."
   Tests that the bar doesn't drop across many rounds.

Each scenario gets a one-line persona (who they are, what they bring, how
they behave under pressure). Show the scenario list to Jason before running;
he may swap or sharpen one. Don't wait long — if he's clearly in
"just run it" mode, proceed.

## Step 3 — Run the transcripts

For each scenario, role-play BOTH sides for roughly 6–12 turns, written out
as a labeled transcript:

```
USER: <what they say>
WIELDER: <what the skill-loaded LLM says, per the SKILL.md and nothing else>
```

Rules of play:

- The simulated user is realistic, not a softball: weak answers sometimes,
  pushback, mild frustration, occasionally trying to skip steps or get the
  deliverable without the work.
- The wielder follows the SKILL.md literally — including its phase order,
  artifact instructions, and refusal conditions. Where the SKILL.md is
  ambiguous, play the most plausible reading and flag the ambiguity.
- Run the transcript until the scenario's question is answered (the refusal
  fired or didn't; the dwell held or collapsed) — full exercises don't need
  to reach their natural end once the verdict is clear.
- Keep transcripts honest. The exercise is worthless if the wielder is
  played as an idealized version of what the SKILL.md merely gestures at.

## Step 4 — Judge each transcript

Judge against this fixed rubric — each criterion is a separate lens with its
own verdict line: **PASS / WEAK / FAIL** plus a quoted line from the
transcript as evidence. Skip criteria a scenario can't speak to (mark n/a).

| Criterion | The question |
| :-------- | :----------- |
| **Applied vs. recited** | Did the wielder run the framework on the user's specifics — or lecture the framework back at them? A wielder that explains the mental model instead of using it FAILS. |
| **Specific vs. generic** | Could a vanilla LLM with no skill loaded have produced this conversation? Any stretch of generic-consultant advice ("consider your target market…") is evidence of FAIL. |
| **Dwell fired** | On weak/vague/wishful answers: did the wielder stay on the point, name the dwell, and offer candidate answers — or accept "good enough" and move on? |
| **Refusal fired** | For the refusal scenario: did the wielder refuse, for the right reason, kindly, and offer the constructive path in? Refusing rudely or proceeding anyway both FAIL. |
| **Tone/substance split** | Gentle framing with an unmoved bar. Scolding/curt = FAIL one way; nodding along with sub-par answers = FAIL the other. |
| **Artifact handling** | If the SKILL.md specs a working document: created at the right moment, schema followed, updated as the exercise progressed, resume behavior plausible. |

## Step 5 — Report and patch

1. **Verdict table** — scenarios × criteria, one glance.
2. **Patch list** — every FAIL and WEAK mapped to the SKILL.md section that
   caused it, with a concrete proposed edit. Distinguish the two failure
   sources: the SKILL.md is missing/ambiguous (patch the file) vs. the
   SKILL.md is clear but easy to drift from (strengthen the standing rule —
   usually by making it more explicit, earlier, or repeated at the point of
   use).
3. **Apply patches:**
   - Forging context: Edit the draft directly, then re-run ONLY the failed
     scenarios until clean.
   - Published skill: show Jason the proposed diffs and get sign-off before
     editing. After editing, re-run failed scenarios. Remind him `bun run
     lint` before commit.
4. If everything passes, say so plainly and stop — do not invent findings to
   justify the exercise. A clean pass on a published skill is the expected
   result, not a suspicious one.

## Judging discipline

- Quote evidence for every non-PASS verdict. No quote, no finding.
- Judge the transcript, not the SKILL.md prose. A beautifully-written rule
  that didn't fire when tested is a FAIL, not a PASS-because-the-text-says-so.
- One systemic failure beats five cosmetic findings. If the same root cause
  (e.g. "dwell rule stated once, buried mid-file") produces failures across
  scenarios, report it once as the root cause with one patch.
- Remember the audience: end users of asb-* skills are strangers with no
  corpus. Any moment where the transcript only works because the wielder
  knew something outside the file is a self-containment FAIL.
