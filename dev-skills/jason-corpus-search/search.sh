#!/usr/bin/env bash
# Search Jason's corpus (A Smart Bear articles + Hidden Multipliers book) via
# the rt semantic-search CLI. Bakes in the corpus filter so it's unbypassable,
# and post-processes to emit a minimal JSON array of {title, path} where
# `path` is the file's on-disk location (ready for Read/Grep/Glob).
# Pass any additional `cli storage search` flags as arguments, e.g.
#   search.sh --semantic "pricing power" --limit 10
set -euo pipefail
cd /Users/jcohen/git/rt
cli storage search \
  --domain obsidian \
  --path '^/Longform/Projects/(Articles/Content|Hidden Multipliers/Content)/' \
  "$@" \
  | jq '[.[] | {
      title: (.metadata.title // (if (.title | length) > 0 then .title else (.path | split("/") | last | sub("\\.md$"; "")) end)),
      path: ("/Users/jcohen/Obsidian" + .path)
    }]'
