import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { IngestResult, RawInstagramProfile } from "./types.js";

export interface ResolveProfileOptions {
  source?: "fixture" | "api";
  instagramAccessToken?: string;
  instagramUserId?: string;
}

interface FetchProfileOptions {
  accessToken?: string;
  userId?: string;
}

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

export async function fetchProfileFromAPI(
  username: string,
  options: FetchProfileOptions = {}
): Promise<IngestResult> {
  const accessToken = options.accessToken ?? process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = options.userId ?? process.env.INSTAGRAM_USER_ID;

  if (!accessToken) {
    throw new Error(
      "Instagram access token não fornecido. Use --ig-access-token ou defina INSTAGRAM_ACCESS_TOKEN."
    );
  }

  if (!userId) {
    throw new Error(
      "Instagram user ID não fornecido. Use --ig-user-id ou defina INSTAGRAM_USER_ID."
    );
  }

  throw new Error(
    "fetchProfileFromAPI ainda não foi implementado. Forneça uma integração com a Instagram Basic Display/Graph API."
  );
}

export async function resolveProfile(
  username: string,
  options: ResolveProfileOptions = {}
): Promise<IngestResult> {
  const source = options.source ?? "fixture";

  if (source === "fixture") {
    return loadProfileFromFixture(username);
  }

  return fetchProfileFromAPI(username, {
    accessToken: options.instagramAccessToken,
    userId: options.instagramUserId
  });
}
