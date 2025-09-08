# Admin Modern UI - Guia de Implementação

## 🎨 Visão Geral

O Admin Modern UI é um sistema de design baseado em Material 3 + Fluent + Glassmorphism que oferece uma interface administrativa moderna e acessível, com ativação controlada por flag.

## 📁 Arquivos Criados

- `docs/ui/ADMIN_STYLE_GUIDE.md` - Guia completo de estilo e padrões
- `src/design/theme/modern-admin.css` - Tema CSS com variáveis e componentes
- `src/components/admin/ui/Shell.tsx` - Componente Shell principal
- `src/components/admin/ui/ShellExample.tsx` - Exemplo de uso

## 🚀 Como Implementar

### 1. Importar o CSS no Layout do Admin

```tsx
// app/admin/layout.tsx
import '@/design/theme/modern-admin.css';
```

### 2. Configurar Variável de Ambiente

```bash
# .env.local
NEXT_PUBLIC_MODERN_ADMIN_UI=1
```

### 3. Usar o Shell Component

```tsx
import Shell from '@/components/admin/ui/Shell';

export default function AdminPage() {
  const modern = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI === '1';

  return (
    <Shell
      modern={modern}
      topbar={<div>Logo e ações</div>}
      sidebar={<nav>Navegação</nav>}
    >
      {/* Conteúdo da página */}
    </Shell>
  );
}
```

## 🎯 Classes CSS Disponíveis

### Layout
- `.adm-shell` - Container principal
- `.adm-topbar` - Barra superior
- `.adm-sidebar` - Barra lateral
- `.adm-content` - Área de conteúdo

### Componentes
- `.adm-panel` - Painel/Card
- `.adm-panel__header` - Cabeçalho do painel
- `.adm-panel__body` - Corpo do painel
- `.adm-panel__footer` - Rodapé do painel

### Formulários
- `.adm-field` - Container de campo
- `.adm-label` - Label do campo
- `.adm-input` - Input de texto
- `.adm-textarea` - Textarea
- `.adm-select` - Select
- `.adm-hint` - Texto de ajuda
- `.adm-error` - Texto de erro

### Botões
- `.adm-btn` - Botão base
- `.adm-btn--primary` - Botão primário (gradiente)
- `.adm-btn--tonal` - Botão tonal
- `.adm-btn--ghost` - Botão fantasma

### Outros
- `.adm-toggle` - Toggle switch
- `.adm-tabs` - Container de tabs
- `.adm-tab` - Tab individual

## 🎨 Variáveis CSS Disponíveis

```css
/* Cores */
--bgBase: #0E1116
--bgSidebar: #0B1320
--bgTopbar: #0F1B2D
--textPrimary: #E6F0FF
--textSecondary: #9DB4D3
--accentA: #2E68D6
--accentB: #9C4DFF

/* Sombras */
--shadow-1: 0 1px 2px rgba(0,0,0,.25)
--shadow-2: 0 8px 24px rgba(0,0,0,.35)
--shadow-3: 0 24px 60px rgba(0,0,0,.45)

/* Raios */
--radius-xs: 8px
--radius-sm: 10px
--radius-md: 12px
--radius-lg: 16px
```

## 🔄 Ativação/Desativação

### Ativar Modern UI
```bash
NEXT_PUBLIC_MODERN_ADMIN_UI=1
```

### Desativar Modern UI
```bash
NEXT_PUBLIC_MODERN_ADMIN_UI=0
```

## 📱 Responsividade

- **Desktop (≥1024px)**: Layout com sidebar fixa
- **Mobile (<1024px)**: Layout em coluna única
- **Breakpoints**: sm 640px, md 768px, lg 1024px, xl 1280px

## ♿ Acessibilidade

- Contraste mínimo 4.5:1
- Navegação por teclado
- Respeita `prefers-reduced-motion`
- Focus visível em todos os elementos interativos

## 🎭 Efeitos Visuais

- **Glassmorphism**: Backdrop blur e transparências
- **Elevação**: Sombras progressivas
- **Hover**: Transformações suaves
- **Gradientes**: Backgrounds com gradientes sutis

## 🔧 Customização

Para customizar cores ou espaçamentos, modifique as variáveis CSS em `modern-admin.css`:

```css
[data-modern-admin="1"] {
  --accentA: #sua-cor-aqui;
  --accentB: #sua-cor-aqui;
}
```

## 📋 Checklist de Implementação

- [ ] Importar `modern-admin.css` no layout do admin
- [ ] Configurar variável de ambiente `NEXT_PUBLIC_MODERN_ADMIN_UI`
- [ ] Envolver páginas admin com componente `Shell`
- [ ] Substituir classes CSS antigas pelas novas (`adm-*`)
- [ ] Testar responsividade em diferentes dispositivos
- [ ] Verificar acessibilidade e contraste
- [ ] Testar ativação/desativação da flag

## 🚨 Importante

- O Modern UI só é aplicado quando `data-modern-admin="1"` está presente
- Não altera rotas ou props - apenas visual
- Rollback seguro: basta desativar a flag
- Mantém compatibilidade com layout existente


