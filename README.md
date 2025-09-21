# Prakhar Mavi — Portfolio

Modern developer portfolio built with Next.js 15, React 19, and Tailwind CSS. It pairs a lightweight 3D hero with focused project write-ups, an about section, and a verified contact flow so visitors can get in touch quickly.

## Highlights
- Interactive hero powered by React Three Fiber with graceful fallbacks for low-power devices
- Project stories generated from structured content in `src/lib/projects.ts` and rendered with per-page metadata
- Cloudflare Turnstile protected contact form that delivers messages through Resend and confirms receipt to the sender
- Floating Cal.com booking button plus social links and pronunciation helper for quick introductions
- Responsive, Preline-enhanced navigation and section wrappers tuned for smooth scrolling and consistent spacing

## Tech Stack
- Next.js App Router (15.x) with React 19 server and client components
- TypeScript with strict typing and module aliasing via `@/`
- Tailwind CSS v4 utilities, custom UI primitives, and `class-variance-authority`
- React Three Fiber, Drei, and Three.js for WebGL scenes
- Cloudflare Turnstile, Resend email API, and Cal.com embed for contact scheduling

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
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile credentials for spam protection
- `RESEND_API_KEY` — API key for sending contact emails through Resend (required for production)
- `CONTACT_TO_EMAIL` (optional) — inbox that receives contact form submissions
- `CONTACT_FROM_EMAIL` (optional) — custom sender address for Resend, e.g., `no-reply@yourdomain.com`
- `NEXT_PUBLIC_ENABLE_OPTIONAL_LIBS` — set to `1` to load optional UI companions (jQuery, DataTables, Dropzone, etc.) via Preline helper

Without a Resend key the contact endpoint falls back to a descriptive error so the UI can prompt users to email manually.

## Project Structure
```
src/
  app/
    components/      <- shared UI building blocks (3D hero, nav, widgets)
    contact/         <- turnstile-verified contact form
    projects/        <- project listing and dynamic detail route
    layout.tsx       <- global shell, metadata, and providers
    page.tsx         <- landing page sections
  components/ui/     <- reusable buttons, toast system, effects
  lib/projects.ts    <- project copy surfaced on the site
public/              <- static assets (3D model, icons, hero audio, etc.)
```

## Development Notes
- The default 3D model lives at `public/me.glb`; replace it with your own GLB to customize the hero.
- `Hero3DClient` auto-detects device memory and save-data settings to swap in a static frame when WebGL would be costly.
- The contact API route includes in-memory rate limiting and HTML escaping — adjust if you deploy behind a serverless platform with cold starts.
- Optional libraries (DataTables, Dropzone, etc.) stay out of the bundle unless explicitly enabled, keeping the base experience lean.

## Deployment
Set the required environment variables for the target environment and run `pnpm build`. The app exports metadata, sitemap, and robots routes out of the box. Ensure your hosting provider allows outbound requests to Resend and Cloudflare for the contact workflow.
