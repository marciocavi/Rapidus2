# Rapidus — Site Administrativo

Este é o projeto Rapidus, um site com painel administrativo para gerenciar configurações dinâmicas.

## 🚀 Funcionalidades

- **Painel Administrativo**: Acesse `/admin/settings` para gerenciar o site
- **Seções Dinâmicas**: Habilite/desabilite seções do site em tempo real
- **Tema Personalizável**: Altere cores e fontes do site
- **Configuração Segura**: Salva em arquivo JSON ou localStorage

## 🛠 Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Zod (validação)

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração

### Variável de Ambiente

Para permitir salvamento no servidor, crie um arquivo `.env.local` na raiz do projeto:

```bash
ALLOW_ADMIN_WRITE=true
```

**Importante**: Sem esta variável, as configurações são salvas apenas no localStorage do navegador.

## 🚀 Execução

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## 📋 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run typecheck` - Verificação de tipos

## 🎨 Uso do Painel Administrativo

1. Acesse `http://localhost:3000/admin/settings`
2. Configure as seções que deseja exibir/ocultar
3. Personalize as cores do tema
4. Escolha a fonte principal
5. Clique em "Salvar Configuração"

### Seções Disponíveis

- Header
- Banner
- Portfolio
- Planos
- Sobre
- Contatos
- Instagram
- Parceiros
- Blog
- Footer

### Cores Padrão

- **Primária**: #0b2743 (Navy)
- **Secundária**: #2AAA48 (Verde)
- **Botões**: #2E6BD6 (Azul)
- **Amarelo**: #FFC72C
- **Branco**: #FFFFFF

## 🔒 Segurança

- O painel administrativo não possui autenticação neste MVP
- As configurações são validadas com Zod
- O salvamento no servidor só funciona com `ALLOW_ADMIN_WRITE=true`

## 📁 Estrutura do Projeto

```
web/
├── src/
│   ├── app/
│   │   ├── admin/settings/     # Painel administrativo
│   │   ├── api/admin/settings/ # API para configurações
│   │   └── page.tsx            # Página principal
│   ├── context/
│   │   └── SiteConfigContext.tsx # Contexto de configuração
│   └── lib/
│       └── site-config.ts      # Schema e funções de configuração
├── data/
│   └── site.json               # Arquivo de configuração
└── tailwind.config.ts          # Configuração do Tailwind
```

## 🧪 Testes

```bash
npm run typecheck  # Verificação de tipos
npm run lint       # Verificação de código
npm run build      # Build de produção
```

## 📝 Licença

Este projeto é privado e confidencial.
