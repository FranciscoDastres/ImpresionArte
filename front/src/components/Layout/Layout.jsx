// Layout.jsx
import TopBanner from "../TopBanner/TopBanner";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Banner superior */}
      {!isLogin && <TopBanner />}
      {/* Header principal */}
      {!isLogin && <Header />}
      {/* Contenido principal */}
      <main>{children}</main>
      {/* Footer */}
      {!isLogin && <Footer />}
    </div>
  );
}

export default Layout;
