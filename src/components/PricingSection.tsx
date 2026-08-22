import PhoneCTA from "./PhoneCTA";
import { otherSpaces, pricing, pricingTiers } from "@/lib/site-config";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-ink">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <p className="text-sm font-medium tracking-wide text-sky">{pricing.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{pricing.heading}</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 text-left ${
                "featured" in tier && tier.featured
                  ? "border-sky bg-ink-surface"
                  : "border-ink-border bg-ink-surface"
              }`}
            >
              {"featured" in tier && tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-sky px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-serif text-xl text-white">{tier.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-on-dark">{tier.description}</p>
              <div className="mt-6 border-t border-ink-border pt-4">
                <div className="font-serif text-2xl text-white">{tier.price}</div>
                <div className="text-xs text-muted-on-dark">{tier.unit}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-md text-sm text-muted-on-dark">{pricing.note}</p>

        <p className="mx-auto mt-3 max-w-md text-sm text-muted-on-dark">{otherSpaces.note}</p>

        <div className="mt-8 flex justify-center">
          <PhoneCTA />
        </div>
      </div>
    </section>
  );
}
