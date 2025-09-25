import { z } from 'zod';

export const LayoutPlanSchema = z.object({
  sections: z.array(z.object({
    componentKey: z.enum(['HeroBanner','Carousel','ContactForm','Testimonials','FeaturesGrid']),
    props: z.record(z.unknown()).default({}),
    order: z.number().int().nonnegative(),
  })).default([]),
  theme: z.object({ useDark: z.boolean().default(true), tokensRef: z.enum(['brand','default']).default('default') }),
  ctas: z.array(z.object({ text: z.string(), href: z.string().url().or(z.string().min(1)) })).default([]),
});

export type LayoutPlan = z.infer<typeof LayoutPlanSchema>;



