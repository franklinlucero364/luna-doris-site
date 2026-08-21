import PhoneCTA from "./PhoneCTA";
import { pricing } from "@/lib/site-config";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-ink">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <p className="text-sm font-medium tracking-wide text-sky">{pricing.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">{pricing.heading}</h2>

        <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-ink-border bg-ink-surface p-8">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-serif text-5xl text-white">{pricing.rate}</span>
            <span className="text-muted-on-dark">{pricing.rateUnit}</span>
          </div>
          <p className="mt-3 text-sm font-medium text-muted-on-dark">{pricing.minimum}</p>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm text-muted-on-dark">{pricing.note}</p>

        <div className="mt-8 flex justify-center">
          <PhoneCTA />
        </div>
      </div>
    </section>
  );
}
