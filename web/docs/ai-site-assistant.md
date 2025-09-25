## AI Site Assistant (dry-run)

Flags (arquivo `.env.local` na pasta `web`):

```
AI_ASSISTANT_ENABLED=true
AI_DRY_RUN=true
```

Rotas disponíveis:

- GET `/api/ai/site/plan` → retorna plano mockado validado por Zod (`SitePlanSchema`).
- POST `/api/ai/site/plan` → valida um `SitePlan` enviado e retorna `{ dryRun, applied:false, plan }`.
- GET `/api/ai/site/components-map` → mapa simples dos componentes disponíveis.

Exemplos (PowerShell):

```powershell
# GET plano
Invoke-RestMethod http://localhost:3001/api/ai/site/plan | ConvertTo-Json -Depth 6

# POST plano (dry-run)
$body = '{"layout":{"sections":[{"componentKey":"HeroBanner","props":{},"order":0}],"theme":{"useDark":true,"tokensRef":"default"},"ctas":[{"text":"OK","href":"/"}]}}'
Invoke-RestMethod -Method POST -Uri http://localhost:3001/api/ai/site/plan -Headers @{"Content-Type"="application/json"} -Body $body | ConvertTo-Json -Depth 6

# GET components map
Invoke-RestMethod http://localhost:3001/api/ai/site/components-map | ConvertTo-Json -Depth 6
```

Segurança:

- Endpoints protegidos por `AI_ASSISTANT_ENABLED`. Com a flag desativada, retornam 404.
- Modo `AI_DRY_RUN` impede alterações em runtime (somente validação/retorno de mocks).

Próximos passos:

- Expandir `components-map` a partir do código real (scanner seguro).
- Adicionar UI em `/admin/ai` para orquestrar planos (somente com flags ativas).
- Cobrir com testes Vitest (já iniciado em `tests/api.ai.endpoints.spec.ts`).

### Changelog

- Alteração 1: Endpoints iniciais (GET/POST `site/plan`) com flags e Zod; fixture.
- Alteração 2: Página `admin/ai` com visualização de plano e components‑map.
- Alteração 3: Formulário dry‑run (POST), com validação local de JSON.
- Alteração 4: Rascunho (salvar/carregar) via `localStorage`.
- Alteração 5: UI polish (borda de erro, copiar/limpar resposta).
- Alteração 6: Link “AI” no sidebar do layout admin (badge beta).


