import HeroSection from "../components/HeroSection/HeroSection"
import CategoryCards from "../components/CategoryCards/CategoryCards"
import PopularProducts from "../components/PopularProducts/PopularProducts"

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryCards />
      <PopularProducts />
    </div>
  );
}

export default Home
