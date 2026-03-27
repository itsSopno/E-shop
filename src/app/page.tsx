import Hero from "@/components/Hero/Hero";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import CategorySection from "@/components/CategorySection/CategorySection";
import TechShowcase from "@/components/TechShowcase/TechShowcase";
import KeycapsSection from "@/components/KeycapsSection/page";
import TestiMonial from '@/components/Testimonial/Testimonial'
import TechPartners from "@/components/Pertner/Partner";
import TopProducts from "@/components/TopProduct/product";
import AboutPage from "@/components/About/about";
import Footer from "@/components/Footer/Footer";
import Collection from "@/components/Collection/collection"
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <Collection />
      <KeycapsSection />
      <TopProducts></TopProducts>
      <TestiMonial></TestiMonial>
      <AboutPage></AboutPage>
      <TechPartners />
      <Footer />
      {/* <TechShowcase /> */}
      {/* <TestimonialSection /> */}
    </>
  );
}
