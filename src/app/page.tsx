import Hero from "@/components/Hero/Hero";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import CategorySection from "@/components/CategorySection/CategorySection";
import TechShowcase from "@/components/TechShowcase/TechShowcase";
import KeycapsSection from "@/components/KeycapsSection/KeycapsSection";
import TestimonialSection from "@/components/TestimonialSection/TestimonialSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <KeycapsSection />
      <CategorySection />
      <TechShowcase />
      <TestimonialSection />
    </>
  );
}
