import PhoneCTA from "./PhoneCTA";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/site-config";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-ink">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <div className="text-center">
          <p className="text-sm font-medium tracking-wide text-sky">Contact</p>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
            The fastest way to reach us is by phone
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-on-dark">
            Call for same-week availability and a quote in a couple of
            minutes. Prefer not to call right now? Send a few details below
            and we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-ink-border bg-ink-surface p-6">
          <PhoneCTA />
          <div className="text-sm text-muted-on-dark">
            <div>{siteConfig.hours}</div>
            <div>{siteConfig.serviceArea}</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-ink-border bg-ink-surface p-6 sm:p-8">
          <h3 className="font-serif text-2xl text-white">Request a quote</h3>
          <p className="mt-1 text-sm text-muted-on-dark">
            Tell us a little about your home — we&apos;ll follow up shortly.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
