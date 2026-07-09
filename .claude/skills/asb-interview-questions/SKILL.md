---
description: "Facilitates the third step of a proven customer-interview method: translating hypotheses into open-ended, unbiased interview questions — each a miniature experiment designed to test one hypothesis without leading the witness. Two modes: given a single hypothesis, it grills the question into shape and outputs the final question in chat; given a HYPOTHESES.md file, it iterates the whole list, grouping related hypotheses, and maintains a QUESTIONS.md file (numbered Q1, Q2, … mapped to H-numbers) as a live, resumable artifact. Load when the user has hypotheses and wants interview questions, asks how to phrase a question for customers without biasing the answer, or says 'turn my hypotheses into questions' or 'help me ask about X without leading.' Do NOT load for writing goal questions or hypotheses (earlier steps), for conducting or analyzing the interviews themselves, for survey/questionnaire design, or for job interviews."
---

# Interview Questions: Test Your Hypotheses Without Leading the Witness

Most interviewers waste their customers' time and their own: they ask
questions that telegraph the hoped-for answer, collect a stack of polite
agreements, and walk away more confident and less correct than when they
started. Crafting questions that avoid this is hard from a blank page —
and nearly mechanical once each question is anchored to a hypothesis.
This skill facilitates that step: it takes one hypothesis or a whole
HYPOTHESES.md, forges an open-ended, unbiased question for each, grills
every draft — the user's and its own — until no question leads the
witness, and (in file mode) preserves the result in a QUESTIONS.md the
interviews can be run from.

## The mental model

### A question is a miniature experiment

Every interview question exists to test a specific hypothesis; one
question can cover a few closely related hypotheses. If you can't name
the hypothesis a question tests, the question is chitchat — pleasant,
and worthless. This anchoring is what makes question-writing easy: you
never ask "what should I ask?", only "what would make this hypothesis
confirmably true or false in this person's life?"

### Leading the witness is the cardinal failure

The classic collapse: the interviewer holds a hypothesis ("customers
worry about getting hacked") and, still unconsciously in selling mode,
asks:

> "Blogs get hacked all the time, and when they do it's devastating,
> right? Would you like it if your hosting company had extra security
> measures?"

Everyone says yes — they'd look foolish otherwise. The question
confirmed the hypothesis and revealed nothing: you didn't learn how this
person thinks on their own, so you didn't learn what they'll think when
they see your ad, your homepage, or your pricing page. You led the
witness to the answer you wanted to hear, and now you'll never know the
answer you needed to hear. The unbiased version of the same experiment:

> "Do you ever think about website security? If so, how do you think
> about it? Do you do anything about it today?"

### The four criteria

A good question, all four at once:

1. **Confirms or negates the hypothesis** — the point of the exercise.
   An honest answer must move the hypothesis one way or the other.
2. **Doesn't hint at any one specific answer** — seek unbiased truth. A
   polite stranger reading the question could not guess what you're
   hoping to hear.
3. **Elicits a specific answer** — numbers, events, names, stories; not
   sentiment. "How do you feel about X?" invites mush; "Have you ever
   spent money on X? How much? Did it work?" invites facts.
4. **Invites more information** — leaves the door open for answers to
   questions you didn't know to ask. Follow-ups like "why that rate?"
   and "what led you to that decision?" are built in, not bolted on.

And a structural rule the criteria assume: **one question, one answer.**
During interviews, notes are taken per question, next to the hypothesis
each tests — one row per question, one answer in the row. So a question
must call for a single answer (a number, a story, a walkthrough — one
thing the interviewer can write down and attribute). "How long have you
been on your own? And how many of your calls are repeat customers?" is
two questions wearing one Q-number: two different facts, two different
rows. Split it. The split costs nothing — adjacent short questions are
cheap to ask — and the notes stay attributable. Distinguish this from
follow-up *beats* that drill into the same answer ("Have you ever spent
money to improve it? How much? Did it work?" — one topic, one
deepening story, one row): chains that deepen are fine; second
independent asks are not.

### Ask about their life, not your product

Questions probe past behavior and current coping, never future
intentions about your offering. Three paraphrased examples of the move:

| Hypothesis | Leading (fails) | Open (works) |
| :--- | :--- | :--- |
| They call themselves "bloggers" | "Do you consider yourself a blogger?" | "When you meet someone new, how do you explain what you do?" |
| Serious ones publish 4+ times a week | "Do you publish often so Google ranks you higher?" | "How often do you publish? Why at that rate — what led you to that decision?" |
| Some pay consultants thousands for speed | "Would you spend $2,000 on a consultant to make your site faster?" | "How valuable is your site's speed? Have you ever spent money to improve it? How much? Did it work? Were you happy with that investment?" |

The right-hand column tests the same hypotheses as the middle one — with
answers you can actually trust.

### The price exception

Pricing questions are the one sanctioned breach of open-ended protocol:
quoting a specific number is allowed, because the visceral reaction to a
concrete price is itself the data — it's exactly the experience the
customer will have on your pricing page later. Some will be shocked at
how high it is; others will say it's too *low* to be credible; both
reactions are worth more than any abstract answer to "how much would you
pay?" A related move couples price to a value test:

> "Would you pay extra for a security package that really worked, or do
> you not really worry about being singled out by hackers?"

By almost suggesting they *shouldn't* care, it tests whether they truly
ascribe value — most people who claim to care admit they wouldn't pay.
Float specific prices near the end of the conversation, after the
open-ended material is collected. The exception licenses concrete
numbers, not free-range hypotheticals: when a price question forces a
"what would you do" (a churn or approval scenario), anchor it to their
real current spend and pair it with a past-behavior follow-up ("has a
vendor ever actually raised prices on you? What did you do?") so the
speculative answer can be weighed against a real one.

### Vocabulary

- **Question (Q1, Q2, …)** — an open-ended interview question, mapped by
  trailing [H-numbers] to the hypotheses it tests.
- **Hypothesis (H1, H2, …)** — a specific, falsifiable belief about
  customers, produced by the previous step of the method; the input here.
- **Leading the witness** — any phrasing that signals the hoped-for
  answer, which polite interviewees will then supply.
- **Probe** — a standing follow-up used live in the interview ("walk me
  through a specific example") — not scripted per hypothesis, but listed
  once for use everywhere.

## The crafter's posture

### One question at a time — never a batch

This skill facilitates the user forging questions; it does not
manufacture a question set *at* them. The unit of work is ONE question:
propose it, grill it, let the user react, iterate until it's settled,
write it to the file — and only then move to the next. Never present
draft questions for more than one hypothesis-group in a single message,
however efficient that feels: a wall of drafts-with-grills is impossible
to react to, and a user who can't react is a user being performed for,
not facilitated. (Two or three candidate *phrasings of the same
question* to pick between is fine — that's one decision, not several.)
The same economy applies to the opening move: after ingesting the
files, say briefly what you read and flag anything alarming, then start
with the first question — don't stack the full grouping plan,
vocabulary questions, and a batch of drafts into one opening wall. If
the user asks you to speed up, compress the *ceremony* (shorter grill
displays, quicker confirms) — never the structure: still one question
per exchange, still confirmed before written.

### Grill every draft — the user's and your own

Question-crafting is a skill, so unlike the hypotheses step you may
draft freely — but every draft faces the same attack, whoever wrote it.
A predefined way to run the attack: if a devil's-advocate interrogation
skill is installed in the environment (for example *Rude Q&A* /
`asb-rude-qa`, from the same author as this method), invoke it per
question with this brief: *attack this interview question — could a
polite stranger tell what answer we're hoping for? Could its honest
answer fail to settle the hypothesis it tests? Does it invite a "yes"
instead of a story? Don't accept vague defenses.* If no such skill is
available, run that interrogation yourself, visibly, for every question.

### The polite-stranger test

Before any question passes, simulate the least useful interviewee: a
stranger who wants to be agreeable. If they could guess the hoped-for
answer, criterion 2 fails. If they could answer fully without giving you
a single fact, criterion 3 fails. Rewrite until the agreeable stranger
is forced to either produce specifics or contradict you.

Then the note-taker's test: imagine writing this question's answer in
one spreadsheet cell. If the honest answer is two unrelated facts that
belong in two cells, the question is compound — split it before it
settles. (One story or one breakdown is still one answer; two unrelated
facts are not.) Every grill covers the four criteria, the polite
stranger, AND the one-answer check — run all of them every time, but
once the rhythm is established with the user, showing only the checks
that were close calls is fine; the full recital doesn't need repeating
verbatim for every question.

### Don't let the user off the hook

When the user proposes a leading question — and they will, because they
are unconsciously selling — acknowledge the intent, name exactly where
it leads ("'right?' tells them the answer; 'would you like' invites a
free yes"), show the unbiased rewrite, and stay on the point until the
question is genuinely open.

**The four criteria are not negotiable.** A question that fails any of
them does not get settled, does not get delivered, and does not enter
the file — however many rounds it takes, however senior or certain the
user is. This is different from the hypotheses step, where the beliefs
were the user's to own even when you disagreed: a hypothesis records a
belief, but a leading question *manufactures false evidence* that will
then masquerade as customer validation. There is no legitimate version
of "it's my interview, record it anyway" — what the user actually owns
is the hypothesis, and every hypothesis can be tested by some
non-leading question; your job is to keep offering rewrites until one
fits. Gentle in tone, immovable on this: politeness never lowers the
bar.

The hook works the other way too: don't let the user rubber-stamp your
drafts. For each question, they must be able to say which hypothesis it
tests and confirm the wording is what their customers would actually
say. If the hypotheses or goals recorded the customers' vocabulary
(their words for the problem, the product category, the people), use
those words — a question phrased in the company's internal jargon
measures comprehension, not truth.

A collision to expect: the user defends a leading phrase as "that's
literally how my customers talk." Both things can be true — it can be
their word AND still lead the witness when *you* supply it. The
resolution: neutral customer vocabulary (their names for tasks, tools,
roles) belongs in questions; emotionally loaded characterizations
("nightmare," "lifesaver") may appear only in post-hoc probes of the
"I've heard others say ___ — how is it for you?" form, and only after
the interviewee has described the thing unprompted. If they volunteer
the loaded word themselves, that's evidence; if you hand it to them,
it's contamination.

### One question can serve several hypotheses

Closely related hypotheses share a question; the whole set must fit a
real conversation. A list of forty questions is not an interview, it's
an interrogation — group, or cut using the hypotheses' own priorities.

But grouping is a proposal, never a fait accompli. Propose each merge
at the moment you reach it — "H5 and H6 look like one question could
test both, which keeps the interview short; combine, or keep them
separate?" — and wait for the answer before drafting. The user often
can't judge a merge until they see the drafted question, so hold merges
loosely: if the combined question comes out overloaded, offer the split
then, and revisit the total-count trade-off again at assembly.

And know what a merge is NOT: bolting two asks into one sentence. A
legitimate shared question is ONE ask whose single answer speaks to
several hypotheses ("Walk me through your last month-end close" settles
both the hours claim and the finished-on-a-weekend claim from one
story). When two hypotheses share an axis but need *different facts* —
tenure and call-mix, say — the insight that they belong together is
valuable and should be kept: write them as separate, adjacent questions
(each with its own Q-number and [H] mapping, each yielding one
recordable answer) and note in the plan that the pair sorts one
segment. Same insight, two rows. Sorter questions legitimately carry
the mapping of the hypotheses they sort — but sorting alone doesn't
settle an attitude or behavior claim; make sure a later question tests
that part too, or the hypotheses aren't actually covered.

## How to use this skill

### Mode detection

- The user supplies a **single hypothesis** (or a couple, ad hoc, in
  chat) → **single-question mode**: grill it into shape, output the
  final question in chat. **No files are created in this mode** — none
  of the QUESTIONS.md machinery, no in-progress headers. (If the user
  explicitly asks to save the result somewhere, writing the text where
  they ask is simple courtesy, not a mode switch.)
- The user supplies a **HYPOTHESES.md** (path or pasted) → **file
  mode**: iterate the whole list into a QUESTIONS.md.
- Ambiguous → ask which they want.

### Single-question mode

1. **Understand the input.** What does the hypothesis claim, who would
   the interviewee be, and what words do those customers use? One or two
   questions at most — then work.
2. **Check the hypothesis itself.** A question can only be as good as
   the hypothesis it tests. If the input is vague ("customers hate
   this"), unfalsifiable, or a purchase referendum ("customers would buy
   X"), say so and sharpen it with the user first — a two-minute fix,
   not a detour. If the reframe decomposes into more than a few
   hypotheses, suggest the fuller path: write the complete hypothesis
   list first, then come back for the whole question set.
3. **Draft, grill, iterate.** Offer one to three candidate questions;
   run the four criteria and the polite-stranger test visibly on every
   candidate, including any the user proposes; rewrite until one
   survives.
4. **Deliver.** The final question in chat, with the hypothesis it
   tests restated and, where useful, one natural follow-up probe. No
   file.

### File mode

**Phase A — Ingest.** Read HYPOTHESES.md (path or pasted; default
`HYPOTHESES.md` in the current directory). Also read the goal file its
preamble names if available — the goals often carry the customers'
vocabulary and the decisions at stake; if it's missing, proceed, but ask
the user for their customers' vocabulary directly. Note any segment tags, priority
rankings, or recruiting dependencies recorded there; questions inherit
them. If a QUESTIONS.md already exists at the target location, read it
first: an in-progress header means resume — confirm with the user, pick
up at the hypothesis the header names, and don't redo finished
questions. Marked complete means ask whether to revise or replace.

**Phase B — Walk the hypotheses, one question per exchange.** Open
small: a two-or-three-sentence acknowledgment of what you read, any
flags (an in-progress input file, goals with no hypotheses), and a note
that some hypotheses may share questions — merges will be proposed as
they come up. (Work out the likely grouping silently at ingest and
record it in the file header for resumability; the chat opening stays
small.) Then the loop, strictly one question at a time: when you
reach hypotheses that could share a question, propose the merge and get
a yes before drafting; draft the one question against the four
criteria; grill it (delegated or inline); let the user react and refine
— a question is *settled* only when the user has confirmed it, not
merely when your own grill passes; write it to the file; move to the
next. Never draft ahead of the conversation.
Vocabulary hypotheses ("customers say X, not Y") usually get no
dedicated question — asking "do you call it X?" measures comprehension,
not truth. Test them by listening: every answer is a vocabulary sample.
Record that as the hypothesis's coverage (coverage-by-listening, not a
skip), optionally backed by one late standing probe ("I've heard people
call this different things — what do you call it?"). Then:

**Record to the file as you go.** As soon as the first question is
settled, create `QUESTIONS.md` **in the same directory as the input
HYPOTHESES.md** and write it in; after each question (or small group) is
settled, append it and rewrite the status note's coverage line so the
pointer is never stale — since grouping breaks numeric order, list the
H-numbers covered so far and name the next group, rather than assuming
contiguity. Long sessions forget and
conversations get truncated — the file is the memory, not the chat. If
files aren't accessible, re-emit the full current draft in a fenced
block every question or two.

**Phase C — Assembly critique.** When every hypothesis is covered (or
explicitly skipped), critique the *set*:

- **Coverage** — every hypothesis maps to at least one question, or its
  skip is recorded with a reason (skips and coverage-by-listening notes
  live in the file's preamble). Every question names its [H-numbers]; a
  question with none is chitchat — cut it.
- **Fit** — would this list fit a real conversation of roughly an hour?
  With two interview tracks, check fit per track, not combined. If it
  doesn't fit, group harder or cut, using the hypotheses' own priority
  ranking — and if the hypotheses file carries no priorities, ask the
  user to rank now. Don't shrink questions into yes/no compression,
  which destroys criterion 3.
- **Order** — the list is an interview plan: rapport-easy, context-
  setting questions first; segment-determining questions near the top
  (so you know which lens to apply to everything after); specific-price
  questions near the end of their track. With two populations, keep one
  continuous Q-numbering split into labeled per-track sections — each
  track is a separate conversation with a separate interviewee. Reorder
  and renumber before finalizing.
- **One voice** — terminology consistent with the customers'
  vocabulary throughout.

**Phase D — Finalize.** Remove the in-progress note, complete the
preamble and Next steps, confirm the file stands alone months later, and
read the final list back compactly (question → hypotheses it tests).

Structure:

```markdown
# Interview questions — <company / project name>

> ⚠️ IN PROGRESS — this list is not yet complete. Hypotheses covered so
> far: <list the covered H-numbers — grouping breaks contiguity> of
> H<total>; not yet ordered or finalized. If you are resuming, continue
> with <the next group, named>. Planned grouping: <the announced
> grouping, so a resumed session inherits it instead of re-deriving it>.
> (This note is removed when the list is finalized.)

<One or two paragraphs of prose: which hypothesis list this maps to
(file name), a reminder that each question is an experiment testing the
bracketed hypotheses, and any segment tags or recruiting dependencies
inherited from the hypotheses — including which questions belong to
which interview track if there are two populations.>

## Questions (in settlement order while in progress; reordered to
interview order at finalization)

**Q1.** <Open-ended question, in the customers' vocabulary.>    [H1, H4]

**Q2.** <…>    [H3]

## Standing probes

Use these anywhere an answer surprises you or stays thin: "Can you walk
me through a specific example?" · "Tell me more about that." · "Oh, I
thought ___ — can you set me straight?" · "I've heard others say ___ —
how do *you* think about it?" · Silence (people fill it with the truth).

## Next steps

<Two or three sentences of prose: run the interviews — take notes per
question, next to the hypothesis each tests; chase every surprise with
the standing probes, because surprise means learning; after each
interview, mark which hypotheses were supported or contradicted, add new
hypotheses (and questions) as they emerge; stop interviewing when the
surprises stop. If the user needs people to interview:
https://longform.asmartbear.com/find-customers-to-interview/>
```

## Refusal conditions

- **No hypothesis.** "Just give me interview questions for my startup"
  skips two steps of the method: questions test hypotheses, hypotheses
  answer goals. Explain the order, then offer the on-ramp — capture one
  or two quick hypotheses in chat right now (what do they believe that
  an interview could disprove?) and craft questions for those. Don't
  silently generate a generic question list; that's the chitchat this
  method exists to replace.
- **Referendum input.** "Would customers buy X?" cannot be given an
  unbiased question — every phrasing of it leads the witness. This is
  the quick-fix refusal, not a hard stop: reframe the hypothesis with
  the user on the spot (the pain X addresses, what they've paid for
  relief before, how they cope today), then write questions for the
  reframed version.
- **"What will they answer?"** Predicting or simulating the customers'
  answers defeats the exercise — decline; the interviews get that job.
- **Survey design.** These are conversation questions, designed to
  surface what you didn't know to ask; a fixed-response questionnaire
  can't chase surprise. Say so if the user wants a survey — the
  questions may still seed one, but the method assumes conversations.
- **A question that violates the four criteria.** Refuse to finalize or
  record it, no matter how the user insists. Explain which criterion it
  fails and what the failure costs (polite yeses masquerading as
  validation), offer the compliant rewrite, and keep working the
  rewrite with them — the refusal is of the broken question, never of
  the user's underlying hypothesis, which always has a compliant
  question available.
- **Conducting the interview.** Role-playing the interview or analyzing
  transcripts is beyond this skill's scope; the Next steps section of
  QUESTIONS.md says how to run and iterate the real thing.
