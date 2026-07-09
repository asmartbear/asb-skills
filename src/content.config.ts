import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
  skills: defineCollection({
    loader: glob({ pattern: '*.{md,mdx}', base: './src/content/skills' }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      featured: z.boolean().optional(),
      order: z.number().optional(),
    }),
  }),
  // Website-only "process" pages: a documented sequence of skills run
  // end-to-end. Not distributed skills — see src/lib/processes.ts.
  processes: defineCollection({
    loader: glob({ pattern: '*.{md,mdx}', base: './src/content/processes' }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number().optional(),
      cardTitle: z.string().optional(),
      hook: z.string().optional(),
      source: z.object({ title: z.string(), url: z.string() }).optional(),
    }),
  }),
};
