import { afterEach, describe, expect, it, vi } from "vitest";

import * as indexModule from "../src/index.js";

const { analyzeProfile } = indexModule;

afterEach(() => {
  vi.restoreAllMocks();
});

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

  it("mantém a validação para perfis minimalistas", async () => {
    const result = await analyzeProfile("silent_account", { source: "fixture", persist: false });

    expect(result.insights.username).toBe("silent_account");
    expect(result.insights.keywords.length).toBeGreaterThan(0);
    expect(result.insights.summary).toContain("Mesmo sem temas específicos destacados nos posts");
    expect(result.insights.ctas.length).toBeGreaterThan(0);
  });
});

describe("CLI", () => {
  it("propaga flags do Instagram para analyzeProfile", async () => {
    const analyzeSpy = vi.fn().mockResolvedValue({
      insights: {},
      siteConfig: {},
      storedAt: undefined
    });

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await indexModule.runCli(
      [
        "demo_artist",
        "--source",
        "api",
        "--ig-access-token",
        "token-test",
        "--ig-user-id",
        "123456"
      ],
      { analyzeProfile: analyzeSpy }
    );

    expect(analyzeSpy).toHaveBeenCalledTimes(1);
    const optionsArg = analyzeSpy.mock.calls[0]?.find(
      (arg) => typeof arg === "object" && arg !== null && "instagramAccessToken" in arg
    );

    expect(optionsArg).toEqual(
      expect.objectContaining({
        instagramAccessToken: "token-test",
        instagramUserId: "123456",
        source: "api"
      })
    );

    consoleSpy.mockRestore();
  });
});
