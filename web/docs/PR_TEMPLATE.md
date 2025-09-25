# Implementação: Tipografia por Tokens + Stats manuais

## Checklist de Implementação
- [ ] Tokens globais em `src/theme/tokens.ts`
- [ ] CSS vars em `src/styles/theme.css` (inclui dark/light)
- [ ] Util `textStyleToClass` em `src/utils/textStyle.ts`
- [ ] Picker em `src/components/admin/TextStylePicker.tsx`
- [ ] Campos JSON `styles` nas seções (Hero, Stats)
- [ ] API /api/stats {GET, POST, PATCH, DELETE, reorder}
- [ ] Admin Stats com dnd-kit + prévia + export/import
- [ ] Render Stats responsivo, contador condicional
- [ ] Testes `tests/textStyle.spec.ts` e `tests/stats-api.spec.ts`
- [ ] A11y (contraste AA) verificado

## Validações automáticas
- [ ] `npm run validate:cursor` passou
- [ ] `npm test` passou

## MANIFEST (gerado pelo agente)
- Arquivos criados/alterados + trechos relevantes

## Checklist de Qualidade
- [ ] Nenhum TODO/placeholder deixado
- [ ] Compatibilidade de schema preservada
- [ ] Valores HEX substituídos por tokens
- [ ] Testes passando 100%
- [ ] Validação automática passando

## Como Testar
1. `npm run validate:cursor` - Verifica especificação
2. `npm test` - Executa testes
3. `npm run dev` - Testa interface admin
4. Verificar acessibilidade com DevTools

## Rollback
```bash
git checkout main
git branch -D feat/typography-tokens-stats-manual
```

## Arquivos Críticos
- `spec.yml` - Especificação completa
- `tools/validate-cursor.mjs` - Validador automático
- `docs/MANIFEST.md` - Log de alterações


