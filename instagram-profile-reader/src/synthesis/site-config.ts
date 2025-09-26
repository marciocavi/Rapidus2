import { ProfileInsights } from "./schemas.js";

export interface SiteConfigSuggestion {
  branding: {
    palette: string[];
    toneOfVoice: string;
  };
  content: {
    heroHeadline: string;
    heroSubheadline: string;
    ctas: string[];
    activeSections: string[];
  };
}

export function mapInsightsToSiteConfig(insights: ProfileInsights): SiteConfigSuggestion {
  return {
    branding: {
      palette: insights.palette.map((color) => color.hex),
      toneOfVoice: insights.toneOfVoice
    },
    content: {
      heroHeadline: insights.headlineIdeas[0] ?? `Descubra ${insights.username}`,
      heroSubheadline: insights.summary,
      ctas: insights.ctas,
      activeSections: insights.sectionsPriority
    }
  };
}
