import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import PhoneCTA from "./PhoneCTA";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Why Luna Doris" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="relative border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-foreground">
          {siteConfig.businessName}
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <PhoneCTA />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
