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
};
