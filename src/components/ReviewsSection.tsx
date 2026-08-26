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
  return <ReviewsClient reviews={reviews} />;
}
