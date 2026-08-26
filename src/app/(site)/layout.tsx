import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Layout for the public marketing site (the "/" one-pager). Wrapped in a
 * route group — `(site)` — so it does NOT affect the URL (the homepage is
 * still just "/"), but lets `/admin` live as a sibling route that skips
 * this header/footer entirely (see src/app/admin/layout.tsx).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
