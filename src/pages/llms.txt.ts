// llms.txt — the AI/LLM index for this site (spec: https://llmstxt.org/).
//
// Self-updating: iterates listPublicSkills()/listWorkshops() at build time
// (same source as the sidebar and rss.xml), so adding or editing a skill updates
// this file on the next build with no manual step. The full text of every skill
// is not duplicated here — it lives at /llms-full.txt.
import { listPublicSkills } from '../lib/skills';
import { listWorkshops } from '../lib/workshops';
import { SITE, URLS } from '../lib/site';

export async function GET() {
  const skills = listPublicSkills();
  const workshops = listWorkshops();
  const abs = (p: string) => new URL(p, SITE.url).href;

  const out: string[] = [];
  out.push(`# ${SITE.name}`, '');
  out.push(`> ${SITE.description}`, '');
  out.push(
    'Each entry is a self-contained skill for Claude Code and other coding agents. Install them with the skills CLI or the Claude Code plugin marketplace (see How to install).',
    '',
  );

  out.push('## Full text');
  out.push(
    `- [Full text of every skill](${abs('/llms-full.txt')}): all skill bodies inlined as Markdown, generated at build time so it stays current.`,
  );
  out.push(`- [GitHub repository](${URLS.githubRepo}): canonical source of every skill.`, '');

  if (workshops.length) {
    out.push('## Workshops');
    for (const w of workshops) {
      out.push(`- [${w.frontmatter.title}](${abs(`/workshops/${w.name}/`)}): ${w.frontmatter.summary}`);
    }
    out.push('');
  }

  out.push('## Skills');
  for (const s of skills) {
    out.push(`- [${s.wrapper.title}](${abs(`/skills/${s.name}/`)}): ${s.wrapper.summary}`);
  }
  out.push('');

  out.push('## Optional');
  out.push(
    `- [How to install](${abs('/install/')}): install commands for Claude Code, Cursor, Codex, and other agents.`,
    '',
  );

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
