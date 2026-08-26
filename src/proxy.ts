import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";

/**
 * Gatekeeper for the admin area. Next.js 16 renamed `middleware.ts` to
 * `proxy.ts` (same mechanism, new name) — this runs before any /admin
 * page or /api/admin route, on the Node.js runtime (Proxy's default in
 * v16), so it can verify the signed session cookie directly.
 *
 * This is an "optimistic" check per Next's auth guidance — fast, cookie
 * only, no database call. Each admin API route ALSO re-verifies the
 * session itself (see src/app/api/admin/*), so a bug or refactor here
 * can't silently remove protection.
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/admin") &&
    pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const authenticated = await verifyAdminSession();
  if (authenticated) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
