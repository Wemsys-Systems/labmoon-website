# Labmoon Web

Next.js 16 App Router + React 19 + Tailwind CSS v4 + Supabase — Spanish/English landing site for a blockchain forensic firm.

## Stack quirks

- **Next.js 16** (App Router). This version may differ from training data — treat docs with caution.
- **React 19**.
- **Tailwind CSS v4** (`@tailwindcss/postcss` plugin, no `tailwind.config.js`). Use `@theme` in CSS to customize.
- **pnpm** (lockfile: `pnpm-lock.yaml`).
- **Supabase** backend: client in `src/lib/supabase.ts`. Requires env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **ESLint 9** flat config (`eslint.config.mjs`). Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- **Framer Motion**, **Lucide React**, **next-intl** for i18n.
- **`@/`** path alias maps to `./src/`.

## Commands

```sh
pnpm dev          # dev server at localhost:3000
pnpm build        # production build
pnpm start        # start production server
pnpm lint         # ESLint (no typecheck or test scripts)
```

There are no test, typecheck, or format scripts. Run `npx tsc --noEmit` for typechecking.

## i18n (next-intl v4)

- **Locales**: `es` (default), `en`.
- **Locale prefix**: `always` — all routes include locale (e.g. `/es/servicios`, `/en/servicios`).
- Middleware/proxy file must be `src/proxy.ts` (Next.js 16 deprecates `middleware.ts`).
- Messages in `messages/{locale}.json` organized by component/page namespace.
- Use `getTranslations('Namespace')` in server components, `useTranslations('Namespace')` in client components.
- Internal links must use `Link` from `@/i18n/navigation` (not `next/link`).
- Locale layout at `app/[locale]/layout.tsx` provides `NextIntlClientProvider`.
- Root layout at `app/layout.tsx` (no `NextIntlClientProvider`, no `<CookieBanner>`).
- `generateStaticParams` in `[locale]/layout.tsx` handles static generation for both locales.

## Project structure

```
src/
  app/
    [locale]/          # All pages (ES + EN via next-intl)
      admin/academia/  # Admin panel (client component, Supabase CRUD)
      academia/        # Public course catalog
      ...
    api/contact/       # Contact form API route
    layout.tsx         # Root layout (fonts, html/body)
    globals.css        # Tailwind v4 @theme
    robots.ts          # Disallows /admin/, /login, /academia/*/
    sitemap.ts         # Bilingual sitemap
  components/
    LanguageSwitcher.tsx # 🇪🇸/🇬🇧 flag selector in Navbar
    Navbar.tsx, Footer.tsx, Hero.tsx, Services.tsx
    admin/CourseUploader.tsx
  i18n/
    routing.ts         # next-intl routing config (locales, prefix)
    navigation.ts      # Wrapped Link, redirect, usePathname
    request.ts         # next-intl request config (message loading)
  proxy.ts             # Next.js 16 proxy (middleware replacement)
  lib/supabase.ts      # Supabase client singleton
```

## Environment for Coolify

Set these env vars in Coolify UI:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `NEXT_PUBLIC_ACADEMY_ENABLED` | No | `true` to enable academy |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Only if admin panel needed |

- Dockerfile uses `pnpm install --frozen-lockfile` and `pnpm build`.
- docker-compose maps container port 3000 to host 3002, no `env_file` (Coolify injects env vars directly).
- `NEXT_PUBLIC_*` vars must be set as **Build Args** in Coolify UI (Build → Build Args), NOT only as runtime env vars. Next.js inlines these at build time.

## Important conventions

- Default language is Spanish (`es`). English (`en`) is secondary.
- Admin routes (`/admin/*`) are publicly accessible — no auth middleware yet.
- Academy courses table is `courses` in Supabase, content stored in `courses-content` bucket.
- Academy detail page (`academia/[id]/page.tsx`) is a server component with hardcoded sample data.
