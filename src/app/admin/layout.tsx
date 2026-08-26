import Link from "next/link";

/**
 * Deliberately bare-bones — this is an internal tool for Doris/Franklin,
 * not a page a client ever sees, so it skips the marketing Header/Footer
 * (see the (site) route group) in favor of a minimal top bar.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-medium text-muted hover:text-foreground">
            ← Back to site
          </Link>
          <span className="font-serif text-lg text-foreground">Luna Doris — Admin</span>
        </div>
      </div>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
