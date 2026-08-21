import type { ReactNode } from "react";
import { trustPoints } from "@/lib/site-config";

const icons: Record<string, ReactNode> = {
  Accountability: (
    <path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  ),
  Experience: <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  "Exclusivity & Tailored Care": (
    <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" />
  ),
  "Trust & Discretion": (
    <path d="M12 22s8-4.5 8-11.8V5l-8-3-8 3v5.2C4 17.5 12 22 12 22z" />
  ),
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <div className="text-center">
          <p className="text-sm font-medium tracking-wide text-sky">
            Excellence in details
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
            Why families choose Luna Doris
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-ink-border bg-ink-surface p-6 sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky/15 text-sky">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {icons[point.title]}
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl text-white">{point.title}</h3>
              <p className="mt-2 text-sm text-muted-on-dark">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
