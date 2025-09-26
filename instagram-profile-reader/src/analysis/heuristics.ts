import { RawInstagramProfile } from "../ingest/types.js";

export interface HeuristicInsights {
  sectionsPriority: Array<"banner" | "portfolio" | "planos" | "depoimentos" | "blog" | "instagram">;
  ctas: string[];
  confidence: number;
}

function scoreForWorkshops(profile: RawInstagramProfile): number {
  return profile.posts.filter((post) => /workshop|agenda|curso/i.test(post.caption)).length;
}

function scoreForProducts(profile: RawInstagramProfile): number {
  return profile.posts.filter((post) => /encomenda|loja|produto|cardápio/i.test(post.caption)).length;
}

function scoreForTestimonials(profile: RawInstagramProfile): number {
  return profile.posts.filter((post) => /feedback|cliente|depoimento/i.test(post.caption)).length;
}

export function deriveHeuristics(profile: RawInstagramProfile): HeuristicInsights {
  const workshopScore = scoreForWorkshops(profile);
  const productScore = scoreForProducts(profile);
  const testimonialScore = scoreForTestimonials(profile);

  const sectionsPriority: HeuristicInsights["sectionsPriority"] = ["banner", "instagram"];

  if (workshopScore > 0) {
    sectionsPriority.push("planos");
  }
  if (productScore > 0) {
    sectionsPriority.push("portfolio");
  }
  if (testimonialScore > 0) {
    sectionsPriority.push("depoimentos");
  }

  const ctas = new Set<string>();
  if (profile.externalUrl) {
    ctas.add("Visite o site oficial");
  }
  if (workshopScore > 0) {
    ctas.add("Reserve sua vaga no workshop");
  }
  if (productScore > 0) {
    ctas.add("Peça um orçamento personalizado");
  }
  if (profile.bio.toLowerCase().includes("dm")) {
    ctas.add("Envie uma mensagem no Instagram");
  }

  if (ctas.size === 0) {
    ctas.add("Entre em contato pelo Instagram");
  }

  const totalSignals = workshopScore + productScore + testimonialScore;
  const confidence = Math.min(1, 0.3 + totalSignals * 0.15);

  return {
    sectionsPriority,
    ctas: Array.from(ctas),
    confidence
  };
}
