import { z } from 'zod';
import { BlogArticleSchema } from './BlogArticle.schema';
import { ImageEditPlanSchema } from './ImageEditPlan.schema';
import { BrandPaletteSchema } from './BrandPalette.schema';
import { LayoutPlanSchema } from './LayoutPlan.schema';
import { ReferenceInsightsSchema } from './ReferenceInsights.schema';

export const SitePlanSchema = z.object({
  article: BlogArticleSchema.optional(),
  imageEdits: z.array(ImageEditPlanSchema).optional(),
  palette: BrandPaletteSchema.optional(),
  layout: LayoutPlanSchema.optional(),
  insights: ReferenceInsightsSchema.optional(),
});

export type SitePlan = z.infer<typeof SitePlanSchema>;



