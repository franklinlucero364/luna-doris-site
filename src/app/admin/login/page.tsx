import { isAdminConfigured } from "@/lib/admin-session";
import LoginForm from "./LoginForm";

// Same reasoning as src/app/admin/page.tsx — never let this get frozen
// as a static shell built from whatever env vars happened to exist at
// build time.
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configured = isAdminConfigured();

  return (
    <div className="text-center">
      <h1 className="font-serif text-2xl text-foreground">Admin sign-in</h1>
      <p className="mt-2 text-sm text-muted">Review and approve submissions.</p>

      {configured ? (
        <LoginForm />
      ) : (
        <p className="mx-auto mt-8 max-w-sm rounded-xl border border-dashed border-border bg-surface/60 p-6 text-sm text-muted">
          Admin login isn&apos;t set up yet. Add <code>ADMIN_PASSWORD</code> and{" "}
          <code>SESSION_SECRET</code> as environment variables (see README.md
          → &quot;Reviews: admin setup&quot;) to turn this on.
        </p>
      )}
    </div>
  );
}
