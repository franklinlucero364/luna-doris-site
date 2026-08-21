import PhoneCTA from "./PhoneCTA";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { heroStats, siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section id="top" className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-wide text-sky">
              {siteConfig.serviceArea}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-on-dark">
              Meticulous, health-safe home cleaning for a small number of
              clients who expect more — no rotating crews, no shortcuts, no
              toxic products.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PhoneCTA />
              <a
                href="#contact"
                className="text-sm font-medium text-white underline decoration-ink-border underline-offset-4 hover:decoration-sky"
              >
                Request a quote instead
              </a>
            </div>
          </div>
          <PhotoPlaceholder
            tone="dark"
            label="Photo coming soon — a bright, freshly cleaned living room"
            className="aspect-[4/3] w-full"
          />
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-6 py-8">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="font-serif text-3xl text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-on-dark sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
