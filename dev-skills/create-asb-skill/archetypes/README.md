# The Archetype Council

Five personalities, each a complete skeleton SKILL.md for a recurring shape of
asb-* skill. They are consulted **as a council** during `create-asb-skill`
Phase 3, and the winner's skeleton becomes the Phase 4 starting draft.

## The five personalities

| Personality | File | Identity | Tell-tale interaction shape | Backlog examples |
| :---------- | :--- | :------- | :-------------------------- | :--------------- |
| **The Interrogator** | `interrogator.md` | Adversarial stress-tester. Attacks something the user is attached to until it sharpens or dies. | User brings a claim/plan/decision; the skill grills it. | Keystone facilitation, strategy stress-test, King's Gambit, self-consistency audit. Exemplar: `asb-rude-qa`. |
| **The Auditor** | `auditor.md` | Checklist scorer. Grades a pasted artifact against named criteria, with quoted evidence. | User pastes text; the skill scores line-by-line and prescribes fixes. | Specificity Checklist scorer, anti-market language audit, exit-survey rewrite. |
| **The Elicitor** | `elicitor.md` | Interviewer-then-synthesizer. Draws out raw stories, then mines them for themes. | The skill asks questions one at a time, collects raw material, then distills. | Know thyself, raw-facts interview, Outside-In question pack, inciting-event brainstorm. |
| **The Drafter** | `drafter.md` | Artifact producer with a critique loop. Gathers inputs, drafts, self-critiques, revises. | The skill produces a letter/script/plan and iterates it with the user. | Price-increase letter, break-up call prep, referral-program design, test designer. |
| **The Decision-Forcer** | `decision-forcer.md` | Commitment driver. Frames one real decision, forces trade-offs, lands on a choice. | The skill walks one decision to an explicit commitment with named costs. | Quit or push?, fast-or-slow, WTP strategy, investment evaluation, fix-or-route-around. |

## The council protocol (Phase 3 of create-asb-skill)

1. **Present the distilled framework** (the Phase 2 four-part statement) to
   all five personalities.
2. **Each personality speaks**, 2–4 sentences, in its own voice: *"If this
   skill were mine, here is how I'd run it — and here is why I am / am not
   the right fit."* Render all five answers in chat so Jason sees the full
   council, including the recusals.
3. **Verdict.** One personality wins, or two blend. For a blend, name the
   **primary** (whose skeleton is copied) and exactly which sections the
   secondary contributes (e.g. "Drafter primary; Interrogator contributes
   the critique-loop posture in Phase C").
4. **Confirm with Jason** before proceeding.
5. **No fit is a flag.** If the concept genuinely fits none of the five,
   say so and design free-form — but first re-examine the Phase 2
   distillation; a framework that fits no archetype is often a framework
   that isn't sharp yet.

## Mechanics

- Copy the winning skeleton:
  `cp .claude/skills/create-asb-skill/archetypes/<personality>.md .claude/skills/asb-<slug>/SKILL.md`
- Every `TODO(slot-name): guidance` marker must be resolved with Phase 1–3
  material. The skeleton is scaffolding, not a cage — rewrite freely, delete
  sections that don't apply, rename phases to fit the framework's vocabulary.
- For a blend: start from the primary, then import the named sections from
  the secondary's file.
- Exit gate before adversarial review: `grep -n "TODO(" <draft>` must return
  nothing.
- The skeletons already encode the proven asb-rude-qa shape (mental model →
  posture → phased workflow → refusal conditions) and the invariant
  wielding-posture rules (gentle tone / unyielding substance, dwell, move-on,
  willing-to-land-negative). Don't re-litigate those; spend the forging
  energy on the framework-specific slots.
