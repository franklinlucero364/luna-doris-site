import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="font-serif text-xl font-medium text-foreground">
              {siteConfig.businessName}
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-clay">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-clay">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.hours}</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/services" className="hover:text-clay">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-clay">
                  Why Luna Doris
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-clay">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.businessName}. {siteConfig.serviceArea}.
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5 text-sage"
            >
              <path d="M12 22s8-4.5 8-11.8V5l-8-3-8 3v5.2C4 17.5 12 22 12 22z" />
            </svg>
            Health-safe cleaning products
          </span>
        </div>
      </div>
    </footer>
  );
}
