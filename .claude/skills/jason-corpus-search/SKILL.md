---
description: "Semantically search Jason Cohen's A Smart Bear articles and Hidden Multipliers book corpus, returning on-disk file paths that can be read or grep'd directly with normal filesystem tools. Load whenever you need to find what Jason has written about a topic, ground an asb-* skill in source material, hunt for quotes or passages, or check whether an idea already has a canonical write-up before drafting one."
allowed-tools: Bash(.claude/skills/jason-corpus-search/search.sh:*), Read, Grep, Glob
---

# Searching Jason's source corpus

Jason's writing — A Smart Bear articles and the Hidden Multipliers book — is
indexed by a semantic-search CLI in a separate repo. This skill is the thin
shim that lets you query it and then work with the hits as ordinary files on
disk.

The corpus lives in exactly two directories:

- `/Users/jcohen/Obsidian/Longform/Projects/Articles/Content/` — A Smart Bear articles
- `/Users/jcohen/Obsidian/Longform/Projects/Hidden Multipliers/Content/` — the book

You can `Grep` or `Glob` either directory directly when an exact-string sweep
is what you want (e.g. "find every place Jason uses the phrase 'profit
whale'"). Use the semantic wrapper below when you want meaning-based recall.

Filenames are slugs (e.g. `pricing-determines-your-business-model.md`), and
internal markdown links within these files reference siblings by that slug.
If you're following a link like `[…](more-value-not-save-money)` from inside
one of these files, the target is `<same-directory>/<slug>.md` — just `Read`
it directly, no search needed.

## When to use

- Drafting or revising an `asb-*` skill and you need to ground the framework
  in Jason's own prose.
- Answering "what has Jason written about X?" or "does Jason have a take on Y?"
- Pulling a specific phrasing or example before paraphrasing it into a skill.

## The one move

Run the wrapper. It returns a minimal JSON array of `{title, path}` where
`path` is the on-disk file. Use Read / Grep / Glob from there.

```sh
.claude/skills/jason-corpus-search/search.sh --semantic "pricing power" --limit 10
```

```json
[
  {"title": "pricing-determines-your-business-model",
   "path": "/Users/jcohen/Obsidian/Longform/Projects/Articles/Content/pricing-determines-your-business-model.md"},
  ...
]
```

From there: `Read` a specific hit, `Grep` across the list for a phrase, `Glob`
for nearby siblings in the same folder. The corpus is small; the source
filesystem is fast.

## The wrapper (`search.sh`)

Bakes in two unbypassable filters so results never leak into daily notes, KB,
AMA, blurbs, errata, or backups:

- `--domain obsidian`
- `--path '^/Longform/Projects/(Articles/Content|Hidden Multipliers/Content)/'`

Then trims each hit to `{title, path}` (on-disk path). All other args are
pass-through to `cli storage search`. In practice you only need two:

| Flag | Use |
| :--- | :-- |
| `--semantic "<phrase>"` | The actual query — phrase it like a sentence, not keywords. Searches two indexes in parallel: embeddings of the literal content AND embeddings of each doc's topics + the common questions it answers. So both content-level queries ("companies that raised prices and grew") and topical queries ("pricing strategy", "how should I price my SaaS?") work well. |
| `--limit <n>` | Cap results. Set this; the CLI default may not match your need. |

## Do not bypass the wrapper

Calling `cli storage search` directly will silently include daily notes, the
AMA inbox, knowledge-base scraps, book blurbs, errata, and other vault
content that is not Jason's published material. Always go through
`search.sh`.
