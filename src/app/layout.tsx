import type { Metadata } from "next";
// Fonts are OS-native system fonts (Georgia / Helvetica-Arial) — see
// globals.css. No font files to self-host, so no imports needed here.
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
