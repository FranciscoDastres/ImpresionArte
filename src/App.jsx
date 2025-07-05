import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import HomePage from "./pages/Home"
import NotFound from "./components/NotFound/NotFound"
import "./index.css"
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ef] via-[#b3e0ff] to-[#f0faff]">
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        {/* Futuras rutas */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>

    </div>
  )
}

export default App