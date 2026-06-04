#!/usr/bin/env bun
/**
 * Push the current branch to its remote and watch the GitHub Pages deploy
 * for the pushed commit. Exits non-zero on push failure or deploy failure.
 *
 *   bun run deploy-and-wait
 *
 * Requires `gh` (installed + authenticated). Doesn't run lint/build first —
 * if you want pre-flight checks, run them yourself before invoking this.
 */
import { execSync, spawnSync } from 'node:child_process';

function need(cmd: string): void {
  const r = spawnSync('which', [cmd], { stdio: ['ignore', 'pipe', 'ignore'] });
  if (r.status !== 0) {
    console.error(`✗ Missing required command: ${cmd}`);
    process.exit(1);
  }
}
need('git');
need('gh');

function sh(cmd: string, args: string[]): string {
  return execSync([cmd, ...args].join(' '), { encoding: 'utf8' }).trim();
}

console.log('▸ git push');
const push = spawnSync('git', ['push'], { stdio: 'inherit' });
if (push.status !== 0) process.exit(push.status ?? 1);

const sha = sh('git', ['rev-parse', 'HEAD']);
const short = sha.slice(0, 7);
console.log(`▸ HEAD is ${short}; looking for the deploy run…`);

interface Run { databaseId: number; headSha: string; status: string; }

let runId: string | null = null;
const deadline = Date.now() + 60_000;
while (Date.now() < deadline) {
  try {
    const out = sh('gh', [
      'run', 'list',
      '--workflow=deploy.yml',
      '--limit=10',
      '--json', 'databaseId,headSha,status',
    ]);
    const runs: Run[] = JSON.parse(out);
    const match = runs.find((r) => r.headSha === sha);
    if (match) {
      runId = String(match.databaseId);
      break;
    }
  } catch (e) {
    console.warn(`(gh poll failed, retrying: ${(e as Error).message})`);
  }
  await new Promise((r) => setTimeout(r, 2_000));
}

if (!runId) {
  console.error(`✗ No deploy run for ${short} appeared within 60s.`);
  process.exit(1);
}

console.log(`▸ watching run ${runId} (Ctrl-C to detach; the deploy keeps going either way)`);
const watch = spawnSync(
  'gh', ['run', 'watch', runId, '--exit-status', '--interval=5'],
  { stdio: 'inherit' },
);

if (watch.status === 0) {
  console.log(`✓ Deploy succeeded for ${short}. Live within ~1–2 min through CDN.`);
}
process.exit(watch.status ?? 1);
