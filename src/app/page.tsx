import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import CategorySection from "@/components/CategorySection/CategorySection";
import TechShowcase from "@/components/TechShowcase/TechShowcase";
import TestimonialSection from "@/components/TestimonialSection/TestimonialSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <TechShowcase />
      <Features />
      <TestimonialSection />
    </>
  );
}
