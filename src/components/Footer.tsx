import Image from "next/image";
import { serviceTowns, siteConfig } from "@/lib/site-config";

type SocialLink = { href: string; label: string; path: string };

function SocialLinks() {
  const links: SocialLink[] = [
    siteConfig.linkedinUrl && {
      href: siteConfig.linkedinUrl as string,
      label: "Doris Luna on LinkedIn",
      path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8.5 8h3.83v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8z",
    },
    siteConfig.instagramUrl && {
      href: siteConfig.instagramUrl as string,
      label: "Luna Doris on Instagram",
      path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.26-.66.6-1.21 1.15-1.76a4.9 4.9 0 0 1 1.76-1.15c.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.66.3-.42.16-.72.36-1.03.67-.31.31-.51.61-.67 1.03-.12.32-.26.79-.3 1.66C4.25 8.5 4.24 8.83 4.24 11.5v1c0 2.67.01 2.99.06 4.04.04.87.18 1.34.3 1.66.16.42.36.72.67 1.03.31.31.61.51 1.03.67.32.12.79.26 1.66.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.66-.3.42-.16.72-.36 1.03-.67.31-.31.51-.61.67-1.03.12-.32.26-.79.3-1.66.05-1.05.06-1.37.06-4.04v-1c0-2.67-.01-2.99-.06-4.04-.04-.87-.18-1.34-.3-1.66a2.8 2.8 0 0 0-.67-1.03 2.8 2.8 0 0 0-1.03-.67c-.32-.12-.79-.26-1.66-.3C14.99 3.81 14.67 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7zm5.35-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z",
    },
  ].filter((link): link is SocialLink => Boolean(link));

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="text-muted-on-dark transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-border bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <Image
            src="/images/logo-horizontal.png"
            alt="Luna Doris"
            width={2146}
            height={343}
            className="h-8 w-auto opacity-90"
          />

          <div className="flex flex-col items-start gap-3 text-sm text-muted-on-dark sm:items-end">
            <div className="flex flex-col gap-1 sm:items-end">
              <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
              <span>{siteConfig.hours}</span>
            </div>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 border-t border-ink-border pt-6 text-xs text-muted-on-dark">
          <span className="font-medium text-muted-on-dark/80">Also serving:</span>{" "}
          {serviceTowns.join(" · ")}
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.businessName}. {siteConfig.serviceArea}.
          </span>
          <span>Health-safe cleaning products, always.</span>
        </div>
      </div>
    </footer>
  );
}
