# Rapidus — Visual Change Guardrails for Cursor (v1)

> **Objetivo**: este arquivo funciona como instrução permanente para o Cursor ao alterar qualquer aspecto **visual** (site e painel admin). Garante **consistência**, **acessibilidade** e **segurança** sem regressões.

## 0) Como usar

* **Sempre ler** este arquivo antes de tocar em estilos, tokens ou componentes.
* **Nunca** editar arquivos de vendors (Radix/shadcn). Use **wrappers** em `components/ui/*` e **tokens** em `lib/tokens.ts`.
* Antes de abrir PR: execute os **checklists** (Seções 5 e 6).

---

## 1) Stack canônica

* Tailwind CSS, Radix UI Primitives, shadcn/ui, Lucide Icons.
* React Hook Form + Zod (forms), TanStack Table (tabelas), Recharts (gráficos), Framer Motion (animações leves).

---

## 2) Fonte única da verdade — Tokens

* Arquivo: `lib/tokens.ts` (ou CSS vars em `styles/tokens.css`).
* É **proibido** hardcode de cores/sombras/radii em componentes.
* Tokens mínimos:

  * `neutrals`: `bg`, `surface`, `surfaceAlt`, `onSurfaceHigh`, `onSurface`, `onSurfaceLow`, `border`, `overlay`.
  * `accents`: `violet`, `cyan`, `lime`, `amber`, `pink`, `teal` (cada um com `base`, `hover`, `muted`).
  * `semantic`: `primary`, `secondary`, `info`, `success`, `warning`, `danger` mapeados para `accents`.
  * `charts`: `categorical`, `sequentialBlue`, `diverging`.

---

## 3) Tema do Admin (dark + colorido, seguro)

* **Modo dark por padrão** no admin. Claro opcional.
* Em **cada tela**, use **no máximo 2 acentos** (ex.: `primary=violet`, `secondary=teal`).
* Texto sempre com contraste **AA** mínimo (4.5:1) e **focus ring** visível (`outline-offset: 2px`).
* Gradientes apenas suaves em headers/hero; **nunca** em áreas de leitura longa.
* Animações: 120–180ms, `opacity/transform`, sem `blur` pesado.
* Charts: use `charts.categorical` na ordem; tooltips/legendas com `neutrals.surface`.

### Exemplos rápidos

* **Button/primary**: bg `semantic.primary.base`; hover `semantic.primary.hover`; texto `onSurfaceHigh`.
* **Card**: bg `neutrals.surface`; borda `neutrals.border`; variante accented com leve `shadow-glow` baseado no `primary`.
* **Badge**: fundo `semantic.*.muted`; texto `semantic.*.base`.

---

## 4) Preservação de Estruturas - REGRA CRÍTICA

> **⚠️ ATENÇÃO**: Esta é uma regra de segurança obrigatória para evitar perda de funcionalidades durante atualizações.

### 4.1) Checklist de Preservação de Estruturas

**ANTES de qualquer atualização, SEMPRE:**

1. **Mapear estrutura atual**:
   - Listar todas as seções/páginas existentes
   - Identificar todas as funcionalidades ativas
   - Documentar dependências entre componentes

2. **Verificar integridade**:
   - Confirmar que todas as seções estão presentes após mudanças
   - Validar que nenhuma funcionalidade foi removida acidentalmente
   - Testar que todas as rotas/páginas ainda funcionam

3. **Aplicar verificações de segurança**:
   ```typescript
   // SEMPRE incluir verificações de segurança
   if (!config || !config.theme || !config.content) {
     return <LoadingState />;
   }
   
   // SEMPRE verificar existência de propriedades
   if (config.sections?.hero?.enabled) {
     // renderizar seção
   }
   ```

### 4.2) Padrões de Atualização Segura

**Para atualizações de páginas/componentes:**

1. **Backup da estrutura atual**:
   - Ler arquivo completo antes de modificar
   - Identificar todas as seções existentes
   - Preservar todas as funcionalidades

2. **Atualização incremental**:
   - Modificar uma seção por vez
   - Testar após cada mudança
   - Não remover seções sem confirmação explícita

3. **Validação pós-atualização**:
   - Verificar que todas as seções estão presentes
   - Confirmar que todas as imagens estão carregando
   - Testar todas as interações

### 4.3) Exemplos de Estruturas que DEVEM ser preservadas

**Página Principal (`app/page.tsx`):**
- ✅ Hero Section
- ✅ Features Section  
- ✅ Services Section
- ✅ Parceiros Section
- ✅ Instagram Section
- ✅ Blog Section
- ✅ CTA Section
- ✅ Stats Section

**Sistema de Configuração:**
- ✅ Todas as seções devem usar `config.sections.*.enabled`
- ✅ Todas as imagens devem usar `config.images.*`
- ✅ Todos os textos devem usar `config.content.*`

### 4.4) Red Flags - Sinais de Perda de Estrutura

**Se você encontrar estes sinais, PARE e corrija:**

- ❌ Seções que existiam antes não aparecem mais
- ❌ Imagens não carregam (URLs quebradas)
- ❌ Erros de "property does not exist"
- ❌ Componentes que não renderizam
- ❌ Funcionalidades que pararam de funcionar

### 4.5) Procedimento de Recuperação

**Se uma estrutura foi perdida:**

1. **Identificar o que foi perdido**
2. **Restaurar imediatamente** usando o sistema de configuração
3. **Aplicar verificações de segurança**
4. **Testar completamente**
5. **Documentar a correção**

---

## 5) Convenções de implementação

* Wrappers de UI em `components/ui/*` (Button, Input, Card, Dialog, Badge, Tabs…).
* Site vs Admin: componentes em `components/site/*` e `components/admin/*` herdam dos wrappers.
* Nunca importar estilos diretos no componente; usar Tailwind com classes centralizadas e CSS vars.
* Strings em dicionário i18n; sem literais soltos.

---

## 6) Checklist Rápido (pré-commit)

* [ ] **Tokens**: zero hardcode; claro/escuro atualizados; contraste **AA** garantido.
* [ ] **A11y**: foco visível em todos controles; ordem de tab cobre fluxo; `aria-*`/labels corretos.
* [ ] **Responsivo**: `sm/md/lg/xl`; sem rolagem horizontal; imagens com `sizes/aspect-ratio`.
* [ ] **Estados**: loading com skeleton (>300ms), erro acionável, estado vazio com instrução.
* [ ] **Forms**: RHF+Zod; `aria-describedby` nos erros; máscaras/normalização quando preciso.
* [ ] **Performance**: `next/image` (ou equivalente); bundle da rota não cresce >10%.
* [ ] **i18n**: todas as strings extraídas.
* [ ] **Qualidade**: `eslint` e `tsc --noEmit` limpos; sem `console` sobrando.
* [ ] **Build/preview**: build prod ok; screenshots claro/escuro anexadas à PR.

---

## 7) Pós-mudança (QA)

* [ ] Screenshots batem (claro/escuro); hierarquia e espaçamentos ok.
* [ ] Navegação por teclado: `skip-to-content`, foco não preso em Dialog/Drawer.
* [ ] Browsers: Chrome/Edge/Firefox + iOS Safari; mobile com alvos ≥ 40px e safe areas.
* [ ] Fluxos-chave: Draft → Preview → Publish; upload mídia; editar planos; toggles de seções.
* [ ] Tabelas: sort/filter/pagination; column visibility; export CSV UTF‑8.
* [ ] Web Vitals (Home): LCP < 2.5s, INP < 200ms, CLS < 0.1.
* [ ] AXE: sem violações críticas; toasts têm live region.
* [ ] Falhas & Offline: mensagens claras; retry; fallback quando aplicável.
* [ ] Segurança: roles aplicadas; sem XSS; sem `dangerouslySetInnerHTML` inseguro.
* [ ] SEO/OG: title/meta/OG/twitter; sitemap/robots; canonical.
* [ ] Rollback: audit log registrou e rollback da última versão publicado funciona.

---

## 8) Proibido / Atenção

* ⛔ Hardcode de cores/gradientes/radii/sombras.
* ⛔ Alterar CSS de vendor (Radix/shadcn) diretamente.
* ⛔ Três ou mais acentos na mesma tela.
* ⛔ Gradiente ou fundo saturado atrás de texto longo.
* ⚠️ Animações longas ou que alteram layout (use transform/opacity).
* ⚠️ Texto sobre `muted` sem checar contraste.

---

## 9) Estrutura de pastas

```
app/(site)/**
app/admin/**
components/ui/**       // wrappers (único lugar que estiliza)
components/site/**     // composições específicas do site
components/admin/**    // composições do admin
lib/tokens.ts          // tokens visuais
styles/**              // globals + vars
```

---

## 10) Tailwind (extend) — guia

* `tailwind.config.ts` deve expor `colors.neutrals`, `colors.accent.*`, `colors.semantic` e `boxShadow.glow`.
* Habilitar `darkMode: 'class'` e aplicar `class` no `<html>` conforme o tema do usuário.

---

## 11) PR Template (cole em `.github/pull_request_template.md`)

```
## Objetivo
(Resumo da mudança visual e componentes/rotas afetados)

## Antes/Depois
- [ ] Screenshots **claro**
- [ ] Screenshots **escuro**

## Acessibilidade
- [ ] Contraste AA / Foco visível / Tab order

## Performance
- [ ] Bundle não aumentou >10% na rota alterada

## Checklists
- [ ] Pré-commit (Seção 5)
- [ ] Pós-mudança (Seção 6)

## Risco & Rollback
- Impacto conhecido:
- Plano de rollback:
```

---

## 12) Prompts prontos para o Cursor

### 12.1 "Aplique visual usando tokens, sem hardcode"

```
Siga **Rapidus — CURSOR_VISUAL_RULES.md** e **lib/tokens.ts**.
Tarefa: aplicar as cores/tipografia/espacamentos **somente via tokens** em [arquivo/alvo].
Crie/ajuste wrappers em `components/ui/*` se necessário, sem editar vendors.
Inclua estados (hover/focus/disabled/loading) e verifique contraste AA.
Atualize o playground `/admin/settings/ui` e gere screenshots claro/escuro.
```

### 12.2 "Tema de gráficos seguro"

```
Atualize os componentes de gráficos para usar `charts.categorical` e o tema de tooltip/legenda de `neutrals`.
Evite mais de 6 séries simultâneas no mesmo gráfico em mobile.
Inclua teste de daltônico (simulação) e export PNG/SVG.
```

### 12.3 "Verificação de acessibilidade"

```
Rode AXE no build local e corrija violações críticas.
Adicione `skip-to-content` se ausente.
Garanta `aria-label`/`aria-describedby` e foco visível em todos os controles.
```

### 12.4 "Preservação de estruturas - REGRA CRÍTICA"

```
⚠️ ATENÇÃO: Esta é uma regra de segurança obrigatória.

ANTES de qualquer atualização:
1. Mapear estrutura atual (todas as seções/páginas existentes)
2. Ler arquivo completo antes de modificar
3. Identificar todas as funcionalidades ativas
4. Preservar todas as seções sem confirmação explícita

DURANTE a atualização:
1. Modificar uma seção por vez
2. Aplicar verificações de segurança obrigatórias
3. Testar após cada mudança
4. Não remover seções sem confirmação explícita

APÓS a atualização:
1. Verificar que todas as seções estão presentes
2. Confirmar que todas as imagens estão carregando
3. Testar todas as interações
4. Validar que nenhuma funcionalidade foi removida

Se encontrar perda de estrutura: PARE e corrija imediatamente!
```

---

## 13) Versão e manutenção

* Este arquivo acompanha o repositório e **precisa ser lido pelo Cursor** antes de qualquer mudança visual.
* Atualize ao evoluir tokens/tema e registre no CHANGELOG.
