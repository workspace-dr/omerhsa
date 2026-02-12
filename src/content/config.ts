import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Equipo OMERHSA'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const academicCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    pdfUrl: z.string().optional(),
    category: z.string().default('Seguros'),
  }),
});

export const collections = {
  'blog': blogCollection,
  'academic': academicCollection,
};