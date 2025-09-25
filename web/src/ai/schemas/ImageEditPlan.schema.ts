import { z } from 'zod';

export const ImageEditPlanSchema = z.object({
  sourceImageId: z.string(),
  operations: z.array(z.discriminatedUnion('type', [
    z.object({ type: z.literal('removeBackground') }),
    z.object({ type: z.literal('upscale'), factor: z.union([z.literal(2), z.literal(4)]) }),
    z.object({ type: z.literal('overlayText'), text: z.string(), placement: z.enum(['center','bottom']), fontToken: z.string() }),
    z.object({ type: z.literal('resize'), width: z.number().int().positive(), height: z.number().int().positive() })
  ])).default([]),
  outputFormat: z.enum(['png','jpg','webp']).default('png'),
  targetUse: z.enum(['banner-hero','card','thumb']).default('card'),
});

export type ImageEditPlan = z.infer<typeof ImageEditPlanSchema>;



