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
let cachedConstructionError: string | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  if (!cached) {
    // createClient() throws synchronously on a malformed URL (e.g. a
    // stray quote or space from copy-pasting into Vercel) — without this
    // try/catch, that exception propagates straight out of whichever
    // route handler called this, past any of ITS OWN try/catch blocks,
    // and Next.js returns its generic HTML error page instead of JSON.
    // Catching it here means callers always get a clean `null` back, and
    // can ask getSupabaseAdminConstructionError() for what went wrong.
    try {
      cached = createClient(url, key, {
        auth: { persistSession: false },
        global: {
          // Force every request this client makes to bypass Next.js's
          // fetch cache. Without this, Next can treat the Supabase
          // REST calls made here as cacheable data — independent of
          // page-level settings like `dynamic = "force-dynamic"` — and
          // that cache only resets on the next deploy. Symptom seen in
          // production: a newly-approved review wouldn't show up on
          // the homepage until Franklin redeployed, at which point it
          // instantly appeared (a fresh, empty fetch cache after every
          // deploy) — this line removes that cache from the equation
          // entirely so every read is always live.
          fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
        },
      });
      cachedConstructionError = null;
    } catch (err) {
      cachedConstructionError =
        err instanceof Error ? err.message : "Failed to create Supabase client";
      return null;
    }
  }
  return cached;
}

/**
 * If getSupabaseAdmin() just returned null NOT because the env vars are
 * missing, but because creating the client itself failed (almost always
 * a malformed SUPABASE_URL), this holds that error's message. Used by
 * the authenticated /admin routes to show the real reason instead of a
 * generic "not connected yet" — which would be misleading here, since
 * something WAS configured, just incorrectly.
 */
export function getSupabaseAdminConstructionError(): string | null {
  return cachedConstructionError;
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
