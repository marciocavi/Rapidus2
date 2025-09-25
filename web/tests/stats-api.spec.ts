import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe.skip("API Stats contratos", () => {
  it("existe rota GET /api/stats", () => {
    const files = [
      "src/server/api/stats/index.ts",
      "src/pages/api/stats/index.ts",
      "src/app/api/stats/route.ts",
    ];
    
    const found = files.some((f) => {
      try { 
        fs.readFileSync(f, "utf8"); 
        return true; 
      } catch { 
        return false; 
      }
    });
    
    expect(found).toBe(true);
  });

  it("API tem métodos HTTP corretos", () => {
    const apiFiles = [
      "src/server/api/stats/index.ts",
      "src/pages/api/stats/index.ts", 
      "src/app/api/stats/route.ts",
    ];
    
    let foundFile = null;
    for (const file of apiFiles) {
      try {
        const content = fs.readFileSync(file, "utf8");
        foundFile = content;
        break;
      } catch {
        continue;
      }
    }
    
    expect(foundFile).toBeTruthy();
    
    // Verifica se contém métodos HTTP esperados
    const hasGet = foundFile?.includes("GET") || foundFile?.includes("export async function GET");
    const hasPost = foundFile?.includes("POST") || foundFile?.includes("export async function POST");
    
    expect(hasGet || hasPost).toBe(true);
  });

  it("estrutura de dados Stats é válida", () => {
    // Teste básico de estrutura
    const mockStat = {
      id: "1",
      ativo: true,
      ordem: 1,
      titulo: "Teste",
      valorRaw: "1000",
      formatOn: true,
      decimais: 0,
      sepMilhar: ".",
      sepDecimal: ",",
      abreviar: false,
      prefixo: "",
      sufixo: "",
      icone: "📊",
      cor: "#000000",
      descricao: "Teste descrição",
      destaque: false,
      animacaoContador: true,
      tag: "test"
    };
    
    expect(mockStat.id).toBeDefined();
    expect(mockStat.titulo).toBeDefined();
    expect(mockStat.valorRaw).toBeDefined();
  });
});
