import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PhoneCTA from "@/components/PhoneCTA";
import { trustPoints } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why Luna Doris",
  description:
    "Why Luna Doris cleans exclusively with health-safe products, and what that means for your home.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="text-sm font-medium tracking-wide text-clay">Why Luna Doris</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground">
        A personal standard, not a franchise script
      </h1>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:items-center">
        <PhotoPlaceholder
          label="Photo coming soon — Doris"
          className="aspect-square w-full"
        />
        <div className="space-y-4 text-muted">
          {/*
            🔧 Replace this bio with Doris’s real story — how she got started,
            how long she’s been doing this, what she pays attention to that
            others don’t. Specific, true details build more trust here than
            general claims.
          */}
          <p>
            Luna Doris is a family-run cleaning service built on one idea: a home
            should feel genuinely cared for, not just tidied. That means paying
            attention to the details that get skipped — and never cutting corners on
            what’s used to get the job done.
          </p>
          <p>
            Every client works directly with Doris, not a rotating crew — so the
            standard stays consistent, and so do the people you trust with your home.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-16">
        <h2 className="font-serif text-3xl text-foreground">
          Why health-safe products, specifically
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Many standard cleaning products leave behind residue, fragrance chemicals,
          or fumes that can affect kids, pets, and anyone with allergies or
          sensitivities — long after the visit is over. Luna Doris cleans exclusively
          with products chosen to avoid that, without compromising on how clean a
          home actually gets.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          It’s a standard we intend to grow beyond cleaning visits alone — into a
          full line of health-safe home products carrying the Luna Doris name. The
          cleanings we do today are the foundation for that.
        </p>
      </div>

      <div className="mt-16 grid gap-8 border-t border-border pt-16 sm:grid-cols-2">
        {trustPoints.map((point) => (
          <div key={point.title}>
            <h3 className="font-serif text-lg text-foreground">{point.title}</h3>
            <p className="mt-2 text-sm text-muted">{point.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <PhoneCTA />
      </div>
    </div>
  );
}
