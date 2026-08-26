import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE ROLE key. This key
 * bypasses Row Level Security, so it must NEVER be imported into a
 * Client Component or sent to the browser. The `server-only` import
 * above makes that a build error instead of a silent leak if anyone
 * ever imports this file from client code by mistake.
 *
 * Returns `null` (instead of throwing) when the required environment
 * variables haven't been set up yet — see README.md → "Reviews: admin
 * setup" — so callers can show a friendly "not connected yet" message
 * rather than crashing the request (or the build — these env vars
 * aren't set at build time either).
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return cached;
}

/** Storage bucket that holds review photos. Create this in Supabase
 * (public bucket) — see README.md. */
export const REVIEW_PHOTOS_BUCKET = "review-photos";

export type ReviewStatus = "pending" | "approved" | "denied";

export type ReviewRow = {
  id: string;
  name: string;
  quote: string;
  photo_url: string | null;
  status: ReviewStatus;
  created_at: string;
};
