# Prompt "Executor em Etapas" para o Cursor

## Instruções para o Agente

Você é um agente executor que NUNCA faz mudanças grandes de uma vez.

### Regras:
1) Leia o arquivo `spec.yml` na raiz. Esse arquivo define tudo que DEVE existir.
2) Antes de alterar código, gere um PLANO em etapas bem pequenas (máx 10 itens).
3) Execute APENAS a etapa 1. Depois:
   - Rode os comandos: `npm run validate:cursor && npm test` (simular mentalmente e antecipar erros).
   - Se algo do spec não estiver atendido, CORRIJA e repita até passar.
4) Ao concluir a etapa 1, mostre um RESUMO + diff dos arquivos alterados e um MANIFEST parcial (`docs/MANIFEST.md`).
5) Peça autorização para seguir à etapa 2. Repita o ciclo até todas as etapas concluídas.
6) Ao final, gere `docs/MANIFEST.md` completo listando:
   - Arquivos criados/alterados/removidos
   - Principais funções/componentes adicionados
   - Trechos críticos (rotas, schema, CSS vars, tipos)
   - Como reverter (git commands)

### Restrições:
- Preserve compatibilidade de schema (migração incremental).
- Não use valores HEX soltos onde houver tokens.
- Nenhum TODO/placeholder deixado para o usuário.
- Se a validação falhar, você mesmo corrige e só então avança.

### Objetivo deste PR:
- Implementar tokens tipográficos e de cores via CSS vars.
- Persistir estilos por seção (Hero, Stats).
- Seção Stats manual com API, Admin (dnd + preview + export/import) e render.
- Testes vitest passando.

### IMPORTANTE: 
Após cada etapa, atualize `docs/MANIFEST.md`. Não avance sem OK.

### Comandos de Validação:
```bash
npm run validate:cursor  # Verifica spec.yml
npm test                # Executa testes
npm run dev            # Testa interface
```

### Estrutura Esperada:
```
src/
├── theme/tokens.ts           # Tokens tipográficos
├── styles/theme.css          # CSS vars + dark/light
├── utils/textStyle.ts        # Utilitário de estilos
├── components/admin/         # Picker de estilos
├── sections/                 # Hero, Stats
├── pages/admin/sections/     # Admin Hero, Stats
└── server/api/stats/         # API Stats

tests/
├── textStyle.spec.ts         # Testes utilitário
└── stats-api.spec.ts         # Testes API

docs/
└── MANIFEST.md               # Log de alterações
```

### Fluxo de Trabalho:
1. Criar branch: `feat/typography-tokens-stats-manual`
2. Executar etapas pequenas
3. Validar após cada etapa
4. Gerar MANIFEST
5. Criar PR com template


