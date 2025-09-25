import { z } from 'zod';

export const BlogArticleSchema = z.object({
  title: z.string().min(4),
  summary: z.string().min(10),
  bodyHtml: z.string().min(20),
  tags: z.array(z.string()).default([]),
  tone: z.enum(['formal','descontraido','tecnico']).default('tecnico'),
  seo: z.object({
    keywords: z.array(z.string()).default([]),
    metaDescription: z.string().min(10),
    slug: z.string().min(3),
  }),
  readingTimeMin: z.number().int().positive(),
});

export type BlogArticle = z.infer<typeof BlogArticleSchema>;



