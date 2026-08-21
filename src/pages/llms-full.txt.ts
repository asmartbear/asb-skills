// llms-full.txt — full-content export: the complete text of every skill and
// workshop, inlined as Markdown (no external fetches needed).
//
// Self-updating: generated at build time from listPublicSkills()/listWorkshops(),
// the same source as the rendered pages, so it stays current as content changes —
// no need to re-run the seo-llm skill for routine content edits.
import { listPublicSkills } from '../lib/skills';
import { listWorkshops } from '../lib/workshops';
import { SITE } from '../lib/site';

export async function GET() {
  const skills = listPublicSkills();
  const workshops = listWorkshops();

  const out: string[] = [];
  out.push(`# ${SITE.name} — full text`, '');
  out.push(`> ${SITE.description}`, '');
  out.push(
    'The complete text of every published skill and workshop follows, generated from source at build time.',
    '',
  );

  if (workshops.length) {
    out.push('---', '', '# Workshops', '');
    for (const w of workshops) {
      out.push(`## ${w.frontmatter.title}`, '');
      out.push(`> ${w.frontmatter.summary}`, '');
      if (w.body) out.push(w.body, '');
      out.push(`Steps: ${w.steps.map((s) => s.wrapper.title).join('; ')}`, '');
    }
  }

  out.push('---', '', '# Skills', '');
  for (const s of skills) {
    out.push(`## ${s.wrapper.title}`, '');
    out.push(`> ${s.wrapper.summary}`, '');
    out.push(`Source: ${s.githubUrl}`, '');
    out.push(s.skillBody, '');
    out.push('---', '');
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
