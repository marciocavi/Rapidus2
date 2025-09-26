# Playbook: Construção segura do "Leitor de Perfil do Instagram" fora do projeto principal

Este documento descreve um roteiro completo para que o agente do Cursor desenvolva, em um repositório isolado, a base da funcionalidade de "leitor de perfil do Instagram". O objetivo é gerar um conjunto de insights e artefatos reutilizáveis sem colocar em risco o projeto principal (`web/`). O plano foi elaborado com conhecimento da arquitetura atual (Next.js 15 + React 19 + TypeScript, pipeline de dados em `web/data/site.json` e contexto em `web/src/context/SiteConfigContext.tsx`).

> **Importante**: focamos apenas na prova de conceito técnica. Camadas de ética/compliance podem ser adicionadas depois.

---

## 1. Objetivo da prova de conceito externa

- Construir um serviço independente que:
  1. Receba um identificador de perfil público do Instagram (ou dados previamente exportados para testes).
  2. Extraia e normalize informações textuais (bio, legendas recentes) e visuais (paleta dominante das imagens).
  3. Gere um objeto JSON com *insights* prontos para alimentar o painel Rapidus (paleta, tom de voz, seções prioritárias).
- Entregar scripts testáveis, documentação curta e exemplos de saída para facilitar futura integração.

---

## 2. Setup recomendado para o repositório externo

### 2.1 Estrutura inicial
```
instagram-profile-reader/
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # ponto de entrada CLI/API
│   ├── ingest/
│   │   ├── instagram.ts      # adaptadores para obter dados (mock/API)
│   │   └── fixtures/         # dumps JSON localizados para testes offline
│   ├── analysis/
│   │   ├── text.ts           # resumo de bio/legendas
│   │   ├── vision.ts         # extração de paleta de cores via Jimp/ColorThief
│   │   └── heuristics.ts     # regras simples para CTA, seções prioritárias
│   ├── synthesis/
│   │   └── insights.ts       # monta o objeto final (ProfileInsights)
│   └── storage/
│       └── file-cache.ts     # cache local opcional
├── tests/
│   └── sample-run.test.ts
└── prompts/
    └── profile-summary.md    # prompt base para LLM quando necessário
```

### 2.2 Dependências sugeridas
- `typescript`, `ts-node` – execução TS
- `axios` – chamadas HTTP (quando usar API oficial/mock)
- `zod` – garantir tipos do objeto `ProfileInsights`
- `colorthief` ou `jimp` – extração de paleta
- `langchain` ou `openai` SDK – para sumarização textual via LLM (pode ser mockado)
- `vitest` – testes rápidos

### 2.3 Scripts úteis
```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "test": "vitest run",
    "lint": "eslint . --ext .ts"
  }
}
```

### 2.4 Controle de memória para o agente Cursor
1. Inicie a sessão com o **prompt de sistema** abaixo (ver seção 7).
2. Peça para criar um arquivo `NOTES.md` na raiz contendo objetivos, decisões tomadas e pendências. O agente deve atualizar o arquivo a cada macro-iteração para não se perder.
3. Sempre que um módulo estiver pronto, gerar um caso de teste mínimo em `tests/` e adicionar o comando de execução em `README.md`.

---

## 3. Pipeline sugerido

1. **Ingestão**
   - Comece com *fixtures* (`src/ingest/fixtures/<perfil>.json`) representando respostas da API oficial ou exportações manuais. Isso evita qualquer chamada real até que a prova de conceito esteja sólida.
   - Estruture uma interface `RawInstagramProfile` com campos necessários (bio, posts recentes, urls de imagens, hashtags, seguidores aproximados).
   - Implementar função `loadProfileFromFixture(username: string)` e deixar um stub `fetchProfileFromAPI` que pode ser ativado depois.

2. **Análise textual (`analysis/text.ts`)**
   - Normalizar bio/legendas (remover emojis duplicados, URLs, etc.).
   - Implementar resumo com duas estratégias: (a) heurística baseada em frequência; (b) chamada opcional ao LLM via prompt (ver seção 7). Use `langchain` com `ChatOpenAI` ou outra provedora compatível. Encapsule em `summarizeProfileText(raw: RawInstagramProfile): TextInsights`.

3. **Análise visual (`analysis/vision.ts`)**
   - Consumir URLs das imagens (nos testes, utilize arquivos locais dentro de `fixtures/`).
   - Usar `colorthief`/`jimp` para extrair paleta média + cor dominante.
   - Retornar `PaletteInsights` com 3-5 cores + nomes aproximados (há pacotes como `color-namer`).

4. **Heurísticas auxiliares (`analysis/heuristics.ts`)**
   - Regras simples para sugerir CTA (ex.: se posts contêm "link na bio" → CTA = "Visite o site").
   - Classificar se o perfil enfatiza portfolio, depoimentos, produtos ou bastidores.

5. **Síntese final (`synthesis/insights.ts`)**
   - Consolidar tudo em uma interface `ProfileInsights`:
     ```ts
     export interface ProfileInsights {
       username: string;
       toneOfVoice: string;
       headlineIdeas: string[];
       palette: { hex: string; name: string }[];
       sectionsPriority: Array<"banner" | "portfolio" | "planos" | "depoimentos" | "blog" | "instagram">;
       ctas: string[];
       keywords: string[];
       confidence: number; // 0-1
       rawReferenceIds: string[]; // ids dos posts usados
     }
     ```
   - Garantir validação com `zod` antes de salvar/retornar.

6. **Interface de uso (`src/index.ts`)**
   - Implementar CLI simples: `ts-node src/index.ts --username perfil_demo --source fixture` e imprimir o JSON final.
   - Exportar também função `analyzeProfile` para consumo futuro pelo Next.js.

7. **Testes (`tests/sample-run.test.ts`)**
   - Rodar pipeline completo com fixture controlada e validar formato/valores esperados (paleta não vazia, pelo menos um CTA, etc.).

---

## 4. Artefatos de saída para integrar ao Rapidus mais tarde

1. **JSON de insights** (armazenar em `output/<perfil>.insights.json`).
2. **Resumo em Markdown** com sugestões para layout (pode ser gerado em `output/<perfil>.md`).
3. **Script de conversão** que traduz `ProfileInsights` em uma sugestão de `SiteConfig` compatível com `web/data/site.json` (incluir `mapInsightsToSiteConfig(insights)` retornando objeto com cores, seções ativas e textos default).

> Quando a integração for aprovada, basta importar esse conversor no projeto Next e criar um endpoint protegido para consumir os insights.

---

## 5. Checklist para o agente Cursor (modo passo a passo)

1. **Inicialização**
   - Criar repositório local separado (`instagram-profile-reader`).
   - Iniciar `git init` e configurar `package.json` com dependências listadas.
   - Criar `NOTES.md` descrevendo objetivo + backlog inicial.

2. **Fixtures & Tipagem**
   - Montar pelo menos dois arquivos JSON fictícios em `src/ingest/fixtures/` com dados realistas.
   - Definir tipos `RawInstagramProfile` e `ProfilePost` em `src/ingest/types.ts`.

3. **Módulo de ingestão**
   - Implementar `loadProfileFromFixture` e preparar stub `fetchProfileFromAPI` (lançar erro "Not implemented").

4. **Módulos de análise**
   - Criar `analysis/text.ts` com funções puras testáveis.
   - Criar `analysis/vision.ts` com fallback para casos sem imagens (retornar paleta padrão).
   - Implementar heurísticas simples em `analysis/heuristics.ts`.

5. **Síntese + Validação**
   - Escrever `synthesis/insights.ts` consolidando os módulos.
   - Criar `schemas.ts` com `zod` para `ProfileInsights` e exportar validação.

6. **Interface e testes**
   - Implementar `src/index.ts` com CLI e função programática.
   - Criar teste `tests/sample-run.test.ts` chamando pipeline completo.

7. **Documentação**
   - Atualizar `README.md` com instruções de uso, execução de testes e descrição do fluxo.
   - Adicionar `prompts/profile-summary.md` com template de prompt (ver seção 7).

8. **Entrega**
   - Gerar saída demonstrativa dentro de `output/`.
   - Revisar `NOTES.md` e registrar estado final (tarefas concluídas / próximas etapas).

---

## 6. Estratégia de integração futura com o projeto `web/`

1. **Empacotamento**: publicar módulo como pacote npm privado (`@rapidus/instagram-profile-reader`) ou manter como serviço separado com endpoint REST `POST /analyze`.
2. **Feature flag** no Next.js: criar hook em `web/src/context/SiteConfigContext.tsx` para consumir insights apenas quando `process.env.ENABLE_IG_IMPORT === "true"`.
3. **API Bridge**: adicionar rota em `web/src/app/api/profile-insights/route.ts` que delega ao serviço externo usando token interno.
4. **Sincronização de dados**: usar `mapInsightsToSiteConfig` para pré-popular `SiteConfig` exibido no painel `/admin/settings`.
5. **Rollback simples**: bastar desligar a flag ou remover o pacote externo sem quebrar build.

---

## 7. Prompt sugerido para o agente Cursor

Utilize o texto abaixo como prompt de sistema (ou inicial) sempre que o agente for trabalhar no repositório externo:

```
Você é um assistente de engenharia responsável por construir um módulo isolado chamado "instagram-profile-reader". 
Objetivos:
1. Extrair e analisar dados públicos de perfis do Instagram usando fixtures simuladas enquanto a POC não estiver pronta.
2. Gerar insights estruturados (ProfileInsights) que possam alimentar futuramente o painel Rapidus (Next.js).
3. Manter o trabalho desacoplado do projeto principal, com testes automatizados e documentação clara.

Restrições e boas práticas:
- Nunca altere arquivos do projeto Rapidus original; trabalhe apenas no repositório isolado.
- Mantenha um arquivo NOTES.md sempre atualizado com decisões e próximos passos.
- Priorize funções puras, módulos testáveis e validações com Zod.
- Antes de integrar qualquer chamada real à API do Instagram, garanta que haja uma camada de mocks/fixtures.
- Cada entrega deve incluir pelo menos um teste `vitest` passando e um exemplo de saída em `output/`.

Fluxo de trabalho esperado: Planejar → implementar módulo → criar teste → documentar → atualizar NOTES.
```

---

## 8. Prompt base para sumarização de perfil (`prompts/profile-summary.md`)

```
Você recebe dados de um perfil do Instagram no formato JSON com os campos:
- bio
- posts: lista de objetos { caption, hashtags, likes, comments }
- audiencePersona: resumo demográfico (opcional)
- goals: lista textual (opcional)

Gere uma saída estruturada em Markdown contendo:
1. Tom de voz predominante (3 adjetivos).
2. Principais temas recorrentes (5 itens).
3. Sugestões de chamadas para ação (3 frases curtas).
4. Palavras-chave em alta (10 termos separados por vírgula).

Use linguagem objetiva em português do Brasil e retorne apenas o Markdown solicitado.
```

---

## 9. Próximos passos após a POC

- Avaliar performance real com dados atualizados (usar API oficial ou ferramenta aprovada).
- Criar testes de regressão com múltiplos perfis para validar estabilidade das heurísticas.
- Planejar deploy (serverless function ou microserviço containerizado).
- Integrar ao Rapidus utilizando feature flags e logs de auditoria.

---

## 10. Como reutilizar este playbook

- Compartilhe este arquivo com o agente Cursor antes de iniciar a sessão.
- Copie o prompt da seção 7 para garantir memória/consistência.
- Utilize a checklist (seção 5) como quadro Kanban textual no `NOTES.md`.
- Atualize este playbook caso surjam novas decisões arquiteturais.
