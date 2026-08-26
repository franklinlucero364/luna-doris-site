import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import { getSupabaseAdmin, getSupabaseAdminConstructionError } from "@/lib/supabase-admin";

const ALLOWED_STATUSES = new Set(["approved", "denied", "pending"]);

/** Approve, deny, or reset a single review. Body: { status }.
 *
 * Wrapped in try/catch so this always returns JSON — see the comment in
 * src/app/api/admin/reviews/route.ts for why that matters.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      const constructionError = getSupabaseAdminConstructionError();
      if (constructionError) {
        return NextResponse.json(
          { error: "misconfigured", message: constructionError },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const { id } = await params;
    const body = await request.json().catch(() => null);
    const status = body?.status;

    if (typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: "invalid_status" }, { status: 400 });
    }

    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    if (error) {
      return NextResponse.json(
        { error: "update_failed", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
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
