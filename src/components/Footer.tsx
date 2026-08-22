import Image from "next/image";
import { serviceTowns, siteConfig } from "@/lib/site-config";

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

          <div className="flex flex-col gap-1 text-sm text-muted-on-dark sm:items-end">
            <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-white">
              {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            <span>{siteConfig.hours}</span>
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
