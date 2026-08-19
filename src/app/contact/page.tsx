import type { Metadata } from "next";
import PhoneCTA from "@/components/PhoneCTA";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach Luna Doris by phone or send a few details for a quote. ${siteConfig.serviceArea}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="text-sm font-medium tracking-wide text-clay">Contact</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground">
        The fastest way to reach us is by phone
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Call for same-week availability and a quote in a couple of minutes. Prefer
        not to call right now? Send a few details below and we’ll get back to you.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-surface p-6">
        <PhoneCTA />
        <div className="text-sm text-muted">
          <div>{siteConfig.hours}</div>
          <div>{siteConfig.serviceArea}</div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-foreground">Request a quote</h2>
        <p className="mt-1 text-sm text-muted">
          Tell us a little about your home — we’ll follow up shortly.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
