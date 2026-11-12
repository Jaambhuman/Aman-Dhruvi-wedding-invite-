# Aman & Dhruvi — Wedding Website

A responsive wedding microsite built with Next.js, designed for deployment on Vercel.

## Included
- Welcome page, couple story, wedding dates and reception details
- RSVP form (saved to Supabase)
- Guest photo uploads (Supabase Storage)
- Responsive layout for phones and desktops

## Run locally
1. Install Node.js 20 or later.
2. Open this folder in Terminal.
3. Run `npm install`
4. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
5. Run `npm run dev` and open http://localhost:3000

## Connect RSVP and photo sharing
1. Create a project at https://supabase.com
2. In Supabase → SQL Editor, run the contents of `supabase/schema.sql`.
3. In Supabase → Project Settings → API, copy the Project URL and anon/public key.
4. Add them to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Optionally set `NEXT_PUBLIC_RECEPTION_MAPS_URL` to the exact Google Maps pin for your venue.

The included SQL enables public RSVP submissions and photo uploads. The public anon key is designed for browser use; never put a Supabase service-role key in this project. Review and tighten spam protection before sharing widely (for example, add CAPTCHA/rate limiting).

## Deploy on Vercel
1. Create a GitHub repository and upload this project folder.
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import the GitHub repository. Vercel should detect Next.js automatically.
4. Add the three environment variables from `.env.example` in Project → Settings → Environment Variables.
5. Click **Deploy**. Share the resulting `*.vercel.app` URL with family.
6. For later edits, update the GitHub repository; Vercel will redeploy automatically.

## Personalise before sharing
- Update the exact wedding venue and function timings in `app/page.tsx`.
- Replace the current story copy with your own story and add approved couple photos if desired.
- Update the reception Google Maps URL in the Vercel environment variables.
- The wedding venue for 2–3 January is intentionally marked as “to follow” because its details were not provided.
