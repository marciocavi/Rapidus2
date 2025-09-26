# Instagram Profile Reader (Starter Kit)

Este pacote é um ponto de partida seguro para a prova de conceito do "leitor de perfil do Instagram". Ele foi pensado para ser executado em um repositório separado do projeto Rapidus, permitindo que você evolua a funcionalidade sem risco para a aplicação principal.

## Principais ideias
- Trabalhar inicialmente apenas com *fixtures* em `src/ingest/fixtures/`.
- Rodar um pipeline determinístico que gere `ProfileInsights` a partir de dados mockados.
- Facilitar a troca posterior por integrações reais (API, LLMs, processamento de imagem).

## Requisitos
- Node.js 20+
- PNPM, Yarn ou NPM (use o gerenciador que preferir)

## Como rodar a aplicação completa (Backend + Frontend)
```bash
npm install
npm run dev:full
```
Após executar, o backend estará rodando em `http://localhost:3001` e o frontend em `http://localhost:5173`. Abra a URL do frontend no seu navegador.

## Estrutura
```
src/
  analysis/
    text.ts # sumarização textual heurística + integração futura com LLM
    vision.ts # consolidação de paleta com base nas cores fornecidas nos fixtures
    heuristics.ts # CTA e seções prioritárias
  ingest/
    instagram.ts # carrega fixture e prepara adaptadores futuros para API real
    types.ts # tipagens compartilhadas
  synthesis/
    insights.ts # junta tudo e valida com Zod
    site-config.ts # converte insights para sugestão de SiteConfig
  storage/
    file-cache.ts # utilitário simples para persistir resultados
  index.ts # CLI e função programática analyzeProfile
prompts/
  profile-summary.md
tests/
  sample-run.test.ts
```

## Próximos passos sugeridos
1. Substituir os mocks por chamadas reais à API do Instagram (ou ferramenta de scraping em conformidade).
2. Incluir extração real de paleta de cores usando imagens baixadas temporariamente.
3. Conectar um LLM para análise textual mais profunda.
4. Empacotar o módulo como serviço HTTP ou biblioteca npm privada para integração ao Rapidus.

## Outros Comandos

```bash
# Rodar apenas os testes
npm test

# Construir o projeto TypeScript (backend)
npm run build

# Rodar a ferramenta de linha de comando (CLI)
npm run dev -- demo_artist
```

## Credenciais para testar a API do Instagram

Para executar `npm run dev -- <usuario> --source api` com dados reais, forneça credenciais válidas da Instagram Basic Display API ou da Graph API com o escopo mínimo `user_profile`/`user_media`. A CLI aceita as credenciais diretamente pelas flags:

```bash
npm run dev -- demo_artist --source api \
  --ig-access-token "SEU_TOKEN_DE_ACESSO" \
  --ig-user-id "ID_NUMERICO_DO_USUARIO"
```

Como alternativa, defina as variáveis de ambiente `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_USER_ID` antes de rodar a CLI. As flags prevalecem sobre as variáveis, permitindo alternar contas de teste com facilidade. Nunca faça commit de credenciais reais no repositório.

Os artefatos persistidos ficam em `output/`:
- `<username>.insights.json`: objeto `ProfileInsights` validado.
- `<username>.site-config.json`: sugestão compatível com o `SiteConfig` do Rapidus.
- `<username>.md`: resumo em Markdown para referência rápida.

## Notas para o agente IA
- Documente todo avanço em `NOTES.md` na raiz do repositório separado.
- Sempre que alterar um módulo, inclua um teste mínimo em `tests/`.
- Evite usar credenciais reais até que a arquitetura esteja validada.
