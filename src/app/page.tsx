import Hero from "@/components/Hero/Hero";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import CategorySection from "@/components/CategorySection/CategorySection";
import TechShowcase from "@/components/TechShowcase/TechShowcase";
import KeycapsSection from "@/components/KeycapsSection/page";
import TestiMonial from '@/components/Testimonial/Testimonial'
import TechPartners from "@/components/Pertner/Partner";
import TopProducts from "@/components/TopProduct/product";
import AboutPage from "@/components/About/about";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <Hero />
      <FeaturedProducts />
      <KeycapsSection />
      <CategorySection />
      <TopProducts></TopProducts>
      <TestiMonial></TestiMonial>
      <AboutPage></AboutPage>
      <TechPartners />
      {/* <TechShowcase /> */}
      {/* <TestimonialSection /> */}
    </>
  );
}
