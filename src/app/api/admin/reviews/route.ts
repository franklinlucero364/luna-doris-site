import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getSupabaseAdmin, getSupabaseAdminConstructionError } from "@/lib/supabase-admin";

/**
 * Lists every review (pending, approved, and denied) for the /admin
 * dashboard. Protected by Proxy (src/proxy.ts) AND re-checked here —
 * see the note in proxy.ts on why both layers matter.
 *
 * The whole body is wrapped in try/catch so this route ALWAYS returns
 * JSON, even on a genuinely unexpected crash — without that, an
 * uncaught exception produces Next's generic HTML error page, which
 * breaks the dashboard's `res.json()` call client-side and hides
 * whatever actually went wrong. This route is authenticated, so it's
 * safe to include real error text in the response.
 */
export async function GET() {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      const constructionError = getSupabaseAdminConstructionError();
      if (constructionError) {
        // Env vars ARE set, but creating the client itself failed —
        // almost always a malformed SUPABASE_URL.
        return NextResponse.json(
          { error: "misconfigured", message: constructionError },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, quote, photo_url, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "query_failed", message: error.message },
        { status: 500 }
      );
    }

    // Diagnostic: run the EXACT same query the public homepage runs
    // (see getApprovedReviews in src/lib/reviews-data.ts) so a mismatch
    // between "admin sees it as approved" and "homepage shows nothing"
    // is visible right here, without needing Vercel's Logs tab. Safe to
    // include the raw Postgrest error since this route is authenticated.
    const publicCheck = await supabase
      .from("reviews")
      .select("name, quote, photo_url")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    return NextResponse.json({
      reviews: data,
      debug: {
        publicQueryCount: publicCheck.data?.length ?? null,
        publicQueryError: publicCheck.error?.message ?? null,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "unexpected_error",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
