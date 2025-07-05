// Layout.jsx
import TopBanner from "../TopBanner/TopBanner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SecondaryHeroSection from "../SecondaryHeroSection/SecondaryHeroSection";
function Layout({ children }) {
  return (
    <>
      <TopBanner />
      <Header />
      <main>{children}</main>
      <SecondaryHeroSection />
      <Footer />
    </>
  );
}

export default Layout;
