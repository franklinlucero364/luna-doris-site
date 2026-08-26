"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Spam-protected quote request form.
 *
 * - Honeypot field ("website") is invisible to real visitors but bots
 *   fill it in automatically — if it's filled, we silently drop the
 *   submission instead of sending it.
 * - Actually delivering the message requires a free form-handling
 *   endpoint (Web3Forms, Formspree, etc). Until siteConfig.formEndpoint
 *   is set, the form stays visually present but explains that phone is
 *   the fastest way to reach us — see README.md → "Contact form (quote
 *   requests)". (Reviews are a separate system now, backed by Supabase —
 *   see README.md → "Reviews: admin setup".)
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const configured = siteConfig.formEndpoint.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if ((data.get("website") as string)?.length > 0) {
      setStatus("success");
      form.reset();
      return;
    }

    if (!configured) {
      setStatus("error");
      return;
    }

    data.set("form_type", "quote_request");
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

  const fieldClass =
    "mt-1 w-full rounded-xl border border-ink-border bg-ink px-4 py-2.5 text-sm text-white placeholder:text-muted-on-dark/60 outline-none focus:border-sky";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-white">
            Name
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-white">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-white">
          What are you looking for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Home size, how often you'd like cleaning, and your neighborhood"
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-sky px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a quote"}
      </button>

      {status === "success" && (
        <p className="text-sm text-sky">Thanks — we&apos;ll get back to you shortly.</p>
      )}
      {status === "error" && !configured && (
        <p className="text-sm text-muted-on-dark">
          The quote form isn&apos;t connected yet — for now, please call{" "}
          <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-sky">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      )}
      {status === "error" && configured && (
        <p className="text-sm text-muted-on-dark">
          Something went wrong sending that — please call {siteConfig.phoneDisplay} instead.
        </p>
      )}
    </form>
  );
}
