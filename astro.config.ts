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
        // Standalone sidebar links use the long "Short: long" title. Bold the
        // short leading portion (before the first ": " or "? ") so the eye can
        // scan the short name while the descriptive tail stays visible. Other
        // sidebar labels (workshop steps, group headings) contain no such
        // delimiter, so they're untouched.
        {
          tag: 'script',
          content:
            "(function(){function b(){document.querySelectorAll('nav.sidebar a > span').forEach(function(s){if(s.querySelector('strong'))return;var t=s.textContent,ci=t.indexOf(': '),qi=t.indexOf('? '),n=ci>=0?ci:(qi>=0?qi+1:-1);if(n>0){s.textContent='';var st=document.createElement('strong');st.textContent=t.slice(0,n);s.appendChild(st);s.appendChild(document.createTextNode(t.slice(n)));}});}document.addEventListener('DOMContentLoaded',b);document.addEventListener('astro:page-load',b);})();",
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
        // Workshops group: each workshop is a collapsible sub-group holding an
        // Overview link (to the workshop page) plus its ordered steps. This
        // nests the step-skills under their workshop instead of scattering them
        // through a flat list. Starlight auto-expands the group containing the
        // current page.
        ...(workshops.length
          ? [{
              label: 'Workshops',
              items: workshops.map((w) => ({
                label: w.frontmatter.title,
                collapsed: true,
                items: [
                  { label: 'Overview', link: `/workshops/${w.name}/` },
                  ...w.steps.map((s, i) => ({
                    label: `${i + 1}. ${s.wrapper.cardTitle ?? s.wrapper.title}`,
                    link: `/skills/${s.name}/`,
                  })),
                ],
              })),
            }]
          : []),
        // Standalone group: only skills that are NOT part of a workshop — the
        // workshop steps live under their workshop above. These use the long
        // "Short: long" title in the sidebar; a head script bolds the short
        // leading portion (before the ": " / "? ") for scannability.
        {
          label: 'Standalone',
          items: skills
            .filter((s) => !s.wrapper.workshop)
            .map((s) => ({ label: s.wrapper.title, link: `/skills/${s.name}/` })),
        },
      ],
    }),
    sitemap(),
  ],
});
