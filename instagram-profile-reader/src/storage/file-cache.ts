import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export interface CacheOptions {
  outputDir?: string;
}

export async function persistJson<T>(filename: string, data: T, options?: CacheOptions): Promise<string> {
  const outputDir = options?.outputDir ?? "output";
  const targetDir = join(process.cwd(), outputDir);
  await mkdir(targetDir, { recursive: true });

  const filePath = join(targetDir, `${filename}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return filePath;
}

export async function persistMarkdown(filename: string, markdown: string, options?: CacheOptions): Promise<string> {
  const outputDir = options?.outputDir ?? "output";
  const targetDir = join(process.cwd(), outputDir);
  await mkdir(targetDir, { recursive: true });
  const filePath = join(targetDir, `${filename}.md`);
  await writeFile(filePath, markdown, "utf-8");
  return filePath;
}

export function buildMarkdownSummary({
  username,
  summary,
  palette,
  ctas,
  toneOfVoice
}: {
  username: string;
  summary: string;
  palette: { hex: string; name: string }[];
  ctas: string[];
  toneOfVoice: string;
}): string {
  const paletteList = palette.map((color) => `- ${color.name} (${color.hex})`).join("\n");
  const ctasList = ctas.map((cta) => `- ${cta}`).join("\n");

  return `# Perfil @${username}\n\n${summary}\n\n## Paleta sugerida\n${paletteList}\n\n## Chamadas para ação\n${ctasList}\n\n_Tom de voz:_ ${toneOfVoice}\n`;
}


