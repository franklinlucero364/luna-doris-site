import type { Metadata } from "next";
import PhoneCTA from "@/components/PhoneCTA";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description: `The cleaning services Luna Doris offers, ${siteConfig.serviceArea.toLowerCase()}.`,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="text-sm font-medium tracking-wide text-clay">Services</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground">
        Cleaning built around how your home is actually used
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Every visit uses the same health-safe products — no exceptions. Pricing
        depends on home size, condition, and how often you’d like us to come.
        Call for a quote in a couple of minutes.
      </p>

      <div className="mt-12 space-y-6">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <h2 className="font-serif text-2xl text-foreground">{service.name}</h2>
            <p className="mt-2 text-muted">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-sage-light p-8 text-center">
        <h2 className="font-serif text-2xl text-foreground">Not sure what you need?</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Tell us about your home and we’ll recommend a schedule — most clients start
          with a deep clean, then move to recurring visits.
        </p>
        <div className="mt-6 flex justify-center">
          <PhoneCTA />
        </div>
      </div>
    </div>
  );
}
