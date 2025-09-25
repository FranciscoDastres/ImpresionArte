import HeroSection from "../components/HeroSection/HeroSection";
import CategoryCards from "../components/CategoryCards/CategoryCards";
import PopularProducts from "../components/PopularProducts/PopularProducts";
import SecondaryHeroSection from "../components/SecondaryHeroSection/SecondaryHeroSection";

function Home() {
  return (
    <main className="min-h-screen" role="main">
      <HeroSection />
      <CategoryCards />
      <PopularProducts />
      <SecondaryHeroSection />
    </main>
  );
}

export default Home;
