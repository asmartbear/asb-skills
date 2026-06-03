#!/usr/bin/env bun
/**
 * Symlink a skill from this repo into the user's global ~/.claude/skills/
 * so it loads in real Claude Code sessions while iterating.
 *
 * Usage:
 *   bun run link <skill-name>     # creates symlink
 *   bun run unlink <skill-name>   # removes symlink
 */
import { symlinkSync, unlinkSync, existsSync, lstatSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

const REPO_ROOT = resolve(import.meta.dir, '..');
const SKILLS_DIR = join(REPO_ROOT, '.claude', 'skills');
const TARGET_BASE = join(homedir(), '.claude', 'skills');

const [, , action, name] = process.argv;

if (!action || !name || !['link', 'unlink'].includes(action)) {
  console.error('usage: bun run scripts/link-skill.ts <link|unlink> <skill-name>');
  process.exit(1);
}

const source = join(SKILLS_DIR, name);
const target = join(TARGET_BASE, name);

if (action === 'link') {
  if (!existsSync(source)) {
    console.error(`skill "${name}" not found at ${source}`);
    process.exit(1);
  }
  if (!existsSync(TARGET_BASE)) mkdirSync(TARGET_BASE, { recursive: true });
  if (existsSync(target)) {
    const stat = lstatSync(target);
    if (stat.isSymbolicLink()) {
      console.log(`already linked: ${target}`);
      process.exit(0);
    }
    console.error(`refusing to overwrite non-symlink at ${target}`);
    process.exit(1);
  }
  symlinkSync(source, target, 'dir');
  console.log(`linked ${target} → ${source}`);
} else {
  if (!existsSync(target)) {
    console.log(`nothing at ${target}`);
    process.exit(0);
  }
  const stat = lstatSync(target);
  if (!stat.isSymbolicLink()) {
    console.error(`refusing to remove non-symlink at ${target}`);
    process.exit(1);
  }
  unlinkSync(target);
  console.log(`unlinked ${target}`);
}
