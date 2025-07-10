// Layout.jsx
import TopBanner from "../TopBanner/TopBanner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SecondaryHeroSection from "../SecondaryHeroSection/SecondaryHeroSection";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <>
      {!isLogin && <TopBanner />}
      {!isLogin && <Header />}
      <main>{children}</main>
      {!isLogin && <SecondaryHeroSection />}
      {!isLogin && <Footer />}
    </>
  );
}

export default Layout;
