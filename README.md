# Luna Doris — website

A Next.js site for Luna Doris, deployed on Vercel. This README is the
handoff doc — read the relevant section whenever you're doing something
new with it.

## What's here (v2 — one-page redesign)

A single page (`/`) with five sections, in order:

1. **Hero** — headline, phone CTA, stat row (years of experience, etc.)
2. **Why Choose Us** — four cards (Accountability, Experience, Exclusivity
   & Tailored Care, Trust & Discretion)
3. **Our Story** — the founder story section
4. **Reviews** — a carousel of client testimonials + a "Leave a review" form
5. **Contact** — phone number + quote-request form

Everything reads from **one file, `src/lib/site-config.ts`** — phone
number, service area, tagline, the "why choose us" cards, the founder
story text, and the reviews list all live there. Edit that file for
almost any content change; you shouldn't need to touch component code.

**Design:** a navy/blue palette pulled directly from the Luna Doris logo
(`#3f9cc5` sky blue, `#266182` deep teal), Fraunces for headings, Inter
for body — both self-hosted (no dependency on Google Fonts at runtime).
Colors are defined in `src/app/globals.css`; the real logo files live in
`public/images/`.

## Applying this update (if you already deployed v1)

If you already pushed the first version and connected the domain, you
don't need to redo any of that — DNS and the Vercel project stay exactly
as they are. You just need to get these new files into your existing
local folder and push again:

1. Download and unzip this new version.
2. Copy everything from the unzipped folder **on top of** your existing
   `luna-doris-site` folder, replacing files with the same names. (Easiest
   way: delete everything in your existing folder except the hidden
   `.git` folder, then copy all the new files in.)
3. From that folder:

   ```bash
   git add -A
   git commit -m "Redesign as one-page site with brand colors"
   git push
   ```

Vercel picks up the push automatically and redeploys — the live site
updates within a minute or two, no dashboard steps needed.

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

Everything lives in `src/lib/site-config.ts`:

- `phoneDisplay` / `phoneHref` — the phone number (currently a placeholder)
- `serviceArea` — replace `[Your City]` with the real area served
- `heroStats` — the three numbers in the hero stat row. **Keep these
  truthful** — only put a real number here, never a made-up one.
- `trustPoints` — the four "Why Choose Us" cards
- `founderStory` — the "Our Story" section text
- `testimonials` — see "Reviews" below

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
   `FounderStory.tsx`) and replace it with:

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

## Contact & review forms

Both the quote-request form (Contact section) and the "Leave a review"
form are spam-protected with a hidden honeypot field, but need a free
form-delivery service to actually send you the submission — a static
site can't send email on its own.

To turn it on:

1. Sign up free at [web3forms.com](https://web3forms.com) or
   [formspree.io](https://formspree.io) using the business email.
2. Paste the submission endpoint/access key into `formEndpoint` in
   `src/lib/site-config.ts`.
3. Commit and push.

**One real limitation to know about:** the review form lets someone
attach a photo, but **neither Web3Forms' nor Formspree's free plan
delivers file attachments** — that's a paid-tier feature on both
(roughly $10–12/mo). Until you either upgrade or wire up a separate free
image host (e.g. Cloudinary's free tier — a "phase 2" item, not built
yet), reviewers can still attach a photo in the form, but it won't
actually reach you; only their name and written review will. I didn't
want to quietly ship something that looks like it works but doesn't —
happy to wire up a free photo path if that matters before launch.

## Reviews: how approval works (v1 — manual)

`testimonials` in `site-config.ts` starts empty on purpose — no
placeholder reviews were invented, since fabricated testimonials would
mislead real visitors. This is intentionally a manual process for now:

1. Someone submits the "Leave a review" form → it emails you (once
   `formEndpoint` is set up, see above).
2. You decide if it's good to publish.
3. To publish one, add it to the `testimonials` array in
   `site-config.ts`:

   ```ts
   export const testimonials = [
     { name: "Maria G.", quote: "Full text of their review..." },
   ];
   ```

4. Commit and push — it now appears in the carousel (long quotes are
   automatically truncated for the card view).

A self-serve approve/deny dashboard (so you don't need to ask someone to
edit code for you) is a reasonable next step, but needs a small database
behind it — flagged as a future iteration, not built yet.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build — run this before pushing big changes
npm run lint    # catches most mistakes early
```
