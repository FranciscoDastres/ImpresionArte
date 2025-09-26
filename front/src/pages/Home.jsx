import HeroSection from "../components/HeroSection/HeroSection";
import CategoryCards from "../components/CategoryCards/CategoryCards";
import PopularProducts from "../components/PopularProducts/PopularProducts";
import SecondaryHeroSection from "../components/SecondaryHeroSection/SecondaryHeroSection";

function Home() {
  return (
    <main className="min-h-screen bg-white" role="main">
      {/* Hero y Categorías integrados */}
      <div className="w-full flex flex-col items-center justify-center pb-2">
        <HeroSection />
        <CategoryCards />
      </div>

      {/* Otros bloques */}
      <PopularProducts />
      <SecondaryHeroSection />
    </main>
  );
}

export default Home;
