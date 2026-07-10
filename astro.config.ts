import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { listPublicSkills } from './src/lib/skills';
import { listWorkshops } from './src/lib/workshops';
import { SITE, URLS } from './src/lib/site';

const skills = listPublicSkills();
const workshops = listWorkshops();

export default defineConfig({
  site: SITE.url,

  integrations: [
    starlight({
      title: SITE.name,
      description: SITE.description,
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: SITE.name },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: SITE.name,
            href: '/rss.xml',
          },
        },
        // Default first-visit theme to dark. Starlight's ThemeProvider
        // reads localStorage['starlight-theme']; seed it before that
        // script runs so users who haven't explicitly chosen still get
        // dark, even if their system prefers light. The theme picker
        // continues to work and overrides this default once used.
        {
          tag: 'script',
          content:
            "(function(){try{if(!localStorage.getItem('starlight-theme')){localStorage.setItem('starlight-theme','dark');document.documentElement.dataset.theme='dark';}}catch(e){}})();",
        },
      ],
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
        ...(workshops.length
          ? [{
              label: 'Workshops',
              items: workshops.map((p) => ({ label: p.frontmatter.title, link: `/workshops/${p.name}/` })),
            }]
          : []),
        {
          label: 'Skills',
          items: skills.map((s) => ({ label: s.wrapper.title, link: `/skills/${s.name}/` })),
        },
      ],
    }),
    sitemap(),
  ],
});
