"use client";

import { useState } from "react";
import { navLinks } from "./Header";
import { siteConfig } from "@/lib/site-config";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border text-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
        >
          {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-ink-border bg-ink px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-1 text-base font-medium text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${siteConfig.phoneHref}`}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center rounded-full bg-sky px-5 py-2.5 text-sm font-medium text-white"
            >
              Call {siteConfig.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
