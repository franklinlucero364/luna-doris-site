import "server-only";
import { getSupabaseAdmin, type ReviewRow } from "@/lib/supabase-admin";

export type PublicReview = {
  name: string;
  quote: string;
  photo?: string;
};

/**
 * Approved reviews for the public site. Returns an empty array if
 * Supabase isn't configured yet, or if the query fails — the homepage
 * treats an empty list as "no reviews yet" (see ReviewsSection), never
 * as an error to show visitors.
 */
export async function getApprovedReviews(): Promise<PublicReview[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("name, quote, photo_url")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    // This used to fail silently, which made "approved review isn't
    // showing up" impossible to diagnose from the public site alone.
    // Now the real Postgrest error lands in Vercel's Logs tab (Project →
    // Logs, filter by "Runtime Logs"), and the SAME check is also
    // surfaced directly on /admin (see the "Public site check" line on
    // the dashboard) so this doesn't require digging through Vercel at
    // all in the common case.
    console.error("getApprovedReviews query failed:", error.message);
    return [];
  }
  if (!data) return [];

  return (data as Pick<ReviewRow, "name" | "quote" | "photo_url">[]).map((r) => ({
    name: r.name,
    quote: r.quote,
    photo: r.photo_url ?? undefined,
  }));
}
