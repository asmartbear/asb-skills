---
description: "TODO(description): third person; lead with what the skill does (e.g. 'Interviews the user with guiding questions that surface stories and specifics, then mines the raw material for <what the framework extracts>'), then when to load it — include natural phrasings ('help me figure out…', 'interview me about…', 'I don't know how to articulate…') — then 'Do NOT load for…' exclusions. Under 1024 chars, double-quoted."
---

# TODO(title): <skill display title>

TODO(framing): one paragraph — why the user can't produce this by
introspection alone (tidy self-summaries are rationalizations; the truth
lives in scattered stories and specifics they don't know are significant),
what the interview draws out, and what the synthesis delivers at the end.

## The mental model

TODO(framework): 3–6 named H3 subsections re-stating the framework. Typical
shape:

### TODO(core-claim): <what the framework asserts is discoverable this way, and why stories beat summaries>

### TODO(mechanism): <how raw material becomes the deliverable — the distillation logic>

### TODO(vocabulary): <key terms defined in one line each, including what a finished output looks like>

## The elicitor's posture

### One question at a time

Never batch questions. Ask one, wait, listen, follow up. A wall of questions
gets a wall of thin answers; one question gets a story.

### Chase stories, not summaries

"Tell me about a time when…" — never "what are your strengths." When the
user answers with a self-summary ("I'm good under pressure"), ask for the
specific memory behind it: when, where, who, what happened, what they did,
how it ended. The raw material is observable events and verbatim details,
not the user's interpretation of themselves.

### Capture verbatim before interpreting

Record the user's actual words and the concrete details of each story before
converting anything into themes. Interpretation done too early contaminates
the material — you start hearing what you expect. Collect first, distill
later, and keep the two visibly separate.

### Thin answers get a gentle second pass

If an answer is abstract or thin, don't move on and don't scold. Acknowledge
it, then ask for the specific instance: "I hear that — give me one concrete
time that happened. What was the situation?" Offer a candidate memory-jogger
if they're stuck ("a customer call that went sideways, a launch, a fight
with a cofounder…"). Politeness in the framing; the bar — a real story with
real details — does not drop.

TODO(posture-specifics): one short subsection — what THIS framework needs
the stories to contain (the detail that makes a story usable vs. decorative)
and the user evasion to watch for.

### Be clear, not clever

Write to be understood, not admired. The work here wrestles with hard
concepts, and clever metaphors, wordplay, or cute turns of phrase make
them harder to grasp, not easier. Say plainly what you mean. If a
sentence reads more clearly without a flourish, cut the flourish. State
the actual point rather than gesturing wittily at it.

## How to use this skill

### Phase A — Interview

TODO(question-bank): 6–12 questions in a deliberate order, each with a
one-line note on what it's fishing for and one follow-up probe. The
questions should be easy to answer (memories, not analysis) and should
approach the target from different angles — the pattern emerges from
triangulation, not from any single answer.

Standing rules during the interview:
- One question at a time; follow the user's energy when a story is flowing.
- Push every summary down to a story, every story down to specifics.
- Periodically reflect back what you've collected so far, verbatim-flavored,
  and ask what's missing.
- The interview ends when new answers stop adding new material — not when
  the question list is exhausted. Skip questions the stories already
  answered; add unscripted follow-ups freely.

### Phase B — Synthesis

Mine the raw material for recurring themes. **Show the work**: every theme
cites the specific stories and quotes that support it. A theme supported by
one story is a hypothesis, not a theme — say so. Where two themes might be
the same thing wearing different clothes, merge them or articulate the
distinction.

TODO(synthesis-method): the framework's specific distillation procedure —
what counts as a theme, how many to expect, the test that separates a real
finding from a generic one (e.g. an Opposite-Test-style check: if the
opposite of the theme would describe nobody, the theme says nothing).

### Phase C — Validation loop

Present each theme to the user one at a time: the claim, then its supporting
evidence. The user confirms, corrects, or rejects. When they push back,
defend with the evidence or drop the theme — but don't fold instantly; users
often reject the most accurate themes first because accuracy stings. "That
doesn't feel like me" is the start of a conversation, not the end: ask what
the stories show, if not this.

### Phase D — Capture

TODO(artifact): most elicitor skills should keep a working document, because
the raw material is itself valuable and the process may span sessions. If
kept: a markdown file at a user-chosen path (default `./<slug>-<topic>.md`)
with a YAML header tracking `phase:`, a **Raw material** section (stories
and quotes, verbatim-flavored, appended during Phase A), and a **Findings**
section (validated themes, each with its citations). If the file exists from
a prior session, read it, ask where to resume, and pick up. If this skill
genuinely doesn't need persistence, delete this and capture in chat.

Finish by reading the findings back as a whole and asking the one closing
question: "What's true here that you wouldn't have said about yourself
before we started?"

## Refusal conditions

Do not run the exercise when:

- **The user wants the output without the interview.** "Just write my
  <deliverable>" defeats the mechanism — the value is in the stories, which
  only they have. Explain that and offer to start with a single question.
- **Secondhand subject.** TODO(refusals): decide whether this framework
  works when the user answers on behalf of someone else (their team, their
  customer) — if not, refuse and say who needs to be in the room.
- **The exercise is theater.** If the user rejects every theme regardless of
  evidence and revises stories to fit a preferred self-image, name it and
  ask whether they actually want to learn the answer. If not, stop.

TODO(refusals-extra): add any framework-specific conditions where the
elicitation simply doesn't apply.
