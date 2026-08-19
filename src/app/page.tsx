import Link from "next/link";
import PhoneCTA from "@/components/PhoneCTA";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { services, siteConfig, trustPoints } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-wide text-clay">
              {siteConfig.serviceArea}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              A home that’s truly clean — and truly safe.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Luna Doris brings careful, detail-obsessed cleaning to homes that expect
              more — using only products that are safe for the people (and pets) who
              live there.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PhoneCTA />
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-clay"
              >
                Request a quote instead
              </Link>
            </div>
          </div>
          <PhotoPlaceholder
            label="Photo coming soon — a bright, freshly cleaned living room"
            className="aspect-[4/3] w-full"
          />
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title}>
              <h3 className="font-serif text-lg text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-serif text-3xl text-foreground">What we take care of</h2>
          <Link href="/services" className="hidden text-sm font-medium text-clay sm:block">
            See all services →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-serif text-xl text-foreground">{service.name}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
        <Link href="/services" className="mt-8 block text-sm font-medium text-clay sm:hidden">
          See all services →
        </Link>
      </section>

      {/* Non-toxic callout */}
      <section className="bg-sage-light">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:grid-cols-2">
          <PhotoPlaceholder
            tone="sage"
            label="Photo coming soon — the non-toxic products we use"
            className="aspect-[4/3] w-full sm:order-2"
          />
          <div className="sm:order-1">
            <h2 className="font-serif text-3xl text-foreground">
              Nothing in your home that shouldn’t be there
            </h2>
            <p className="mt-4 text-muted">
              Conventional cleaning products can leave behind residue and fumes that
              aren’t great for kids, pets, or anyone with sensitivities. We made a
              standing commitment to clean only with products that are safe for
              everyone in the house — no compromise, every visit.
            </p>
            <p className="mt-4 text-muted">
              It’s the same standard we’re building toward a full line of health-safe
              home products under the Luna Doris name — starting with how we clean
              your home today.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-clay underline underline-offset-4"
            >
              Learn more about our approach →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl text-foreground">
          Let’s take one more thing off your plate.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Call now for same-week availability, or send a few details and we’ll get
          back to you shortly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <PhoneCTA />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-clay px-6 py-3 text-sm font-medium text-clay hover:bg-clay hover:text-white"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
