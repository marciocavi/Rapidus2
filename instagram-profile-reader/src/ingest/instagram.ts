import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { IngestResult, RawInstagramProfile } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadProfileFromFixture(username: string): Promise<IngestResult> {
  const filePath = join(__dirname, "fixtures", `${username}.json`);
  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch (error) {
    throw new Error(`Fixture não encontrada para ${username} em ${filePath}`);
  }
  const profile = JSON.parse(raw) as RawInstagramProfile;

  return {
    profile,
    metadata: {
      source: "fixture",
      loadedFrom: filePath
    }
  };
}

export async function fetchProfileFromAPI(username: string): Promise<IngestResult> {
  throw new Error(`fetchProfileFromAPI not implemented. Attempted username: ${username}`);
}

export async function resolveProfile(
  username: string,
  source: "fixture" | "api" = "fixture"
): Promise<IngestResult> {
  if (source === "fixture") {
    return loadProfileFromFixture(username);
  }

  return fetchProfileFromAPI(username);
}
