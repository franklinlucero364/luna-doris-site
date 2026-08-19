# Luna Doris — website

A Next.js site for Luna Doris, deployed on Vercel. This README is the
handoff doc — read it top to bottom the first time you set this up.

## What's here

- **Pages:** Home (`/`), Services (`/services`), Why Luna Doris (`/about`),
  Contact (`/contact`)
- **One file for all business info:** `src/lib/site-config.ts` — phone
  number, service area, tagline, services list, form endpoint. Edit this
  file for almost any content change.
- **Design:** warm/personal palette (terracotta + cream + sage), Fraunces
  for headings, Inter for body — both self-hosted (no dependency on Google
  Fonts at runtime), defined in `src/app/globals.css`.
- Placeholder photo blocks (`PhotoPlaceholder` component) stand in until
  real photos are ready — see "Swapping in real photos" below.

## First-time setup: get this live on lunadoris.com

You said you already have GitHub and Vercel accounts, so this is three
steps: push the code, import it into Vercel, point the domain at it.

### 1. Push this code to GitHub

From this project folder (if you unzipped this from a download, there's
no `.git` folder yet, so start with `git init`):

```bash
git init
git add -A
git commit -m "Initial Luna Doris site"
```

Then create a **new, empty** repository on GitHub (no README/license —
this project already has one), and push:

```bash
git remote add origin https://github.com/<your-username>/luna-doris-site.git
git branch -M main
git push -u origin main
```

### 2. Import the repo into Vercel

1. In the Vercel dashboard, click **Add New → Project**.
2. Select the `luna-doris-site` repo you just pushed.
3. Vercel auto-detects Next.js — leave the build settings as-is and click
   **Deploy**.
4. In a minute or two you'll have a live URL like
   `luna-doris-site.vercel.app`. Confirm it looks right before moving on.

From here on, **every `git push` to `main` automatically redeploys the
live site** — that's the whole workflow going forward.

### 3. Point lunadoris.com at Vercel

You don't need to move the domain away from Hostinger — it can stay
registered there. You're only changing where its DNS records point.

In the Vercel project: **Settings → Domains → Add**, and enter
`lunadoris.com` (Vercel will also suggest adding `www.lunadoris.com` —
accept that, it's used to redirect `www` to the main domain).

Vercel will show you two DNS records to add:

- An **A record** for the root domain (`@`), pointing at an IP address
  Vercel gives you (commonly `76.76.21.21`, but use whatever value your
  dashboard actually shows — it can vary).
- A **CNAME record** for `www`, pointing at a value Vercel generates for
  your project specifically (looks like
  `xxxxxxxx.vercel-dns-xxx.com`).

Then in Hostinger: **hPanel → Domains → lunadoris.com → DNS / Nameservers
→ DNS Zone Editor**, and add those two records exactly as shown, using the
existing Hostinger nameservers (no nameserver change needed). Delete or
edit any existing conflicting A/CNAME record for `@` or `www` first.

DNS changes can take anywhere from a few minutes to a few hours to
propagate. Vercel's Domains page will show a green "Valid Configuration"
once it's live, and **HTTPS is issued automatically** — no separate SSL
step, and no more of the "not secure" warning from the old Hostinger
site.

> Once `lunadoris.com` is confirmed working, you can turn off/cancel
> whatever hosting or website-builder plan is active on the old Hostinger
> site — just keep the domain registration itself.

## Editing content

Almost everything on the site reads from `src/lib/site-config.ts`:

- `phoneDisplay` / `phoneHref` — the phone number shown and dialed
  (currently a placeholder: `(555) 123-4567`)
- `serviceArea` / `serviceAreaList` — replace `[Your City]` and the
  neighborhood placeholders with the real area served
- `services` — the four service cards on Home/Services
- `trustPoints` — the four "why us" callouts

Edit the file, then:

```bash
git add -A
git commit -m "Update business info"
git push
```

Vercel rebuilds and the live site updates within a minute or two.

## Swapping in real photos

Right now every photo spot is a warm gradient placeholder
(`PhotoPlaceholder` component) with a caption describing what should go
there. To replace one:

1. Add the image file to `public/images/` (e.g. `public/images/living-room.jpg`).
2. In the relevant page (e.g. `src/app/page.tsx`), replace the
   `<PhotoPlaceholder ... />` with:

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

## Contact form (optional — phone is the main CTA by design)

The quote form on `/contact` is built and spam-protected (it has a hidden
honeypot field that silently drops bot submissions), but it needs a free
form-delivery service to actually send you the message — Vercel doesn't
do this for a static form on its own.

To turn it on:

1. Sign up free at [web3forms.com](https://web3forms.com) (or
   [formspree.io](https://formspree.io) — either works, Web3Forms has a
   more generous free tier) using the business email.
2. They'll give you a submission endpoint URL / access key.
3. Paste it into `formEndpoint` in `src/lib/site-config.ts`.
4. Commit and push.

Until that's set, the form stays visible but shows a friendly note
pointing people to the phone number instead of silently failing.

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
