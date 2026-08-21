import Image from "next/image";
import PhoneCTA from "./PhoneCTA";
import MobileMenu from "./MobileMenu";

export const navLinks = [
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-border bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center">
          <Image
            src="/images/logo-horizontal.png"
            alt="Luna Doris"
            width={2146}
            height={343}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-on-dark transition-colors hover:text-white"
            >
              {link.label}
            </a>
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
