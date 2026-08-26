import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceExperience from "@/components/ServiceExperience";
import PricingSection from "@/components/PricingSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";

// ReviewsSection fetches approved reviews from Supabase on every request
// (see src/lib/reviews-data.ts) so an approval made in /admin appears here
// immediately — no redeploy, no waiting for a cache to expire.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServiceExperience />
      <PricingSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
