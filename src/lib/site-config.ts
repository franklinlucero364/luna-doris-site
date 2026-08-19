/**
 * ============================================================
 *  LUNA DORIS — SITE CONTENT CONFIG
 * ============================================================
 * This is the ONE file you need to edit to update the business
 * info shown across the whole site (phone number, service area,
 * tagline, etc). Everything below is clearly labeled — replace
 * the placeholder values (marked with 🔧) with the real thing.
 *
 * After editing, save the file, commit, and push to GitHub —
 * Vercel will automatically rebuild and publish the change.
 * ============================================================
 */

export const siteConfig = {
  businessName: "Luna Doris",
  tagline: "Trusted, detail-obsessed home cleaning — with products that are safe for your family.",

  // 🔧 Replace with the real business phone number (this is shown big,
  // clickable, in the header, hero, and footer).
  phoneDisplay: "(555) 123-4567",
  phoneHref: "+15551234567", // digits only, used for the tel: link

  // 🔧 Replace with a real inbox you check — this only needs to exist
  // if you want an email contact option in addition to the phone.
  email: "hello@lunadoris.com",

  // 🔧 Replace with the real neighborhoods / city / region served.
  // Keep it specific — "Serving X, Y, and Z" reads as more trustworthy
  // (and ranks better locally) than something vague like "your area."
  serviceArea: "Serving [Your City] and surrounding neighborhoods",
  serviceAreaList: [
    "[Neighborhood or town 1]",
    "[Neighborhood or town 2]",
    "[Neighborhood or town 3]",
  ],

  // Used in the footer and metadata. Update if/when the domain changes.
  domain: "lunadoris.com",
  siteUrl: "https://lunadoris.com",

  // 🔧 Optional: fill in once you set up a free form-handling account
  // (see README-DEPLOY.md → "Contact form"). Leave blank to keep the
  // form hidden and phone-only.
  formEndpoint: "", // e.g. "https://api.web3forms.com/submit"

  social: {
    // 🔧 Optional — leave blank to hide the icon in the footer.
    instagram: "",
    facebook: "",
  },

  hours: "Mon–Sat, 8am–6pm",
} as const;

export const services = [
  {
    name: "Recurring Home Cleaning",
    description:
      "Weekly, bi-weekly, or monthly visits that keep a home consistently spotless — the same trusted routine every time.",
  },
  {
    name: "Deep Cleaning",
    description:
      "A thorough, top-to-bottom clean for homes that need extra attention — baseboards, appliances, grout, and every overlooked corner.",
  },
  {
    name: "Move-In / Move-Out Cleaning",
    description:
      "A detailed reset for an empty home, so it shows perfectly for new owners, tenants, or a final walkthrough.",
  },
  {
    name: "Special Occasion Cleaning",
    description:
      "A polished, guest-ready clean before hosting — because a home should feel effortless when it matters most.",
  },
] as const;

export const trustPoints = [
  {
    title: "Health-safe products, always",
    description:
      "We clean exclusively with products that are not harmful to the people (or pets) living in the home — nothing left behind that you wouldn't want your family breathing in.",
  },
  {
    title: "Reliable & detail-obsessed",
    description:
      "The same careful standard, every visit — not a rushed once-over.",
  },
  {
    title: "Flexible scheduling",
    description:
      "Built around your household, not the other way around.",
  },
  {
    title: "A personal, family-run service",
    description:
      "You're working directly with Doris — not a rotating crew from a call center.",
  },
] as const;
