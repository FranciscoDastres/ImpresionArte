"use client";

import { useState } from "react";
import { motion } from "framer-motion";  // Animaciones

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServiceCards from "./components/ServiceCards";
import FeaturedWorks from "./components/FeaturedWorks";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import "./index.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <HeroSection />
            <ServiceCards />
            <FeaturedWorks />
            <Testimonials />
            <ContactSection />
          </>
        );
      case "servicios":
        return <ServiceCards fullPage={true} />;
      case "galeria":
        return <FeaturedWorks fullPage={true} />;
      case "contacto":
        return <ContactSection fullPage={true} />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-secondary font-sans">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {renderPage()}
        </motion.section>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
