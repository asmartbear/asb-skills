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

  out.push('## When to use these skills');
  out.push(
    'Reach for these skills when a founder or operator must make a hard business decision and needs their own thinking sharpened, not an answer handed to them. Each skill is a facilitator: it interrogates the user, presses on vague claims, and records the result in a working file. Best-fit jobs:',
    '',
    '- Define the ideal customer (ICP): run the Find Your Carol workshop to turn an honest look at the company into a precise, targetable customer definition.',
    '- Sharpen positioning and messaging: rewrite headlines, pitches, and homepage claims into value-first, specific language.',
    '- Choose and defend a pricing strategy: pick one of More-for-More, More-for-Less, or Less-for-Less, or build the case to raise the price.',
    '- Run a customer-interview program: plan goals and hypotheses, write unbiased questions, debrief each call, and synthesize what was learned.',
    '- Discover founder strengths: find who the founder is and the one or two decisive advantages to bet the strategy on.',
    '- Validate a business idea: score whether a market is real before building.',
    '',
    'How an agent should call them: install a skill (see How to install), then invoke it and let it drive the conversation with the user. The skill asks the questions; do not answer on the user\'s behalf.',
    '',
  );

  out.push('## Developer & agent resources');
  out.push(
    `- [llms-full.txt](${abs('/llms-full.txt')}): the full text of every skill, inlined as Markdown, generated at build time.`,
    `- [GitHub repository](${URLS.githubRepo}): canonical source of every skill, installable directly with the skills CLI.`,
    `- [How to install](${abs('/install/')}): install commands for Claude Code, Cursor, Codex, and other agents.`,
    `- [Sitemap](${abs('/sitemap-index.xml')}): every page on the site.`,
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
