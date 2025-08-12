# PickMate MVP (Next.js + Supabase) — Browser-only shipping

This repo lets you deploy a minimal PickMate MVP **entirely from your browser** (no local dev needed).

## What’s included
- Next.js App Router + Tailwind UI
- Email magic-link auth (Supabase)
- Browse gigs (public)
- Post a job (authenticated grower). Row Level Security ensures only the owner can edit/delete their gigs.

## One-sitting deploy (browser-only)
1. **Create Supabase project** (Dashboard → New project). Copy **Project URL** and **anon key**.   - Authentication → Providers → enable **Email** (magic link/OTP).
   - SQL Editor → paste **`supabase.sql`** from this repo and **Run**.
2. **Create a new GitHub repo** and upload this folder’s files (or drag-drop the ZIP contents).
3. **Vercel → New Project** → Import your repo.   Add environment variables:   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
4. **Deploy**. Open the URL. Use the top-right sign-in box to log in via email; then go to **/post** to create a job.

## Local dev (optional)
```bash
npm i
npm run dev
```

## Notes
- Keep this as **Marketplace-only** initially to stay light on compliance.- Add links to Award/WHS/VEVO resources in the `/post` page.- Add moderation/admin before opening publicly.
