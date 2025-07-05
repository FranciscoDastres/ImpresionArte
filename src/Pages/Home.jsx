import HeroSection from "../components/HeroSection/HeroSection"
import CategoryCards from "../components/CategoryCards/CategoryCards"
import PopularProducts from "../components/PopularProducts/PopularProducts"

function Home() {
  return (
    <>
      <div className="bg-sky-100">
        <HeroSection />
        <CategoryCards />
      </div>

      <div className="bg-gray-200">
        <PopularProducts />
      </div>
    </>
  );
}

export default Home
