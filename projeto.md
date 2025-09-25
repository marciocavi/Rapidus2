# Rapidus — Project Base + Safety Pack (for Cursor)

This document is the **single source of truth** for building the new Rapidus website **with a built‑in Admin Panel** and a robust **Safety/Recovery workflow** tailored for use with **Cursor**. Paste the prompts below into Cursor when you start, and keep this file in the repo as `SAFETY.md` or `README.md`.

---

## 0) Visual Identity (from logo)

> Approximate palette extracted from the logo you shared. Adjust if you have exact brand codes.

* **Navy (bg):** `#0C2744`
* **White:** `#FFFFFF`
* **Green (stripe):** `#14A44D`
* **Yellow (flag):** `#FFC400`
* **Blue (flag):** `#2D7EC7`
* **Neutral Gray:** `#E6EAF0`

**Typography (suggestion):**

* Headings: `Montserrat` (700/800)
* Body/UI: `Inter` (400/500/600)

These will be theme tokens exposed in Admin to adjust fonts, sizes, and colors.

---

## 1) Architecture & Tech Choices

**Goal:** Marketing site + Admin to update content, theme, and section toggles, all **without redeploy**.

**Stack (recommended):**

* **Next.js 14+ (App Router) + TypeScript**
* **Prisma** ORM
* **Database**: PostgreSQL (prod) / SQLite (dev) via Prisma
* **Auth**: NextAuth (Email/Password; option Google OAuth)
* **UI**: TailwindCSS + **shadcn/ui** + **lucide-react**
* **Uploads**: Cloudinary (or S3) + `sharp`
* **Content Images Carousels**: `embla-carousel-react`
* **Blog with AI**: Route that drafts posts with OpenAI (admin-only)
* **Forms**: `react-hook-form` + `zod`
* **Icons**: `lucide-react`
* **CMS-like Admin**: custom pages under `/admin` (RBAC-ready)
* **Feature Flags**: section toggles stored in DB (no redeploy)
* **Telemetry**: Vercel Analytics (optional), Healthcheck route `/api/health`

**Why not a headless CMS?** You can, but custom admin keeps control tight and aligns with brand/theming needs.

---

## 2) Monorepo/Repo Layout

```
rapidus/
├─ .github/workflows/ci.yml
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ src/
│  ├─ app/
│  │  ├─ (site)/
│  │  │  ├─ page.tsx                 # Home
│  │  │  ├─ blog/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [slug]/page.tsx
│  │  │  └─ api/ai/draft/route.ts    # Admin-only: AI blog draft
│  │  ├─ admin/
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx                 # Dashboard
│  │  │  ├─ settings/page.tsx        # Theme, toggles
│  │  │  ├─ portfolio/page.tsx       # CRUD cards & images
│  │  │  ├─ plans/page.tsx           # CRUD plans
│  │  │  ├─ partners/page.tsx        # CRUD partners
│  │  │  └─ posts/page.tsx           # CRUD blog posts
│  │  └─ api/
│  │     ├─ upload/route.ts          # Upload to Cloudinary
│  │     └─ health/route.ts          # Healthcheck
│  ├─ components/                    # UI components
│  ├─ lib/                           # db, auth, utils
│  └─ types/
├─ public/
├─ .env.example
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md (this file)
```

---

## 3) Data Model (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = env("DATABASE_PROVIDER") // postgresql or sqlite
  url      = env("DATABASE_URL")
}

model SiteSettings {
  id            String  @id @default(cuid())
  siteName      String  @default("Rapidus")
  theme         Json    // {colors, fonts, sizes, radii, spacing}
  sections      Json    // visibility toggles per section
  hero          Json    // {title, subtitle, ctaText, ctaHref, bgImage}
  instagram     Json    // {links: string[]}
  contact       Json    // {phone, email, address, mapEmbedUrl}
  updatedAt     DateTime @updatedAt
  createdAt     DateTime @default(now())
}

model PortfolioItem {
  id        String   @id @default(cuid())
  title     String
  subtitle  String?
  images    Json     // string[] of image urls in order
  tags      String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Plan {
  id        String   @id @default(cuid())
  name      String
  price     Decimal  @db.Decimal(10,2)
  features  String[]
  isFeatured Boolean @default(false)
}

model Partner {
  id    String @id @default(cuid())
  name  String
  logo  String // url
  href  String?
}

model Post {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  excerpt   String?
  content   String   // MDX string
  cover     String?
  published Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model User {
  id       String  @id @default(cuid())
  name     String?
  email    String  @unique
  password String? // if using credentials
  role     Role    @default(ADMIN)
}

enum Role { ADMIN EDITOR }
```

**Seed Defaults (`prisma/seed.ts`)**

* Create 1 `SiteSettings` with brand tokens and all sections enabled
* Create 3 demo `PortfolioItem` entries with 3 images each
* Create 3 `Plan` cards
* Create 6 demo `Partner`s
* Create 1 admin user

---

## 4) Theme Tokens (editable in Admin)

```ts
// Example shape saved in SiteSettings.theme
{
  colors: {
    background: "#0C2744",
    foreground: "#FFFFFF",
    primary: "#2D7EC7",
    accent: "#14A44D",
    warning: "#FFC400",
    muted: "#E6EAF0",
    button: { bg: "#2D7EC7", text: "#FFFFFF", hover: "#2568A2" }
  },
  fonts: { heading: "Montserrat", body: "Inter" },
  text: { base: 16, h1: 48, h2: 36, h3: 28 },
  radius: { sm: 8, md: 16, lg: 24 },
  spacing: { sectionY: 96 }
}
```

**Section Toggles (editable in Admin)**

```ts
// Example shape saved in SiteSettings.sections
{
  header: true,
  hero: true,
  portfolio: true,
  plans: true,
  about: true,
  contact: true,
  instagram: true,
  partners: true,
  blog: true,
  footer: true
}
```

---

## 5) Admin Features (MVP)

* Login (email/password) -> Role: `ADMIN` or `EDITOR`
* **Settings**: theme tokens, section toggles, hero copy & images, contact info, Instagram links
* **Portfolio**: CRUD items + **multi-image upload** + **carousel order**
* **Plans**: CRUD plan cards, mark `isFeatured`
* **Partners**: CRUD logos/links
* **Blog**: CRUD posts (MDX) + **Draft with AI** (admin-only) using OpenAI
* All changes are saved in DB and **reflected immediately** on the site (no redeploy)

---

## 6) Security & No‑Code Safety Pack (Cursor)

### 6.1 Cursor **System Prompt** (paste as first message in a new Cursor chat)

```
You are the lead engineer for the Rapidus project. Follow these rules strictly:
1) Never modify more than one focused area per PR. Use small, atomic commits.
2) Before changing files, run `git status` and list intended edits.
3) Never delete working code without first creating a backup branch and a `changeset.md` diff summary.
4) Preserve environment and secrets. If `.env` keys are needed, request placeholders and update `.env.example` only.
5) Keep types safe (TypeScript strict). Add/adjust zod schemas with any API or form change.
6) If a test, lint, or type check fails, STOP and revert the last step or open a hotfix branch.
7) When unsure, propose a plan in a comment block, wait for confirmation, then implement.
8) Do not introduce new frameworks unless approved in `DECISIONS.md`.
9) Always update relevant docs (README/SAFETY.md) when behavior changes.
10) After any DB schema change: create Prisma migration + run/verify `prisma migrate dev` and `prisma db push` only in dev; never auto-run in prod.
```

### 6.2 Cursor **Task Prompt Template** (use whenever you ask Cursor to code)

```
TASK: <clear, small task>
CONTEXT: Rapidus repo described in README. Keep to Next.js 14, Prisma, Tailwind, shadcn/ui.
CONSTRAINTS:
- Make minimal changes.
- Create a new branch: <feature/short-name>
- Add/modify tests or zod validations where applicable.
- Update .env.example if new env vars.
- Write a short `changeset.md` describing what changed and why.
DONE WHEN:
- `pnpm typecheck && pnpm lint && pnpm build` succeed.
- Preview runs locally.
```

### 6.3 Git & Backup Protocol

* **Branching**: `main` (protected) → feature branches `feature/x` → PR → squash merge
* **Tags**: every merge → tag `vX.Y.Z`
* **Backups**: nightly DB backup (prod) + `git clone --mirror` to secondary remote
* **Releases**: produce a `release-notes.md` from merged PR titles
* **Rollback**: `git checkout tags/vX.Y.Z && vercel deploy --prebuilt`

### 6.4 CI Guardrails (`.github/workflows/ci.yml`)

* Install PNPM + Node LTS from `.nvmrc`
* Run: `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm build`
* Block merge if failing

### 6.5 Local Safety

* Use `.nvmrc` (e.g., `lts/*`) and `engines` in `package.json`
* Lock dependencies; avoid `latest` ranges
* Pre-commit hooks with **lint-staged** + **eslint** + **prettier**

### 6.6 Secrets & Envs

* **Never** commit `.env`
* Keep `.env.example` up to date
* Separate `OPENAI_API_KEY` for admin AI endpoints (server-only)

---

## 7) .env.example (template)

```
# Database
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:pass@host:5432/rapidus

# Auth (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-me

# Cloudinary (or S3)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# OpenAI for AI Blog Drafts (server-only)
OPENAI_API_KEY=
```

---

## 8) Scripts (package.json)

```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev --name init",
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

---

## 9) UI Components to Implement First

* `Hero` (title, subtitle, CTA, bg image/video)
* `PortfolioGrid` (cards → modal with carousel)
* `PlanCards` (pricing)
* `AboutSection`
* `PartnersMarquee`
* `ContactSection` (form submits to email or CRM)
* `InstagramLinks` (grid of external links)
* `Footer`

Each section reads `SiteSettings.sections` to show/hide.

---

## 10) API Endpoints (examples)

* `POST /api/upload` → receives file, uploads to Cloudinary, returns URL
* `POST /api/ai/draft` → input: {topic} → returns drafted MDX (admin-only)
* `GET /api/health` → { ok: true }

---

## 11) Rollout Plan

1. **Init repo** with this README, basic Next.js, Tailwind, shadcn/ui
2. Add Prisma + schema + seed
3. Build Admin `settings` page (theme + toggles)
4. Build public sections that consume settings
5. Add Portfolio CRUD + carousel modal
6. Add Plans + Partners
7. Add Blog + AI draft route (admin only)
8. Hook image uploads
9. Configure CI + branch protection + nightly backups
10. Deploy to Vercel (preview → production)

---

## 12) Change Request Template (for every task in Cursor)

```
TITLE: <short>
WHY: <business/design reason>
SCOPE: <files/areas>
ACCEPTANCE:
- visual: ...
- data: ...
- tests/typecheck pass
RISKS: <what could break>
ROLLBACK: <how to revert>
```

---

## 13) Notes for Future Enhancements

* Multi-tenant (if needed)
* Image focal-point editor in Admin
* Reorder sections via drag & drop
* MDX components (CTA, galleries)
* Search and sitemap

---

**Use this doc to bootstrap the repo and to keep Cursor disciplined.** When you want, I can also paste a minimal Next.js starter (pages, components, and a basic Prisma schema) to get you compiling in one shot.
