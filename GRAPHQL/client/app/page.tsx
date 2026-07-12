import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import Categories from "@/components/Categories";
import NewArrivals from "@/components/NewArrivals";
import BestSellers from "@/components/BestSellers";
import PromoBanners from "@/components/PromoBanners";
import EndpointsSection from "@/components/EndpointsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureBar />
      <Categories />
      <NewArrivals />
      <BestSellers />
      <PromoBanners />
      <EndpointsSection />
      <Footer />
    </main>
  );
}