#!/usr/bin/env bun
/**
 * Assert the agent-readiness signals in the built site (dist/).
 *
 * These are the machine-facing guarantees that an "Is Agentic" style audit
 * checks and that are easy to regress by an unrelated edit: the homepage OG
 * tags, the enriched Organization JSON-LD, the recovery links on the 404 page,
 * the llms.txt guidance sections, and the robots.txt pointers.
 *
 * Run AFTER `astro build` (it reads dist/). Chained into `bun run build` so a
 * regression fails the build — local and in CI. Exits non-zero on any failure.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve(import.meta.dir, '..', 'dist');

function read(rel: string): string {
  const p = join(DIST, rel);
  if (!existsSync(p)) {
    console.error(`✗ missing built file: dist/${rel} — run \`astro build\` first`);
    process.exit(1);
  }
  return readFileSync(p, 'utf8');
}

const errors: string[] = [];
/** Assert `cond`; record `msg` on failure. */
function check(cond: boolean, msg: string): void {
  if (!cond) errors.push(msg);
}

// --- Homepage: SSR content + metadata (#2, #6, #7, #9) ---
const home = read('index.html');
check(/property="og:image"/.test(home), 'homepage: missing og:image');
check(/property="og:type"\s+content="website"/.test(home), 'homepage: og:type is not "website"');
check(!/property="og:type"\s+content="article"/.test(home), 'homepage: stale og:type="article" still present');
check((home.match(/<h2\b/g) ?? []).length >= 2, 'homepage: expected at least two <h2> headings');
check(/runs one method/.test(home), 'homepage: server-rendered lead paragraph missing');
check(/"founder"/.test(home), 'homepage JSON-LD: missing founder');
check(/hiddenmultipliers\.com/.test(home), 'homepage JSON-LD: sameAs not expanded (hiddenmultipliers.com absent)');

// --- 404: crawlable recovery map (#1) ---
const notFound = read('404.html');
for (const link of ['/llms.txt', '/llms-full.txt', '/sitemap-index.xml', '/workshops/']) {
  check(notFound.includes(link), `404 page: missing recovery link to ${link}`);
}

// --- llms.txt: agent guidance (#4, #5) ---
const llms = read('llms.txt');
check(/## When to use these skills/.test(llms), 'llms.txt: missing "When to use these skills" section');
check(/## Developer & agent resources/.test(llms), 'llms.txt: missing "Developer & agent resources" section');

// --- robots.txt: index pointers (#4) ---
const robots = read('robots.txt');
check(/llms\.txt/.test(robots), 'robots.txt: does not reference llms.txt');

if (errors.length) {
  console.error('Agent-readiness check FAILED:');
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('✓ agent-readiness checks passed');
