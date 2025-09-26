import { deriveHeuristics } from "../analysis/heuristics.js";
import { buildPaletteInsights } from "../analysis/vision.js";
import { summarizeProfileText } from "../analysis/text.js";
import { RawInstagramProfile } from "../ingest/types.js";
import { profileInsightsSchema, ProfileInsights } from "./schemas.js";

export interface BuildInsightsOptions {
  username: string;
  apiKey?: string;
}

export async function buildProfileInsights(
  profile: RawInstagramProfile,
  options?: BuildInsightsOptions
): Promise<ProfileInsights> {
  const textInsights = await summarizeProfileText(profile, options?.apiKey);
  const paletteInsights = buildPaletteInsights(profile.posts);
  const heuristics = deriveHeuristics(profile);

  const result = profileInsightsSchema.parse({
    username: options?.username ?? profile.username,
    toneOfVoice: textInsights.toneOfVoice,
    headlineIdeas: textInsights.headlineIdeas,
    palette: paletteInsights.palette,
    sectionsPriority: heuristics.sectionsPriority,
    ctas: heuristics.ctas,
    keywords: textInsights.keywords,
    confidence: heuristics.confidence,
    rawReferenceIds: paletteInsights.referencePostIds,
    summary: textInsights.summary
  });

  return result;
}
