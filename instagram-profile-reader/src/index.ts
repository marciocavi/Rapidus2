#!/usr/bin/env node
import { Command } from "commander";

import { resolveProfile } from "./ingest/instagram.js";
import { buildProfileInsights } from "./synthesis/insights.js";
import { mapInsightsToSiteConfig } from "./synthesis/site-config.js";
import { buildMarkdownSummary, persistJson, persistMarkdown } from "./storage/file-cache.js";

export interface AnalyzeProfileOptions {
  source?: "fixture" | "api";
  persist?: boolean;
  apiKey?: string;
}

export async function analyzeProfile(
  username: string,
  options: AnalyzeProfileOptions = {}
) {
  const ingest = await resolveProfile(username, options.source ?? "fixture");
  const insights = await buildProfileInsights(ingest.profile, {
    username,
    apiKey: options.apiKey
  });
  const siteConfig = mapInsightsToSiteConfig(insights);

  if (options.persist) {
    const jsonPath = await persistJson(`${username}.insights`, insights);
    const siteConfigPath = await persistJson(`${username}.site-config`, siteConfig);
    const markdown = buildMarkdownSummary({
      username: insights.username,
      summary: insights.summary,
      palette: insights.palette,
      ctas: insights.ctas,
      toneOfVoice: insights.toneOfVoice
    });
    const markdownPath = await persistMarkdown(`${username}`, markdown);

    return {
      insights,
      siteConfig,
      storedAt: {
        jsonPath,
        siteConfigPath,
        markdownPath
      }
    };
  }

  return { insights, siteConfig };
}

export async function runCli(rawArgs: string[]) {
  const program = new Command();

  program
    .name("instagram-profile-reader")
    .description("Gera insights a partir de um perfil do Instagram usando dados mockados")
    .argument("<username>", "nome do usuário a ser analisado")
    .option("--source <source>", "origem dos dados (fixture|api)", "fixture")
    .option("--persist", "salva resultados em output/", false)
    .option("--api-key <key>", "Chave da API da OpenAI")
    .action(async (username: string, options: { source: "fixture" | "api"; persist?: boolean; apiKey?: string }) => {
      const result = await analyzeProfile(username, {
        source: options.source,
        persist: options.persist,
        apiKey: options.apiKey
      });
      console.log(JSON.stringify({ insights: result.insights, siteConfig: result.siteConfig }, null, 2));
      if (result.storedAt) {
        console.log("\nArquivos salvos em:", result.storedAt);
      }
    });

  await program.parseAsync(rawArgs);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli(process.argv.slice(2));
}
