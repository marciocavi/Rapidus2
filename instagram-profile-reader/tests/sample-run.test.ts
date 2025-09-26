import { describe, expect, it } from "vitest";

import { analyzeProfile } from "../src/index.js";

describe("analyzeProfile", () => {
  it("gera insights a partir de fixture (fallback heurístico)", async () => {
    // Este teste valida o fallback, assumindo que não há OPENAI_API_KEY no ambiente de teste
    const result = await analyzeProfile("demo_artist", { source: "fixture", persist: false });

    expect(result.insights.username).toBe("demo_artist");
    expect(result.insights.palette.length).toBeGreaterThanOrEqual(3);
    expect(result.insights.ctas.length).toBeGreaterThan(0);
    expect(result.insights.toneOfVoice).toBe("Criativo e acolhedor"); // Verifica a saída da heurística
    expect(result.siteConfig.branding.palette.length).toBeGreaterThanOrEqual(3);
  });
});
