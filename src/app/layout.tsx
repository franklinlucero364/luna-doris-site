import type { Metadata } from "next";
// Self-hosted fonts (no runtime request to Google) — see package.json.
import "@fontsource-variable/inter";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Home Cleaning with Health-Safe Products`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.metaDescription,
  openGraph: {
    title: `${siteConfig.businessName} | Home Cleaning with Health-Safe Products`,
    description: siteConfig.metaDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HouseCleaning",
  name: siteConfig.businessName,
  description: siteConfig.metaDescription,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phoneHref,
  areaServed: siteConfig.serviceArea,
  priceRange: "$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
