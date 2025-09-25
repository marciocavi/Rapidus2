import { z } from 'zod';

export const BrandPaletteSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accents: z.array(z.string()).default([]),
  neutrals: z.array(z.string()).default([]),
  gradientSuggestions: z.array(z.string()).default([]),
  contrastRatios: z.array(z.object({ fg: z.string(), bg: z.string(), ratio: z.number(), pass: z.boolean() })).default([]),
  tokens: z.record(z.string()).default({}),
});

export type BrandPalette = z.infer<typeof BrandPaletteSchema>;



