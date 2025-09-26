import HeroSection from "../components/HeroSection/HeroSection";
import CategoryCards from "../components/CategoryCards/CategoryCards";
import PopularProducts from "../components/PopularProducts/PopularProducts";
import SecondaryHeroSection from "../components/SecondaryHeroSection/SecondaryHeroSection";

function Home() {
  return (
    <div className="min-h-screen" role="main">
      <HeroSection />
      <CategoryCards />
      <PopularProducts />
      <SecondaryHeroSection />
    </div>
  );
}

export default Home;
