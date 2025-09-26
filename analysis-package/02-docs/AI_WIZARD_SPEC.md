# Wizard IA Onboarding – Especificação Funcional e de Segurança

Você é um assistente de engenharia cuidadoso. Sua missão é implementar um Wizard orientado de criação de sites com IA sem quebrar nada do projeto atual. NUNCA sobrescreva ou apague arquivos existentes sem criar cópias e PRs separados. Siga à risca as regras de segurança abaixo e o escopo funcional.

## 0) Regras de segurança (obrigatórias)

- Crie uma branch: feature/wizard-ia-onboarding.
- Não modifique arquivos críticos existentes sem:
  - criar arquivos novos com sufixo -wizard quando for UI nova, ou
  - aplicar alterações encapsuladas atrás de feature flag: WIZARD_IA_ONBOARDING=true.
- Toda config sensível em .env.local.example (nunca commitar .env.local):
  - OPENAI_API_KEY=
  - INSTAGRAM_SCRAPER_ENDPOINT= (se for usar)
- Adicione rotas e componentes novos em pastas próprias; não renomeie pastas antigas.
- Inclua testes mínimos (smoke tests) e rodar lint/format antes de finalizar.
- Entregue tudo via Pull Request com checklist de testes e migrações.

## 1) Stack e libs (use as existentes se já houver, caso contrário adicionar)

- Next.js 14+ (App Router)
- TypeScript, React 18
- TailwindCSS
- shadcn/ui (Button, Card, Input, Checkbox, Tabs, Progress, Dialog, Sheet, Select, Toggle)
- react-hook-form + zod (validação incremental por etapa)
- Zustand ou Context API para estado do wizard (persistência em localStorage com fallback in-memory)
- Lucide-react (ícones)
- (Opcional) color-extractor para paleta da logo
- Playwright (teste e2e básico), Vitest (teste unitário), Testing Library (componentes)

## 2) Estrutura de pastas (nova)

```
/app
  /wizard
    /components
      StepWelcome.tsx
      StepIdentity.tsx
      StepIndustry.tsx
      StepBrand.tsx
      StepStyle.tsx
      StepInspiration.tsx
      StepSections.tsx
      StepContacts.tsx
      StepPreview.tsx
      StepReview.tsx
      WizardHeader.tsx
      WizardFooter.tsx
      LivePreviewFrame.tsx
      SectionCard.tsx
      ColorPicker.tsx
      FontPicker.tsx
      WizardProgress.tsx
    /_state
      wizardStore.ts
    /_schemas
      brandSchema.ts
      sectionsSchema.ts
      contactsSchema.ts
      styleSchema.ts
      identitySchema.ts
      inspirationSchema.ts
      reviewSchema.ts
      index.ts
    /_utils
      palette.ts
      instagram.ts
      previewSerializer.ts
      debounce.ts
    page.tsx
    layout.tsx
/lib
  ai/
    generateCopy.ts
    mapStyleToTokens.ts
  preview/
    renderConfigToPreview.tsx
/tests
  wizard.spec.ts
```

## 3) Rotas e navegação

- Rota: /wizard (App Router).
- Header do wizard com Progress bar (0–100%), etapas numeradas, botão “Sair e salvar rascunho”.
- Rodapé com Botões: Voltar / Próximo / Pular etapa / Salvar rascunho / Publicar.
- Teclas de atalho: Alt+→ (próximo), Alt+← (voltar).

## 4) Etapas do Wizard (UX/IX)

Objetivo: perguntas simples, visuais, com feedback imediato + preview ao lado.

- Boas-vindas (StepWelcome)
  - Texto curto, CTA “Começar”.
  - Checkbox “Pular dicas no futuro”.

- Identidade (StepIdentity)
  - Campo: Nome da empresa/projeto (obrigatório).
  - Campo: Slogan (opcional).
  - Validação com zod.

- Área de atuação (StepIndustry)
  - Input com auto-sugestões (ex.: Moda, Gastronomia, Serviços Automotivos…).
  - Dica: “Isso ajuda a IA a sugerir seções e tom de voz.”

- Marca (StepBrand)
  - Upload de logo (arrastar/soltar + paste).
  - Toggle: “Usar as cores da logo?” → se “não”, abrir ColorPicker com 5 sugestões + custom.
  - Extrair paleta (se logo enviada) e mostrar 3 paletas derivadas para 1-clique.

- Estilo & Tipografia (StepStyle)
  - Cards de estilos: Minimalista, Moderno, Clássico, Neon (com mini-preview).
  - FontPicker com preview: títulos e parágrafos (escolhas simples: “forte”, “legível”, “sofisticado”).
  - Mapear escolhas para design tokens (ver item 8).

- Inspiração (StepInspiration)
  - Campo para username/URL do Instagram (opcional) e/ou site de referência.
  - Tooltip: “Usaremos para tonalidade de texto, imagens e seções sugeridas.”
  - (Se endpoint configurado) botão “Analisar perfil” com loading state.

- Seções (StepSections)
  - Lista de cards com preview + checkbox (Hero, Carrossel, Produtos/Portfólio, Contatos, Blog, Depoimentos, Ícones Flutuantes).
  - Ao marcar, abrir config rápida: por ex. Hero → título, subtítulo, CTA.
  - Validação: ao menos 1 seção.

- Contatos e Redes (StepContacts)
  - Campos: WhatsApp, Telefone, E-mail, Instagram, Endereço.
  - Máscaras e validações regionais simples.

- Preview (StepPreview)
  - LivePreviewFrame ao lado (fixo em telas largas; em mobile, aba “Preview”).
  - Atualiza a cada mudança, debounce 300ms.
  - Botões: “Editar seções”, “Continuar”.

- Revisão (StepReview)
  - Resumo de escolhas (logo, paleta, estilo, fontes, seções, contatos).
  - Botões: Publicar site, Salvar rascunho, Voltar e editar.
  - Ao publicar, chamar função stub renderConfigToPreview e retornar sucesso.

## 5) Estado e tipos (TypeScript)

WizardState:

```ts
export type Palette = { primary: string; secondary: string; accent: string; neutral: string; background: string };
export type Typography = { heading: string; body: string };
export type SectionKey = 'hero'|'carousel'|'portfolio'|'contacts'|'blog'|'testimonials'|'floatingIcons';

export interface WizardState {
  identity: { name: string; slogan?: string };
  industry?: string;
  brand: { logoUrl?: string; useLogoColors: boolean; palette: Palette };
  style: { theme: 'minimal'|'modern'|'classic'|'neon'; typography: Typography };
  inspiration?: { instagram?: string; website?: string };
  sections: Record<SectionKey, { enabled: boolean; config?: Record<string, unknown> }>;
  contacts: { whatsapp?: string; phone?: string; email?: string; instagram?: string; address?: string };
  dirty: boolean;
  stepIndex: number;
}
```

Persistir em localStorage com chave wizardState@v1.

## 6) Acessibilidade & IX

- Foco visível, aria-live para mensagens de validação.
- Labels claros, ajuda contextual em tooltips.
- Componentes com alvo mínimo de toque 44px.
- Indicador de passo atual e total (ex.: “Passo 4 de 10”).
- Estados: carregando, sucesso, erro (com mensagens claras).

## 7) Preview em tempo real

- LivePreviewFrame recebe o estado serializado e renderiza miniatura responsiva.
- Em mobile, transicionar para aba exclusiva “Preview”.
- Debounce 300ms para evitar flicker.

## 8) Design tokens (gerados a partir do estilo)

Criar helper mapStyleToTokens.ts:

```ts
export type DesignTokens = {
  color: { bg: string; text: string; primary: string; secondary: string; accent: string; card: string; border: string };
  radius: { sm: string; md: string; xl: string; '2xl': string };
  shadow: { soft: string; md: string; glow: string };
  typography: { heading: string; body: string };
};
```

- Neon deve incluir sombra “glow” sutil para CTAs.
- Aplicar tokens nos componentes de preview.

## 9) Geração de texto por IA (stub)

- Criar /lib/ai/generateCopy.ts com função generateHeroCopy(industry, style) que por enquanto retorna mock (sem chamar API).
- Deixar marcado o ponto exato para futura integração com OPENAI_API_KEY.

## 10) Integrações externas (stubs)

- /app/wizard/_utils/instagram.ts: função analyzeInstagram(username) retorna mock com paleta sugerida e temas.
- Documentar como plugar um scraper/SDK real (apenas comentário).

## 11) Testes (mínimo viável)

Smoke (Vitest/Testing Library):
- Rende rizar /wizard sem erros.
- Avançar e voltar de etapas mantém estado.
- Selecionar seções marca no estado.

E2E (Playwright):
- Fluxo básico: preencher nome → escolher paleta → selecionar Hero/Contatos → preview atualiza → revisão → “Salvar rascunho”.

## 12) Comandos (adicionar no README)

Instalação/ajustes:

```
npm i react-hook-form zod zustand lucide-react
npm i -D @playwright/test vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Scripts (package.json):

```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "lint": "next lint",
    "format": "prettier --write .",
    "smoke:wizard": "vitest run tests/wizard.spec.ts"
  }
}
```

## 13) Critérios de aceitação (UX/IX)

- O usuário nunca cai em tela vazia: sempre há instruções ou exemplos visuais.
- Cada etapa tem no máx. 1–2 decisões principais.
- Preview responde às mudanças em ≤ 300ms (após debounce).
- Teclas de atalho funcionam (Alt+→ / Alt+←).
- Estado persiste ao recarregar página.
- A11y: foco visível; leitura por screen reader nos feedbacks.
- PR inclui capturas do wizard (desktop e mobile) e vídeo curto do fluxo.

## 14) Entregáveis no PR

- Código do wizard em /app/wizard/**.
- Testes rodando (unitário e e2e básico configurado).
- README curto em /app/wizard/README.md com:
  - Como ligar o feature flag WIZARD_IA_ONBOARDING.
  - Scripts úteis (dev, test, smoke).
  - Pontos de integração futura (IA real, Instagram real).
- Importante: Se encontrar colisão com nomes/rotas existentes, não alterar os existentes; prefira sufixos -wizard e/ou sub-rotas.

## ✅ Checklist de QA para o Wizard IA Onboarding

### 1) Porta de entrada / Segurança
- Feature flag WIZARD_IA_ONBOARDING controla acesso (on/off sem quebrar rotas).
- Branch isolada feature/wizard-ia-onboarding; nenhum arquivo crítico sobrescrito.
- .env.local não versionado; .env.local.example atualizado.
- Navegar direto para /wizard com flag off → redireciona / bloqueia com mensagem clara.

### 2) Fluxo principal (happy path)
- StepWelcome: onboarding + CTA “Começar”. Checkbox “Pular dicas” persiste.
- StepIdentity: Nome obrigatório; “Próximo” só com nome válido.
- StepIndustry: auto-sugestões com teclado.
- StepBrand: upload por clique/drag/paste; toggle “Usar cores da logo”; paletas sugeridas.
- StepStyle: estilos mudam tokens; FontPicker reflete no preview.
- StepInspiration: Instagram/site opcionais; “Analisar” com loading (mock).
- StepSections: selecionar Hero + Contatos; config rápida ao marcar.
- StepContacts: máscaras e validação simples.
- StepPreview: preview atualiza ≤ 300ms; mobile em aba “Preview”.
- StepReview: resumo correto; “Salvar rascunho” persiste; “Publicar site” (stub) confirma.

### 3) Navegação & Estado
- Voltar/Próximo funcionam com mouse e atalhos Alt+← / Alt+→.
- Pular etapa mantém consistência do estado.
- Salvar rascunho grava em localStorage; recarregar restaura 100%.
- Ao sair com alterações, confirmação (dirty state).

### 4) Validação & Erros
- Mensagens claras, curtas e com aria-live.
- Upload inválido → erro controlado.
- Instagram/URL inválidos → aviso não-bloqueante.
- Falha no “Analisar” (mock) → fallback com instrução.

### 5) Acessibilidade (A11y)
- Foco visível; labels associadas; aria-describedby nos erros.
- Ordem de tabulação lógica; Escape fecha dialogs.
- Alvos de toque ≥ 44px; contraste AA.

### 6) UX/IX de preview
- Sem flicker (debounce ~300ms). Estilos/paletas/tipografia refletem tokens (glow sutil em Neon). Miniaturas fiéis. Em telas < 768px, abas (Conteúdo | Preview).

### 7) Design tokens
- mapStyleToTokens aplica corretamente color/radius/shadow/typography. Tema Neon com glow sutil apenas em CTAs. Troca de fontes atualiza typography.heading/body no preview.

### 8) Persistência & Resiliência
- localStorage chave wizardState@v1; estado inválido recupera com defaults; migração documentada.

### 9) Performance
- TTI aceitável; sem jank perceptível; imagens da logo otimizadas no preview.

### 10) Cross-device / Cross-browser
- Desktop/Tablet/Mobile + Chrome/Firefox/Safari.

### 11) Testes automatizados (mínimos)
- Unitários: render /wizard, navegação steps, seleção de seções, persistência básica.
- E2E (Playwright): fluxo completo happy path.
- smoke:wizard no CI sem falhas.

### 12) Telemetria & Logs (opcional)
- Eventos: start wizard, step change, save draft, publish. Sem dados sensíveis.

### 13) Conteúdo gerado por IA (stubs)
- generateHeroCopy() retorna placeholder coerente. Sem consumo real de API sem OPENAI_API_KEY.

### 14) Integrações externas (stubs)
- analyzeInstagram() retorna mock previsível (sem chamadas externas). Comentários explicam integração real.

