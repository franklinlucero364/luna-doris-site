# Luna Doris — website

A Next.js site for Luna Doris, deployed on Vercel. This README is the
handoff doc — read the relevant section whenever you're doing something
new with it.

## What's here

A single page (`/`) with six sections, in order:

1. **Hero** — headline, phone CTA, stat row (years of experience, etc.)
2. **Why Choose Us** — four cards (Accountability, Experience, Exclusivity
   & Tailored Care, Trust & Discretion)
3. **The Experience** — a short section about what the service feels like
4. **Pricing** — three tiered packages + a quiet mention of spa/office/
   commercial cleaning
5. **Reviews** — a carousel of client testimonials + a "Leave a review"
   form, backed by a real database with an admin approval dashboard at
   `/admin` (see "Reviews: admin setup" below)
6. **Contact** — phone number + quote-request form

Most content reads from **one file, `src/lib/site-config.ts`** — phone
number, service area, tagline, the "why choose us" cards, and pricing all
live there. Edit that file for almost any content change; you shouldn't
need to touch component code. (Reviews are the one exception — see
below, they live in a database now, not in this file.)

**Design:** a navy/blue palette pulled directly from the Luna Doris logo
(`#3f9cc5` sky blue, `#266182` deep teal). Headings use Georgia, body text
uses Helvetica/Arial — both are fonts every device already has installed,
so there's nothing to download and no font-loading flash. Colors are
defined in `src/app/globals.css`; the real logo files live in
`public/images/`.

## Applying this update

Copy every file from this zip **on top of** your existing `luna-doris-site`
folder (or delete everything except the hidden `.git` folder first, then
copy everything in — either works, just don't leave old files lying
around from a previous version). Then, from that folder:

```bash
npm install
git add -A
git commit -m "Add reviews database and admin approval dashboard"
git push
```

**`npm install` is required this time** (not just a content edit) — this
update adds new packages (`@supabase/supabase-js`, `jose`) that
`package.json` now depends on.

The site will build and go live on its own after this push **even if you
don't touch anything else** — reviews just won't be connected to
anything yet (the site shows friendly "not connected yet" messages
instead of errors). Follow "Reviews: admin setup" below whenever you're
ready to turn that on — it takes about 15 minutes.

## First-time setup (if starting fresh)

### 1. Push this code to GitHub

```bash
git init
git add -A
git commit -m "Initial Luna Doris site"
```

Create a **new, empty** repository on GitHub (no README/license — this
project already has one), then:

```bash
git remote add origin https://github.com/<your-username>/luna-doris-site.git
git branch -M main
git push -u origin main
```

### 2. Import the repo into Vercel

1. In the Vercel dashboard, click **Add New → Project**.
2. Select the `luna-doris-site` repo.
3. Vercel auto-detects Next.js — leave build settings as-is, click **Deploy**.

From here on, every `git push` to `main` automatically redeploys.

### 3. Point lunadoris.com at Vercel

The domain can stay registered at Hostinger — only its DNS changes.

In the Vercel project: **Settings → Domains → Add**, enter `lunadoris.com`.
Vercel will show a DNS record to add — typically an **A record** for `@`
pointing at an IP it gives you. Add that in Hostinger's **hPanel → Domains
→ lunadoris.com → DNS / Nameservers → DNS Zone Editor**.

If Hostinger already has a record for `@` (commonly an `ALIAS` record
pointing at their own hosting), you'll need to delete it first — Hostinger
won't let an `A` and `ALIAS` record coexist on the same name. Don't touch
any `MX`, `TXT`, or `CNAME` records related to mail (`hostingermail-*`,
`autodiscover`, `autoconfig`, `_dmarc`, `spf`) — those are unrelated to
the website.

HTTPS is issued automatically once DNS resolves — no separate SSL step.

## Editing content

Most of it lives in `src/lib/site-config.ts`:

- `phoneDisplay` / `phoneHref` — the phone number
- `serviceArea` / `serviceTowns` — the short service-area line and the
  full list of towns shown in the footer
- `tagline` / `heroSubtext` — the hero headline and paragraph
- `heroStats` — the three numbers in the hero stat row. **Keep these
  truthful** — only put a real number here, never a made-up one.
- `trustPoints` — the four "Why Choose Us" cards
- `serviceExperience` — "The Experience" section text
- `pricingTiers` / `pricing` / `otherSpaces` — the three pricing cards
  and the note about spa/office/commercial cleaning

Reviews are the one thing that **isn't** in this file — see "Reviews:
admin setup" below.

Edit, then:

```bash
git add -A
git commit -m "Update business info"
git push
```

## Swapping in real photos

Every photo spot is currently a placeholder gradient (`PhotoPlaceholder`
component). To replace one:

1. Add the image to `public/images/` (e.g. `public/images/living-room.jpg`).
2. Find the `<PhotoPlaceholder ... />` using it (in `Hero.tsx` or
   `ServiceExperience.tsx`) and replace it with:

   ```tsx
   import Image from "next/image";

   <Image
     src="/images/living-room.jpg"
     alt="Freshly cleaned living room"
     width={800}
     height={600}
     className="aspect-[4/3] w-full rounded-3xl object-cover"
   />
   ```

## Contact form (quote requests)

The "Request a quote" form in the Contact section is spam-protected with
a hidden honeypot field, but needs a free form-delivery service to
actually send you the submission — a static site can't send email on its
own.

To turn it on:

1. Sign up free at [web3forms.com](https://web3forms.com) or
   [formspree.io](https://formspree.io) using the business email.
2. Paste the submission endpoint/access key into `formEndpoint` in
   `src/lib/site-config.ts`.
3. Commit and push.

Until this is set up, the form stays visible but tells visitors to call
instead — nothing breaks, it just doesn't deliver yet.

(Reviews used to share this same form service — they don't anymore. See
below.)

## Reviews: admin setup

Reviews now work like this: someone fills out "Leave a review" on the
site → it's stored as **pending** → you sign in at **yoursite.com/admin**
and see it in a list → you click **Approve** and it goes live on the
site immediately (or **Deny** and it's discarded) — no code edits, no
redeploy, no waiting.

This needs two things connected, both free: a small database (Supabase)
to hold the reviews, and a password you choose for `/admin`. Until
they're connected, the site behaves gracefully — the reviews section
shows a "no reviews yet" preview, the submission form tells people
reviews aren't connected yet and to call instead, and `/admin` explains
what's missing. Nothing is broken by leaving this for later.

### 1. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com), sign up free, and create a
   new project (any name, e.g. "luna-doris"). Pick a database password
   when asked — you won't need to remember it for this setup, just don't
   lose it.
2. Once the project is ready, go to **SQL Editor** (left sidebar), paste
   this, and click **Run**:

   ```sql
   create table reviews (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     quote text not null,
     photo_url text,
     status text not null default 'pending',
     created_at timestamptz not null default now()
   );
   ```

3. Go to **Storage** (left sidebar) → **New bucket** → name it exactly
   `review-photos` → toggle **Public bucket** on → **Create bucket**.
   (This is where uploaded review photos are stored.)
4. Go to **Settings → API**. You need two values from this page:
   - **Project URL** → this is `SUPABASE_URL`
   - **service_role** key (under "Project API keys" — click "reveal") →
     this is `SUPABASE_SERVICE_ROLE_KEY`

   The service_role key is powerful (it bypasses all database
   permissions) — treat it like a password. It only ever gets pasted into
   Vercel's environment variables below, never into any file you commit.

### 2. Choose an admin password and a session secret

- `ADMIN_PASSWORD` — any password you'll use to sign in at `/admin`.
  Doesn't need to be memorable-but-weak or complex — just something you
  and Doris can both use.
- `SESSION_SECRET` — a random string that keeps login sessions secure.
  You won't type this one in anywhere yourself; generate one and just
  copy-paste it. On Mac/Linux, open Terminal and run:

  ```bash
  openssl rand -base64 32
  ```

  On Windows, or if that command isn't available, use any long random
  string (30+ random characters) — a password generator website works
  fine for this too.

### 3. Add all four as environment variables in Vercel

In the Vercel dashboard: your project → **Settings → Environment
Variables**. Add these four (Name / Value), applying to all
environments:

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | from Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase Settings → API |
| `ADMIN_PASSWORD` | whatever you chose |
| `SESSION_SECRET` | the random string you generated |

After adding them, go to **Deployments**, open the latest deployment's
menu (`⋯`), and click **Redeploy** — environment variables only take
effect on the next deploy.

(`.env.example` in this project lists these same four names if you want
a reference — copy it to `.env.local` for local testing, that file is
never committed to GitHub.)

### 4. Sign in and approve reviews

Visit `yoursite.com/admin`, enter the password from step 2. You'll see:

- **Pending approval** — new submissions, with Approve / Deny buttons
- **Live on site** — currently-approved reviews, with a "Remove from
  site" button
- **Denied** — anything you've turned down, in case you change your mind

Approving or denying takes effect on the live site within a second —
no redeploy needed.

### Known limitation: photo size

Uploaded review photos are capped at 4MB (a technical limit of how
Vercel handles incoming requests) — plenty for a phone photo, but a
very high-resolution camera photo could bump into it. If that happens,
the form will say the photo's too large; the reviewer can still submit
without one.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test reviews/admin locally, copy `.env.example` to `.env.local` and
fill in the same four values from "Reviews: admin setup" above — Next.js
loads `.env.local` automatically and it's git-ignored, so it never gets
committed.

```bash
npm run build   # production build — run this before pushing big changes
npm run lint    # catches most mistakes early
```
