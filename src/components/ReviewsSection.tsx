import { getApprovedReviews } from "@/lib/reviews-data";
import ReviewsClient from "./ReviewsClient";

/**
 * Server Component — fetches approved reviews fresh from Supabase on
 * every request (see `dynamic = "force-dynamic"` in the page above this)
 * so a review approved in /admin shows up immediately, with no redeploy.
 * All the interactive bits (carousel, "leave a review" modal) live in
 * ReviewsClient.
 */
export default async function ReviewsSection() {
  const reviews = await getApprovedReviews();
  return (
    <>
      {/* Temporary debug marker — remove once the "approved review takes
          a long time to show up" investigation is closed. Visible only
          via "View Page Source"; proves whether this render is actually
          fresh (a changing timestamp/count on reload) or being served
          from a cache somewhere (a frozen timestamp). */}
      <div
        hidden
        data-reviews-debug={`rendered ${new Date().toISOString()} — ${reviews.length} approved`}
      />
      <ReviewsClient reviews={reviews} />
    </>
  );
}
