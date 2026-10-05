# SolarFeed Hubs — website

Marketing site for SolarFeed Hubs, a shared solar-powered micro feed mill for smallholder poultry farmers in northern Nigeria. A project of Swifter Ventures LTD (CAC RC 8894875).

React 18 + Vite + TypeScript + Tailwind CSS, shadcn/ui-style components on Radix, Framer Motion, Recharts, React Router, react-helmet-async and Supabase. Every route is pre-rendered to static HTML at build time and hydrated in the browser, so text paints before JavaScript arrives on slow mobile data.

## Quick start

```bash
npm install
cp .env.example .env     # then fill in the values below
npm run dev              # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload (client-rendered) |
| `npm run build` | Type-check, build, then pre-render every route into `dist/` |
| `npm run preview` | Serve `dist/` like a static host (`/pilot` → `pilot/index.html`, unknown → `404.html`) |
| `npm test` | Unit tests (savings maths matches the published figures) |
| `npm run a11y` | axe-core WCAG 2.2 AA audit of every page at 1280 px and 360 px (needs a running server) |
| `npm run screenshots -- /pilot 360,768,1280,1440 --full` | Responsive screenshots into `screenshots/` |
| `npm run assets` | Regenerate `og-image.png` and PNG icons from `public/brand/solarfeed-mark.svg` |
| `npm run i18n:sync` / `i18n:check` | Keep `ha.json` in step with `en.json`, report translation coverage |
| `sh scripts/lighthouse.sh http://localhost:4173` | Mobile Lighthouse for the main pages (needs `npm i -g lighthouse`) |

The scripts drive the locally installed Chrome or Edge through `playwright-core`; no browser is downloaded.

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public URL, used for canonical links, Open Graph, `sitemap.xml`, `robots.txt` and JSON-LD. **Set this before building.** |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key. Safe to expose: row-level security only allows inserting enquiries and reading published journal posts. |

Without the Supabase values the site still works: the form tells visitors to email instead, and the pilot journal shows its empty state.

## Supabase

1. Create a project, then run `supabase/migrations/20261005000000_partner_enquiries_and_pilot_posts.sql` in the SQL editor (or `supabase db push`).
2. That creates:
   - `partner_enquiries` (id, created_at, full_name, organisation, role, email, phone, audience, message, consent). RLS is on; the public can **insert only** and nobody can read without the service role or the dashboard. Database checks enforce `consent = true` and the field lengths.
   - `pilot_posts` (id, created_at, published_at, title, body, is_published). The public can read rows where `is_published = true`. Add journal entries from the Table Editor. The body is plain text: blank lines become paragraphs, and HTML is never rendered.
3. Read enquiries in the Table Editor. The privacy policy promises deletion 24 months after last contact. Set a reminder, or schedule `delete from partner_enquiries where created_at < now() - interval '24 months'`.

## Deploying

Any static host works. Build with `npm run build` and publish `dist/`.

- **Netlify**: `public/_redirects` sends unknown paths to `404.html` with status 404. Real routes are files, so they are served directly.
- **Vercel**: `vercel.json` sets clean URLs and long-lived caching for `/assets/*`; `404.html` is picked up automatically.
- Set the three environment variables in the host's dashboard and rebuild.

## Brand files (action needed)

The logo files supplied with the brief were not in the project folder, so `public/brand/` holds **stand-in artwork** drawn from the description (sun rising over three kernels in a hexagon), at the exact file names the site uses:

- `solarfeed-logo.svg`: header and light backgrounds
- `solarfeed-logo-dark.svg`: footer and dark backgrounds
- `solarfeed-mark.svg`: favicon, app icons, share image, hub-console mock-up

Drop the real files in with the same names, then run `npm run assets` and `npm run build`. No code changes are needed.

## Content and translation

- All copy lives in `src/i18n/en.json`. Components read it through `useI18n()`, so wording changes never touch code.
- `src/i18n/ha.json` has every key, with empty strings meaning "not yet translated by a human". The site falls back to English for those and shows a notice when HA is selected. `<html lang>` only switches to `ha` once the file is complete. **Do not fill it with machine translation.** Give `ha.json` to a Hausa translator; `npm run i18n:check` reports coverage.
- Figures must come from the brief's Section 6. The two calculated figures (energy cost per bag, yearly savings) are labelled "Planning estimate" and "Illustrative" wherever they appear, and `src/lib/savings.test.ts` checks the savings maths against the published numbers.

## Photos

Every place a real photo will go has a dashed "Photo coming soon" slot (founder: "Founder photo — upload"). Replace `PhotoSlot` with an `<img>` that has real alt text once you have consented photos. No stock photos of people, testimonials or logo walls. See the brief's Section 7.

## Project map

```
src/
  AppShell.tsx            routes + providers (shared by browser and pre-render)
  main.tsx                browser entry: hydrates pre-rendered HTML
  entry-server.tsx        pre-render entry used by scripts/prerender.mjs
  i18n/                   en.json (source), ha.json (for human translation), provider
  pages/                  Home, HowItWorks, Pilot, Impact, About, Contact, Privacy, NotFound
  components/home/        Home page sections
  components/illustrations/  hand-built SVG scenes, people, avatars, cutaway
  components/charts/      Recharts charts (lazy-loaded when scrolled into view)
  components/ui/          shadcn-style primitives (button, accordion, sheet, form controls)
  lib/                    savings model, budget data, formatting, Supabase client
supabase/migrations/      database schema and row-level security
scripts/                  pre-render, SEO files, images, a11y, screenshots, static preview server
```
