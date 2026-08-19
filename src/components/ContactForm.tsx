"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Spam-protected quote request form.
 *
 * - Honeypot field ("website") is invisible to real visitors but bots
 *   fill it in automatically — if it’s filled, we silently drop the
 *   submission instead of sending it.
 * - Actually delivering the message requires a free form-handling
 *   endpoint (Web3Forms, Formspree, etc). Until siteConfig.formEndpoint
 *   is set, the form stays visually present but explains that phone is
 *   the fastest way to reach us — see README-DEPLOY.md → "Contact form".
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const configured = siteConfig.formEndpoint.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check — bots tend to fill every field, humans never see this one.
    if ((data.get("website") as string)?.length > 0) {
      setStatus("success"); // pretend success, don’t let bots learn it was blocked
      form.reset();
      return;
    }

    if (!configured) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users via CSS, not display:none (some bots skip those) */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          What are you looking for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Home size, how often you’d like cleaning, and your neighborhood"
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-clay"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a quote"}
      </button>

      {status === "success" && (
        <p className="text-sm text-sage">Thanks — we’ll get back to you shortly.</p>
      )}
      {status === "error" && !configured && (
        <p className="text-sm text-muted">
          The quote form isn’t connected yet — for now, please call{" "}
          <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-clay">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      )}
      {status === "error" && configured && (
        <p className="text-sm text-muted">
          Something went wrong sending that — please call {siteConfig.phoneDisplay} instead.
        </p>
      )}
    </form>
  );
}
