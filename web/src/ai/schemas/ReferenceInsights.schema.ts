import { z } from 'zod';

export const ReferenceInsightsSchema = z.object({
  sources: z.object({ instagram: z.string().optional(), website: z.string().optional() }),
  keywords: z.array(z.string()).default([]),
  tone: z.enum(['elegante','tecnico','divertido']).default('tecnico'),
  imageryThemes: z.array(z.string()).default([]),
  brandDoDont: z.object({ do: z.array(z.string()).default([]), dont: z.array(z.string()).default([]) }),
});

export type ReferenceInsights = z.infer<typeof ReferenceInsightsSchema>;



