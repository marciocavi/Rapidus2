import { describe, it, expect } from "vitest";
import { textStyleToClass } from "../src/utils/textStyle.js";

describe("textStyleToClass", () => {
  it("mapeia tamanho e cor para classes CSS", () => {
    const cls = textStyleToClass({
      family: "heading", 
      size: "h2", 
      weight: 700, 
      line: "tight",
      tracking: "tight", 
      color: "text.primary"
    } as any);
    
    expect(cls).toContain("text-h2");
    expect(cls).toContain("text-primary");
    expect(cls).toContain("font-heading");
  });

  it("retorna classes CSS válidas", () => {
    const cls = textStyleToClass({
      family: "body",
      size: "body",
      weight: 400,
      line: "normal",
      tracking: "normal",
      color: "text.secondary"
    } as any);
    
    expect(typeof cls).toBe("string");
    expect(cls.length).toBeGreaterThan(0);
  });

  it("lida com valores undefined", () => {
    const cls = textStyleToClass({} as any);
    expect(typeof cls).toBe("string");
  });
});
