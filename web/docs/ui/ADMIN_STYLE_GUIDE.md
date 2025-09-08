# Admin Modern UI – Style Guide (v1)

## 0. Conceito
Visual moderno para o Admin com base em Material 3 + Fluent + toque de glassmorphism (Apple). Foco em: legibilidade, profundidade, contraste, acessibilidade e reversibilidade via flag.

## 1. Grid & Layout
- Base 8 px (multiplicadores).
- Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536.
- Shell:
  - Topbar: 56 px (mobile) / 64 px (desktop).
  - Sidebar: 280 px fixa ≥ lg; off-canvas < lg com overlay + blur.
  - Content: largura máx. 1200 px; padding 24–32 px desktop, 16–20 px mobile.
- Formulários:
  - ≥ xl: 2 colunas (70/30) – conteúdo / meta.
  - < xl: 1 coluna.
  - Espaçamento vertical entre Panels: 24 (mobile) / 32 (desktop).

## 2. Hierarquia e elevação
- Surface base: sem sombra.
- Card/Panel: shadow-2 + borda 1px rgba(255,255,255,.08) + raio 12–16 px.
- Popovers/Dropdowns: shadow-3.
- Foco: outline 2 px com cor de acento + offset 1 px.

## 3. Tipografia
- Família: Inter (fallback: system-ui, -apple-system, Segoe UI, Roboto).
- Escala (desktop): Display 32/40, H1 24/32, H2 20/28, H3 18/26, Body 16/24, Label 14/20, Micro 12/16.
- Pesos: títulos 600/700; corpo 400/500. Line-height 1.35–1.5 (nunca < 1.3).

## 4. Cores (modo escuro) e gradientes
- `--bgBase: #0E1116`
- `--bgSidebar: #0B1320`
- `--bgTopbar: #0F1B2D`
- `--textPrimary: #E6F0FF`
- `--textSecondary: #9DB4D3`
- Acento: `--accentA: #2E68D6`, `--accentB: #9C4DFF`
- Estados: `--success: #2ECC71`, `--warning: #F4C000`, `--danger: #FF5A5F`
- Gradientes:
  - `--gradPrimary: linear-gradient(135deg, var(--accentA), var(--accentB))`
  - `--gradSurface: radial-gradient(closest-side, #101828, #0B1320)`

## 5. Sombras, raio e bordas
- `--shadow-1: 0 1px 2px rgba(0,0,0,.25)`
- `--shadow-2: 0 8px 24px rgba(0,0,0,.35)`
- `--shadow-3: 0 24px 60px rgba(0,0,0,.45)`
- Raio: xs 8, sm 10, md 12, lg 16.
- Bordas em superfícies: 1px rgba(255,255,255,.08) (efeito glass leve).

## 6. Componentes (comportamento)
- **Panel/Card**: título + descrição; hover ↑ elevação; active ↓ elevação; footer com CTAs.
- **Field** (input/select/textarea): altura 40–44 px; raio 10 px; borda 1px rgba(255,255,255,.12); focus com outline 2px acento; erro com `--danger` + hint.
- **Toggle**: trilho 44×24; knob 20; animação spring leve; estados ON/OFF nítidos.
- **Button**: variantes `primary` (gradiente), `tonal` (preenchimento sutil), `ghost` (sem borda). Altura 40–44 px; ícone 20–22 px.
- **Tabs**: underline ativo com acento; foco visível.
- **Tabela/Lista**: header sticky, zebra opcional; ícones de ação com tooltip.
- **Toasts**: canto inferior direito; cores por estado; auto-dismiss 4–6 s.

## 7. Acessibilidade & Motion
- Contraste mínimo 4.5:1.
- Navegação por teclado com ordem lógica; skip-link para conteúdo.
- `prefers-reduced-motion` respeitado; transições 160–220 ms (easing cubic-bezier(0.2,0.8,0.2,1)).

## 8. Padrões de página (Admin)
- Header: título + breadcrumb opcional + ações (Salvar/Pré-visualizar) à direita.
- Footer de formulário: sticky opcional com **Salvar/Cancelar**.
- Empty states: ícone + frase curta + ação.
- Loading: skeletons; evitar spinners longos.

## 9. Regras de consistência (NÃO FAZER)
- Não usar cores hardcoded fora dos tokens.
- Não alterar rotas/props; camada de apresentação apenas.
- Não reduzir contraste por estética.
- Não inserir libs pesadas sem justificar.

## 10. Flag e Rollback
- Ativação por env: `NEXT_PUBLIC_MODERN_ADMIN_UI=1`.
- O layout aplica estilos apenas quando `data-modern-admin="1"` no contêiner raiz.
- Rollback: setar flag para `0` ou remover o atributo; layout antigo permanece intacto.


