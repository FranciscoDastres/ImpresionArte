import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import NotFound from "./components/NotFound/NotFound"
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import "./index.css"
function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/producto/:productId" element={<Layout><ProductDetail/></Layout>} />
        <Route path="/login" element={<Layout><Login/></Layout>} />
        {/* Futuras rutas */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>

    </div>
  )
}

export default App