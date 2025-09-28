import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

import { ProfilePost } from "../ingest/types.js";

extend([namesPlugin]);

export interface PaletteColor {
  hex: string;
  name: string;
}

export interface PaletteInsights {
  palette: PaletteColor[];
  referencePostIds: string[];
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function derivePaletteFromPosts(posts: ProfilePost[]): PaletteColor[] {
  const colors = posts.flatMap((post) => post.dominantColors ?? []);

  return unique(colors)
    .map((hex) => {
      const parsed = colord(hex);
      const validHex = parsed.isValid() ? parsed.toHex() : "#999999";
      const name = parsed.isValid() ? parsed.toName({ closest: true }) ?? "Neutro" : "Neutro";
      return {
        hex: validHex,
        name
      };
    })
    .slice(0, 6);
}

export function buildPaletteInsights(posts: ProfilePost[]): PaletteInsights {
  const palette = derivePaletteFromPosts(posts);
  if (palette.length === 0) {
    palette.push(
      { hex: "#1F2933", name: "Slate" },
      { hex: "#F9FAFB", name: "Ice" },
      { hex: "#F97316", name: "Orange" }
    );
  }

  const referencePostIds = posts
    .filter((post) => (post.dominantColors ?? []).length > 0)
    .slice(0, 3)
    .map((post) => post.id);

  return {
    palette,
    referencePostIds
  };
}


