// tools/validate-cursor.mjs
import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

const root = process.cwd();
const spec = yaml.parse(fs.readFileSync(path.join(root, "spec.yml"), "utf8"));

let failures = [];

function checkFile(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) failures.push(`FALTA arquivo: ${p}`);
}

function fileIncludes(p, needles) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) { failures.push(`FALTA arquivo: ${p}`); return; }
  const txt = fs.readFileSync(full, "utf8");
  needles.forEach((n) => {
    const ok = txt.includes(n);
    if (!ok) failures.push(`FALTA no ${p}: "${n}"`);
  });
}

function prismaHasModel(model, fieldSnippets) {
  const schemaPath = spec.required_files.find(f => f.path.includes("prisma/schema.prisma"))?.path || "prisma/schema.prisma";
  const full = path.join(root, schemaPath);
  if (!fs.existsSync(full)) { failures.push(`FALTA Prisma schema: ${schemaPath}`); return; }
  const txt = fs.readFileSync(full, "utf8");
  const modelRegex = new RegExp(`model\\s+${model}\\s*\\{[\\s\\S]*?\\}`, "m");
  const match = txt.match(modelRegex);
  if (!match) { failures.push(`FALTA model Prisma: ${model}`); return; }
  const block = match[0];
  fieldSnippets.forEach(s => {
    if (!block.includes(s)) failures.push(`FALTA campo Prisma em ${model}: ${s}`);
  });
}

function apiFileGuess() {
  // tenta encontrar rotas em src/server/api ou pages/api
  const candidates = [
    "src/server/api/stats/index.ts",
    "src/pages/api/stats/index.ts",
    "src/app/api/stats/route.ts",
  ];
  return candidates.find(c => fs.existsSync(path.join(root, c)));
}

function checkRoutes(routes) {
  const file = apiFileGuess();
  if (!file) { failures.push("FALTA arquivo de rotas de /api/stats"); return; }
  const txt = fs.readFileSync(path.join(root, file), "utf8");
  routes.forEach(r => {
    const needle = r.path.replace(/:\w+/g, ""); // simplifica
    if (!txt.includes(needle)) failures.push(`FALTA rota ${r.method} ${r.path} (ver em ${file})`);
  });
}

function main() {
  console.log("🔍 Validando especificação do projeto...\n");
  
  // arquivos
  spec.required_files.forEach(f => checkFile(f.path));
  
  // css vars
  fileIncludes("src/styles/theme.css", spec.css_vars_must_include);

  // prisma
  prismaHasModel(spec.prisma_model_must_include.model, spec.prisma_model_must_include.fields);

  // rotas
  checkRoutes(spec.api_routes_must_exist);

  // requisitos de admin e render (apenas check de palavras em componentes chaves)
  fileIncludes("src/pages/admin/sections/Stats.tsx", [
    "dnd-kit", "Exportar", "Importar", "Prévia", "Dark", "Light"
  ]);
  fileIncludes("src/sections/Stats/index.tsx", [
    "aria-", "role=", "grid", "animate" // heurísticas leves
  ]);

  // testes presentes
  spec.tests_must_pass.forEach(t => checkFile(t.file));

  if (failures.length) {
    console.error("\n❌ PENDÊNCIAS ENCONTRADAS:");
    failures.forEach(f => console.error(" - " + f));
    console.error(`\n📊 Total: ${failures.length} pendências`);
    process.exit(1);
  } else {
    console.log("✅ Validação OK. Tudo que o spec exige está presente.");
    console.log(`📊 Total: ${spec.required_files.length} arquivos verificados`);
  }
}

main();


