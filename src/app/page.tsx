import Hero from "@/components/Hero/Hero";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import CategorySection from "@/components/CategorySection/CategorySection";
import TechShowcase from "@/components/TechShowcase/TechShowcase";
import KeycapsSection from "@/components/KeycapsSection/page";
import TestiMonial from '@/components/Testimonial/Testimonial'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <KeycapsSection />
      <CategorySection />
      <TestiMonial></TestiMonial>
      <TechShowcase />
      {/* <TestimonialSection /> */}
    </>
  );
}
