# DECISIONS.md — Rapidus Project

Este documento registra as decisões arquiteturais e tecnológicas do projeto **Rapidus**.  
Toda mudança relevante deve ser adicionada aqui, com data, motivo e impacto.

---

## 📌 Decisões Iniciais

- **2025-09-03**:  
  **Stack Base** definida como:  
  - Next.js 14 (App Router)  
  - TypeScript (strict)  
  - TailwindCSS  
  - shadcn/ui (UI components)  
  - Prisma (ORM, PostgreSQL preferencial, SQLite em dev)  
  - NextAuth (autenticação: email/password + OAuth Google opcional)  
  - Cloudinary (upload/otimização de imagens)  

- **2025-09-03**:  
  **Admin próprio** para gestão do site:  
  - Habilitar/desabilitar seções  
  - Alterar textos, subtítulos, alinhamento e cores  
  - Inserir imagens (com ajuste automático ao padrão do site)  
  - Controle de botões (cor/estilo)  

- **2025-09-03**:  
  **Seções obrigatórias no site público**:  
  - Header  
  - Hero (banner com título chamativo)  
  - Portfólio (cards clicáveis em carrossel + popup de imagens)  
  - Planos (em cards)  
  - Sobre a empresa  
  - Contatos  
  - Instagram (links)  
  - Parceiros  
  - Blog (com geração via IA)  
  - Footer  

---

## 📌 Futuras Considerações
- Multi-tenant (se necessário)  
- Editor de foco de imagem no Admin  
- Reordenação de seções via drag & drop  
- MDX components (CTAs, galerias, posts ricos)  
- SEO: Search + Sitemap automático  

---

**⚠️ Regra:** Nenhuma biblioteca/framework novo deve ser adicionado sem antes registrar a decisão aqui.

