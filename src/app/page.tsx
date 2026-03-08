import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import FeatureStrip from "@/components/FeatureStrip";
import CategoryGrid from "@/components/CategoryGrid";
import PromoBanner from "@/components/PromoBanner";
import ProductsSection from "@/components/ProductsSection";
import ShopByAge from "@/components/ShopByAge";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Header />
      <HeroSlider />
      <FeatureStrip />
      <CategoryGrid />
      <PromoBanner />
      <ProductsSection />
      <ShopByAge />
      <WhyUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
