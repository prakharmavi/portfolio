# Prakhar Mavi — Portfolio

Modern developer portfolio built with Next.js 15, React 19, and Tailwind CSS. It pairs a map-led bento hero with focused project write-ups, an about section, and a direct contact flow.

## Highlights
- Responsive, map-led bento hero with an optimized supporting portrait
- Project stories generated from structured content in `src/lib/projects.ts` and rendered with per-page metadata
- Contact form that delivers messages through Resend and confirms receipt to the sender
- Cal.com scheduling loads on interaction; Mapbox loads as the About section approaches the viewport
- Responsive React navigation, social links, and a pronunciation helper

## Tech Stack
- Next.js App Router (15.x) with React 19 server and client components
- TypeScript with strict typing and module aliasing via `@/`
- Tailwind CSS v4 utilities, custom UI primitives, and `class-variance-authority`
- MDX project stories with route-scoped interactive widgets
- Resend email API, optional Mapbox map, and on-demand Cal.com scheduling

## Getting Started
1. Install dependencies (Node 20+ recommended):
   ```bash
   pnpm install
   ```
2. Launch the dev server:
   ```bash
   pnpm dev
   ```
3. Open `http://localhost:3000` to explore the site. Updates hot-reload while you edit files under `src/`.

### Useful Commands
- `pnpm build` — production build with Turbopack
- `pnpm start` — run the compiled production server
- `pnpm lint` — lint the codebase with ESLint

## Environment Variables
Create a `.env.local` and supply the values that apply to your deployment.

- `NEXT_PUBLIC_SITE_URL` — canonical site URL used for metadata and sitemaps
- `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_DISCORD_URL` — override social links displayed in the hero
- `NEXT_PUBLIC_EMAIL` — email shown after verification in the contact panel
- `NEXT_PUBLIC_MAPBOX_TOKEN` — enables the optional distance map
- `RESEND_API_KEY` — API key for sending contact emails through Resend (required for production)
- `CONTACT_TO_EMAIL` (optional) — inbox that receives contact form submissions
- `CONTACT_FROM_EMAIL` (optional) — custom sender address for Resend, e.g., `no-reply@yourdomain.com`

Without a Resend key the contact endpoint falls back to a descriptive error so the UI can prompt users to email manually.

## Project Structure
```
src/
  app/
    contact/         <- contact form UI
    projects/        <- project listing and dynamic detail route
    layout.tsx       <- global shell, metadata, and providers
    page.tsx         <- landing page sections
  components/ui/     <- reusable buttons, toast system, effects
  lib/projects.ts    <- project copy surfaced on the site
public/              <- static images, icons, and pronunciation audio
```

## Development Notes
- The contact API route includes in-memory rate limiting and HTML escaping — adjust if you deploy behind a serverless platform with cold starts.
- Mapbox and Cal.com are split from the initial bundle. The map loads automatically near the About section; scheduling loads after interaction.

## Deployment
Set the required environment variables for the target environment and run `pnpm build`. The app exports metadata, sitemap, and robots routes out of the box. Ensure your hosting provider allows outbound requests to Resend and Cloudflare for the contact workflow.
