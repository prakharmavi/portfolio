# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` — Next.js App Router (routes, `layout.tsx`, `page.tsx`), global styles in `globals.css`.
- `public/` — static assets served at root (e.g., `/next.svg`).
- Root config: `next.config.ts`, `tsconfig.json` (alias `@/*` → `src/*`), `eslint.config.mjs`, `postcss.config.mjs`.
- Use `src/app/(segment)/page.tsx` for new routes; colocate small helpers next to usage or under `src/lib/` if it grows.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (preferred; repo uses `pnpm-lock.yaml`).
- `pnpm dev` — start dev server on `http://localhost:3000` (Turbopack).
- `pnpm build` — production build of the app.
- `pnpm start` — run the compiled production server.
- `pnpm lint` — run ESLint checks (`--fix` to auto‑fix when safe).

## Navigation & Routes
- Use `next/link` for all internal navigation — avoid raw `<a>` for client routes.
- Logo/name links to `/` and serves as the Home link; omit a separate “Home” item.
- Primary items: `About` (`/#about`), `Projects` (`/#projects`), `Contact` (`/#contact`).
- Example: `import Link from 'next/link'; <Link href="/#projects">Projects</Link>`
- No active route highlight by default; keep link styles neutral with hover only.

## Coding Style & Naming Conventions
- TypeScript strict; React 19 + Next.js 15 App Router.
- Components in `*.tsx`, PascalCase (e.g., `HeroBanner.tsx`); hooks start with `use*`.
- Route folders: lowercase/kebab-case (e.g., `src/app/blog/[slug]/page.tsx`).
- Imports: prefer `@/…` alias (e.g., `import { x } from "@/lib/x"`).
- Styling: prefer Tailwind CSS utility classes; keep global CSS minimal in `globals.css`.
- Indentation: use spaces (be consistent); enable format‑on‑save in your editor.

## Testing Guidelines
- No test runner is configured yet. If adding tests:
  - Unit: Vitest + React Testing Library (`*.test.ts(x)` colocated or under `src/__tests__/`).
  - E2E: Playwright (`e2e/**`).
  - Aim for meaningful coverage on new/changed code; keep tests fast and deterministic.

## Commit & Pull Request Guidelines
- Use clear, scoped commits. Conventional Commits are encouraged: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.
- Before opening a PR: run `pnpm lint` and `pnpm build` locally.
- PRs should include: a concise description, linked issue (if any), and screenshots/GIFs for UI changes.
- Keep PRs focused and small; note breaking changes clearly.

## Security & Configuration Tips
- Use `.env.local` for secrets; never commit `.env*`. Client‑exposed vars must start with `NEXT_PUBLIC_`.
- Validate external input and avoid embedding untrusted HTML.
- Check `next.config.ts` before introducing new headers/rewrites.
