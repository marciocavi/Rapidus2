import { z } from "zod";

export const paletteColorSchema = z.object({
  hex: z.string().regex(/^#?[0-9a-fA-F]{6}$/),
  name: z.string().min(1)
});

export const profileInsightsSchema = z.object({
  username: z.string().min(2),
  toneOfVoice: z.string().min(2),
  headlineIdeas: z.array(z.string().min(2)).min(1),
  palette: z.array(paletteColorSchema).min(3),
  sectionsPriority: z
    .array(z.enum(["banner", "portfolio", "planos", "depoimentos", "blog", "instagram"]))
    .min(2),
  ctas: z.array(z.string().min(2)).min(1),
  keywords: z.array(z.string().min(2)).min(1),
  confidence: z.number().min(0).max(1),
  rawReferenceIds: z.array(z.string().min(1)).max(10),
  summary: z.string().min(4)
});

export type ProfileInsights = z.infer<typeof profileInsightsSchema>;


