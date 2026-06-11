import rss from '@astrojs/rss';
import { listPublicSkills } from '../lib/skills';
import { SITE } from '../lib/site';

export async function GET() {
  const skills = listPublicSkills()
    .filter((s) => s.lastUpdated)
    .sort((a, b) => b.lastUpdated!.localeCompare(a.lastUpdated!));

  return rss({
    title: `${SITE.name} — new & updated skills`,
    description: SITE.description,
    site: SITE.url,
    items: skills.map((s) => ({
      title: s.wrapper.title,
      description: s.wrapper.summary,
      link: `/skills/${s.name}/`,
      pubDate: new Date(s.lastUpdated!),
    })),
  });
}
