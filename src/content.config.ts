import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

const documenti = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documenti' }),
  schema: z.object({
    title: z.string(),
    file: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    order: z.number().default(99),
    page: z.string().optional(),
  }),
});

export const collections = { news, documenti };
