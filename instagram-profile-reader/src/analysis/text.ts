import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { z } from "zod";

import { RawInstagramProfile } from "../ingest/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface TextInsights {
  toneOfVoice: string;
  headlineIdeas: string[];
  keywords: string[];
  summary: string;
}

function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#@]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function topKeywords(texts: string[], max = 10): string[] {
  const blacklist = new Set(["de", "da", "do", "das", "dos", "para", "com", "uma", "que"]);
  const counts = new Map<string, number>();

  for (const text of texts) {
    const words = normalizeText(text).toLowerCase().split(/[^a-zà-ú0-9]+/).filter(Boolean);
    for (const word of words) {
      if (blacklist.has(word) || word.length < 2) continue;
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word);
}

function inferToneOfVoice(profile: RawInstagramProfile): string {
  const bio = profile.bio.toLowerCase();
  if (bio.includes("freelancer") || bio.includes("comissões")) {
    return "Criativo e acolhedor";
  }
  if (bio.includes("artesanal") || bio.includes("fermentação")) {
    return "Aconchegante e artesanal";
  }
  return "Profissional e inspirador";
}

function summarizeWithHeuristics(profile: RawInstagramProfile): TextInsights {
  const captions = profile.posts.map((post) => post.caption);
  const normalizedBio = normalizeText(profile.bio);
  const normalizedCaptions = captions.map(normalizeText);

  const collectedKeywords = new Set([
    ...topKeywords([normalizedBio, ...normalizedCaptions], 8),
    ...(profile.categories ?? []).map((category) => category.toLowerCase()),
    ...profile.posts.flatMap((post) => post.keywords ?? [])
  ]);

  let keywords = Array.from(collectedKeywords);
  const hasSpecificKeywords = keywords.length > 0;

  if (!hasSpecificKeywords) {
    const fallbackKeywords = new Set<string>();
    const normalizedUsername = normalizeText(profile.username).toLowerCase();
    const normalizedFullName = normalizeText(profile.fullName).toLowerCase();

    if (normalizedUsername) fallbackKeywords.add(normalizedUsername);
    if (normalizedFullName && normalizedFullName !== normalizedUsername) {
      fallbackKeywords.add(normalizedFullName);
    }
    for (const category of profile.categories ?? []) {
      const normalizedCategory = normalizeText(category).toLowerCase();
      if (normalizedCategory) fallbackKeywords.add(normalizedCategory);
    }

    fallbackKeywords.add("perfil");

    keywords = Array.from(fallbackKeywords);
  }

  const headlineIdeas = [
    `${profile.fullName}: ${keywords.slice(0, 3).join(" • ")}`.trim(),
    `Projetos recentes de ${profile.fullName}`,
    `Explore o universo de ${profile.username}`
  ];

  const displayName = profile.fullName || profile.username;
  const bioSummary = normalizedBio
    ? `${displayName} se apresenta como ${normalizedBio}.`
    : `${displayName} mantém uma presença discreta no Instagram.`;

  const postsSummary = hasSpecificKeywords
    ? ` Os posts recentes destacam ${keywords.slice(0, 3).join(", ")}.`
    : ` Mesmo sem temas específicos destacados nos posts, ${profile.username} segue construindo sua presença.`;

  const summary = `${bioSummary}${postsSummary}`.trim();

  return {
    toneOfVoice: inferToneOfVoice(profile),
    headlineIdeas,
    keywords,
    summary
  };
}

const llmResponseSchema = z.object({
  toneOfVoice: z.string(),
  themes: z.array(z.string()),
  headlineIdeas: z.array(z.string()),
  primaryCta: z.string()
});

async function summarizeWithLLM(
  profile: RawInstagramProfile,
  apiKey?: string
): Promise<TextInsights | null> {
  const finalApiKey = apiKey || process.env.OPENAI_API_KEY;
  if (!finalApiKey) {
    console.warn("Chave da OpenAI não encontrada. Usando fallback de heurísticas.");
    return null;
  }

  const openai = new OpenAI({ apiKey: finalApiKey });
  const promptTemplate = await readFile(join(__dirname, "../../prompts/profile-summary.md"), "utf-8");
  const userContent = `Dados do perfil:\n${JSON.stringify(
    {
      bio: profile.bio,
      posts: profile.posts.map((p) => ({ caption: p.caption, keywords: p.keywords }))
    },
    null,
    2
  )}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: promptTemplate },
        { role: "user", content: userContent }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = llmResponseSchema.parse(JSON.parse(content));
    const allKeywords = topKeywords([profile.bio, ...profile.posts.map((p) => p.caption)]);

    return {
      toneOfVoice: parsed.toneOfVoice,
      headlineIdeas: parsed.headlineIdeas,
      keywords: Array.from(new Set([...parsed.themes, ...allKeywords])).slice(0, 10),
      summary: `Perfil focado em ${parsed.themes.join(", ")} com um tom de voz ${parsed.toneOfVoice}.`
    };
  } catch (error) {
    console.error("Erro ao chamar a API da OpenAI:", error);
    return null;
  }
}

export async function summarizeProfileText(
  profile: RawInstagramProfile,
  apiKey?: string
): Promise<TextInsights> {
  const llmResult = await summarizeWithLLM(profile, apiKey);
  if (llmResult) {
    return llmResult;
  }

  return summarizeWithHeuristics(profile);
}
