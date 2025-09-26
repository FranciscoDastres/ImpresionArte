import HeroSection from "../components/HeroSection/HeroSection";
import CategoryCards from "../components/CategoryCards/CategoryCards";
import PopularProducts from "../components/PopularProducts/PopularProducts";
import SecondaryHeroSection from "../components/SecondaryHeroSection/SecondaryHeroSection";

function Home() {
  return (
    <main className="min-h-screen bg-gray-50" role="main">
      <section className="w-full flex flex-col items-center justify-center bg-gray-200 py-4">
        <HeroSection />
        <CategoryCards />
      </section>


      <section className="w-full mb-10">
        <PopularProducts />
      </section>

      <section className="w-full mb-10">
        <SecondaryHeroSection />
      </section>
    </main>
  );
}

export default Home;
