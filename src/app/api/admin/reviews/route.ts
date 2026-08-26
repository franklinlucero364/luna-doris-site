import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Lists every review (pending, approved, and denied) for the /admin
 * dashboard. Protected by Proxy (src/proxy.ts) AND re-checked here —
 * see the note in proxy.ts on why both layers matter.
 */
export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, quote, photo_url, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "query_failed" }, { status: 500 });
  }

  return NextResponse.json({ reviews: data });
}
