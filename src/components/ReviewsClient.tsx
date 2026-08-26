"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import type { PublicReview } from "@/lib/reviews-data";

const QUOTE_PREVIEW_LENGTH = 180;

function truncate(text: string, length: number) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd()}…`;
}

function TestimonialCard({ name, quote, photo }: PublicReview) {
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.length > QUOTE_PREVIEW_LENGTH;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 32 24"
        fill="currentColor"
        className="h-7 w-8 text-sky/40"
      >
        <path d="M9.352 4C4.456 7.456 2 11.088 2 15.264c0 3.36 1.936 5.632 4.928 5.632 2.464 0 4.4-1.76 4.4-4.224 0-2.288-1.584-3.872-3.696-3.872-.264 0-.44 0-.704.088C7.28 10.256 8.976 8.4 12.32 6.4L9.352 4zm14.784 0c-4.896 3.456-7.352 7.088-7.352 11.264 0 3.36 1.936 5.632 4.928 5.632 2.464 0 4.4-1.76 4.4-4.224 0-2.288-1.584-3.872-3.696-3.872-.264 0-.44 0-.704.088.088-2.632 1.784-4.488 5.128-6.488L24.136 4z" />
      </svg>
      <p className="mt-4 flex-1 whitespace-pre-wrap text-foreground">
        {expanded ? quote : truncate(quote, QUOTE_PREVIEW_LENGTH)}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 self-start text-sm font-medium text-sky-dark underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-6 flex items-center gap-3">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky/15 text-sm font-medium text-sky-dark">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
    </div>
  );
}

function Carousel({ reviews }: { reviews: PublicReview[] }) {
  const [index, setIndex] = useState(0);
  const count = reviews.length;

  if (count === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center">
        <p className="text-sm text-muted">
          No reviews yet — this is a preview of how they&apos;ll look once
          clients start leaving them.
        </p>
        <div className="mx-auto mt-6 max-w-sm">
          <TestimonialCard
            name="A future client"
            quote="This is a preview of what a real review will look like once one is submitted and approved."
          />
        </div>
      </div>
    );
  }

  const current = reviews[index];

  return (
    <div>
      <div className="mx-auto max-w-xl">
        {/* key forces a remount on navigation so "Read more" resets
            back to collapsed for each new review, instead of staying
            expanded/collapsed from whichever review was showing before. */}
        <TestimonialCard key={current.name + index} {...current} />
      </div>
      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface"
          >
            ‹
          </button>
          <div className="flex gap-1.5">
            {reviews.map((r, i) => (
              <button
                key={r.name + i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-sky" : "bg-border"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => setIndex((i) => (i + 1) % count)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

type SubmitStatus = "idle" | "submitting" | "success" | "error" | "not_configured";

// Safe, pre-written messages only — this form is public, so we never echo
// the server's raw error text here (that's fine on /admin, which is
// authenticated, but not here). Each code below maps to something a real
// visitor (or Franklin, testing) can actually act on.
const SUBMIT_ERROR_MESSAGES: Record<string, string> = {
  missing_fields: "Please fill in your name and review before submitting.",
  photo_too_large: "That photo is too large (over 4MB) — try a smaller one, or submit without it.",
  invalid_photo_type: "That file doesn't look like an image — try a different one, or submit without it.",
  upload_failed:
    "We couldn't upload that photo — try again without one, or call us and mention it.",
  insert_failed: "Something went wrong saving your review — please try again in a moment.",
};

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — invisible to real visitors, bots tend to fill every field.
    if ((data.get("company") as string)?.length > 0) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    setErrorDetail(null);
    try {
      const res = await fetch("/api/reviews", { method: "POST", body: data });
      if (res.status === 503) {
        setStatus("not_configured");
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}) as { error?: string });
        setErrorDetail(
          (body.error && SUBMIT_ERROR_MESSAGES[body.error]) ?? null
        );
        throw new Error("Request failed");
      }
      setStatus("success");
      form.reset();
      setPhotoPreview(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-2xl text-foreground">Leave a review</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">
          Write as much as you&apos;d like — we&apos;ll show a short preview
          publicly. Every review is reviewed before it goes live.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-xl bg-sky/10 p-6 text-center">
            <p className="text-foreground">
              Thank you! Your review has been sent to Doris for approval —
              once approved, it&apos;ll appear on this page.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-sm font-medium text-sky-dark underline"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="company">Leave this field empty</label>
              <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="review-name" className="text-sm font-medium text-foreground">
                Your name
              </label>
              <input
                id="review-name"
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-sky"
              />
            </div>

            <div>
              <label htmlFor="review-text" className="text-sm font-medium text-foreground">
                Your review
              </label>
              <textarea
                id="review-text"
                name="review"
                rows={5}
                required
                maxLength={2000}
                placeholder="Tell us about your experience — as much detail as you'd like"
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-sky"
              />
            </div>

            <div>
              <label htmlFor="review-photo" className="text-sm font-medium text-foreground">
                Add a photo (optional)
              </label>
              <input
                id="review-photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setPhotoPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="mt-1 w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-sky/15 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky-dark"
              />
              {photoPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-3 h-16 w-16 rounded-full object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-sky px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-dark disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Submit review"}
            </button>

            {status === "not_configured" && (
              <p className="text-sm text-muted">
                Reviews aren&apos;t connected yet — for now, please share your
                feedback by calling{" "}
                <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-sky-dark">
                  {siteConfig.phoneDisplay}
                </a>
                .
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-muted">
                {errorDetail ??
                  `Something went wrong sending that — please try again, or call ${siteConfig.phoneDisplay}.`}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default function ReviewsClient({ reviews }: { reviews: PublicReview[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="reviews" className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="text-center">
          <p className="text-sm font-medium tracking-wide text-sky-dark">Client reviews</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            What clients say
          </h2>
        </div>

        <div className="mt-12">
          <Carousel reviews={reviews} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-sky px-6 py-3 text-sm font-medium text-sky-dark hover:bg-sky hover:text-white"
          >
            Leave a review
          </button>
        </div>
      </div>

      {modalOpen && <ReviewModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
