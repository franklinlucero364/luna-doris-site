import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceExperience from "@/components/ServiceExperience";
import PricingSection from "@/components/PricingSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";

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
