import { describe, it } from "vitest";
import { analyzeProfile } from "../src/index.js";

describe("Real LLM Output Generation", () => {
  it("should generate output files for demo_artist using a real LLM call", async () => {
    console.log("Generating output for demo_artist with real LLM call...");
    const result = await analyzeProfile("demo_artist", { persist: true });
    console.log("Files generated at:", result.storedAt);
  });
});
