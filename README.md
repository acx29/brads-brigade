# Brad’s Brigade — Landing Page

Single-page marketing site for Brad’s Brigade. Next.js 14 (App Router) + Tailwind CSS. Mobile-first responsive: the 390px mobile design is the base, the 1440px desktop design kicks in at the `lg` breakpoint.

## Run locally
```bash
npm install          # installs dependencies from package-lock.json
cp .env.example .env.local   # then fill in the values (see "Environment variables")
npm run dev          # starts Next.js on http://localhost:3000
```

## Environment variables
Defined in `.env.example`. Locally they go in `.env.local` (git-ignored). On Vercel they go in Project → Settings → Environment Variables.

| Variable | Where to get it | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase → Project Settings → Data API → Project URL | |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API Keys → secret key (`sb_secret_…`), or the legacy `service_role` key | Server-only. Bypasses Row Level Security. Never prefix with `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | Resend → API Keys → Create API Key | |
| `RESEND_FROM` | Your choice | Optional. Defaults to `Brad’s Brigade <onboarding@resend.dev>`, which only delivers to the Resend account’s own email until a domain is verified. |

## Waitlist flow
1. `components/WaitlistHeroForm.tsx` (email only) and `components/WaitlistFinalForm.tsx` (email, chapter, owns apparatus) POST JSON to `/api/waitlist`.
2. `app/api/waitlist/route.ts` validates the email server-side, lowercases it, and inserts a row into the Supabase `waitlist` table using `lib/supabase.ts`.
3. If the email already exists (Postgres unique violation), the route merges any new `chapter` / `owns_apparatus` values into the existing row, returns `{ ok: true, duplicate: true }`, and does not send a second email.
4. On a fresh insert, `lib/email.ts` sends a confirmation through Resend. An email failure is logged but does not fail the request, because the signup is already saved.

### Database
The table definition is in `supabase/schema.sql`. Run it once in the Supabase Dashboard → SQL Editor. Columns: `id`, `email` (unique), `chapter`, `owns_apparatus`, `created_at`. Row Level Security is enabled with no policies, so only the secret key used by the API route can read or write it.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, Add New → Project → import the repository. Framework is auto-detected as Next.js; no build settings need changing.
3. Add the four environment variables above before the first deploy (or redeploy after adding them).

## Structure
- `app/page.tsx` — the whole page (nav, hero, how-it-works, product preview mocks, mission, for-chapters, CTA, footer)
- `app/api/waitlist/route.ts` — waitlist API route (validation, Supabase insert, Resend email)
- `components/WaitlistHeroForm.tsx` / `WaitlistFinalForm.tsx` — client components with success states
- `lib/supabase.ts` — server-only Supabase client
- `lib/email.ts` — confirmation email content and Resend send
- `supabase/schema.sql` — `waitlist` table definition
- `public/images/` — photography (Unsplash: Tom Hutton, Paul Wuthrich, Jairu Ollennu)

## Design notes
- Fonts: Instrument Serif (headings) + Mona Sans (body/UI), loaded from Google Fonts in `app/layout.tsx`
- Brand red: #B03A2B (hover #96301F); backgrounds #FCFBF9 / #F6F3EC; dark section #24201B
- Body text never below 16px; tap targets 44px+
- Stats marked XX are placeholders; chapter count (50) is SPAAMFAA’s published figure
