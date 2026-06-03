import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { listPublicSkills } from './src/lib/skills';
import { SITE, URLS } from './src/lib/site';

const skills = listPublicSkills();

export default defineConfig({
  site: SITE.url,

  integrations: [
    starlight({
      title: SITE.name,
      description: SITE.description,
      social: {
        github: URLS.githubRepo,
      },
      components: {
        SocialIcons: './src/components/SocialIcons.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'How to install', link: '/install/' },
        {
          label: 'Skills',
          items: skills.map((s) => ({ label: s.wrapper.title, link: `/skills/${s.name}/` })),
        },
      ],
    }),
  ],
});
