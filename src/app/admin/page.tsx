import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin-session";
import AdminDashboard from "./AdminDashboard";

// Force this page to render per-request, never as a static/cached shell.
// Without this, Next can statically prerender the page at build time —
// and if the session check short-circuits before it ever reads the
// cookie (e.g. because SESSION_SECRET wasn't set during `next build`),
// Next has no way to know this page depends on request data, and would
// freeze whatever redirect/auth decision happened to be true at build
// time for every visitor afterward.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Proxy (src/proxy.ts) already redirects unauthenticated visitors before
  // this ever renders — this second check is defense in depth, per Next's
  // own guidance not to rely on Proxy alone.
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
