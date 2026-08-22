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
  tagline: "A cleaner home. A clearer mind.",
  // Used for SEO meta description / social sharing (the on-page hero
  // headline is `tagline` above — this is the longer, search-facing copy).
  metaDescription:
    "Meticulous, health-safe home cleaning for a small number of clients who expect more. Serving [Your City] by appointment only.",

  // 🔧 Replace with the real business phone number (this is shown big,
  // clickable, in the header, hero, and contact section).
  phoneDisplay: "(555) 123-4567",
  phoneHref: "+15551234567", // digits only, used for the tel: link

  // 🔧 Replace with a real inbox you check.
  email: "hello@lunadoris.com",

  // 🔧 Replace with the real neighborhoods / city / region served.
  serviceArea: "Serving [Your City] — by appointment only",

  // Used in metadata. Update if/when the domain changes.
  domain: "lunadoris.com",
  siteUrl: "https://lunadoris.com",

  // 🔧 Optional: fill in once you set up a free form-handling account
  // (Web3Forms/Formspree — see README.md → "Contact & review forms").
  // Used by BOTH the contact form and the "leave a review" form.
  formEndpoint: "", // e.g. "https://api.web3forms.com/submit"

  hours: "Mon–Sat, 8am–6pm",
} as const;

/**
 * Hero stat row — keep these truthful. Only add a number here if it's
 * real; qualitative claims ("Direct with Doris") are fine placeholders,
 * fabricated numbers are not.
 */
export const heroStats = [
  { value: "8+", label: "Years of experience" },
  { value: "100%", label: "Health-safe products" },
  { value: "1:1", label: "Direct with Doris" },
] as const;

/**
 * "Why Choose Us" — the strongest subset of what Franklin gave us.
 * Flexibility and a generic "tailored service" pitch were folded into
 * Exclusivity below since they overlapped; if priorities change, this
 * is the place to swap cards in or out.
 */
export const trustPoints = [
  {
    title: "Accountability",
    description:
      "You work directly with Doris — not a rotating crew, not a call center. The same person, every visit, fully accountable for the result.",
  },
  {
    title: "Experience",
    description:
      "8+ years of hands-on experience cleaning homes the right way — the details that get skipped elsewhere, handled every time.",
  },
  {
    title: "Exclusivity & Tailored Care",
    description:
      "We intentionally keep a limited client roster. Fewer homes means every one gets a plan built around it — not a rushed, one-size-fits-all routine.",
  },
  {
    title: "Trust & Discretion",
    description:
      "Access to your home is a privilege we take seriously. Discreet, no questions asked, and careful with your privacy.",
  },
] as const;

/**
 * The service-experience section — leads with the feeling/result of the
 * service itself (curiosity + desire) rather than a founder-story angle.
 * 🔧 Franklin: adjust wording anytime.
 */
export const serviceExperience = {
  eyebrow: "The experience",
  heading: "Not just clean. Reset.",
  body: "Walk into rooms that feel different the moment you step in — surfaces that shine without a chemical sting in the air, floors you don't think twice about your kids or pets touching, everything exactly where it should be. It's the difference between a home that looks clean in photos and one that actually feels different when you're standing in it.",
};

/**
 * Pricing — tiered packages instead of a raw $/ft² number, on purpose:
 * high-value clients respond better to picking a tier than doing their
 * own square-footage math. The middle tier is deliberately the "anchor"
 * most people pick (marked `featured`).
 *
 * These numbers still need to stay honest against real job economics —
 * our one real reference job (~830 ft², a full multi-room home) came out
 * to about $0.24/ft² actually charged ($200 total), and $0.50/ft² as a
 * "starting" anchor (see the website plan doc for the full calculation).
 * "Starting at" wording is what protects Doris here — the tier sets
 * expectations, the phone call sets the real price based on the space.
 * 🔧 Franklin: adjust tier prices/copy anytime; nothing else on the site
 * depends on the specific numbers here.
 */
export const pricing = {
  eyebrow: "Investment",
  heading: "Pricing built for quality, not speed",
  note: "Every home is different — call for an exact quote based on your space.",
};

export const pricingTiers = [
  {
    name: "The Signature Clean",
    description: "Recurring maintenance cleaning to keep a home consistently spotless.",
    price: "Starting at $150",
    unit: "per visit",
  },
  {
    name: "The White-Glove Elite",
    description:
      "A deeper clean — cabinetry interiors, fixtures, baseboards, every detail most services skip.",
    price: "Starting at $300",
    unit: "per visit",
    featured: true,
  },
  {
    name: "The Estate Concierge",
    description:
      "Full-service care for larger homes — laundry, organizing, and turn-down care alongside cleaning.",
    price: "Custom",
    unit: "quote",
  },
] as const;

/**
 * A quiet, low-key mention that Doris also cleans non-residential spaces
 * (she already does a weekly spa client) — intentionally NOT a full
 * "commercial cleaning" section with its own pricing, since we have no
 * real job data to anchor commercial prices to yet. Just opens the door
 * for someone to call and ask.
 */
export const otherSpaces = {
  note: "Also cleaning spas, offices, and other commercial spaces — call for a custom quote.",
};

/**
 * Reviews — starts empty on purpose. No fabricated testimonials belong
 * here; only add an entry once a real client has actually submitted and
 * approved a review (see README.md → "Reviews: how approval works").
 *
 * Shape: { name: string; quote: string; photo?: string (path in /public) }
 */
export const testimonials: Array<{
  name: string;
  quote: string;
  photo?: string;
}> = [];
