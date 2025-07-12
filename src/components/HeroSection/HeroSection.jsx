import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Vasos 3D Personalizados",
      subtitle: "Diseños únicos y coloridos para tu bebida favorita",
      buttonText: "Ver Colección",
      image: "/images/products/vasos3d/colour-glass1.jpg",
      categoria: "vasos3d",
    },
    {
      id: 2,
      title: "Navi - Placas Personalizadas",
      subtitle: "Placas decorativas para tu hogar con estilo único",
      buttonText: "Ver Colección",
      image: "/images/products/navi/placa-navi.jpg",
      categoria: "navi",
    },
    {
      id: 3,
      title: "Bender - Figuras Coleccionables",
      subtitle: "Personajes únicos para tu colección",
      buttonText: "Ver Colección",
      image: "/images/products/futurama/bender-chulo.jpg",
      categoria: "figuras",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[520px] lg:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#60a5fa] via-[#38bdf8] to-[#a78bfa] py-8 px-2 md:px-8">
      {/* Flecha Izquierda */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full hover:scale-105 border border-gray-200"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Contenido principal en grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Columna Izquierda: Texto */}
        <div className="flex flex-col items-start justify-center h-full px-4 md:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 max-w-xl drop-shadow-md">
            {slide.subtitle}
          </p>
          <button className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all text-lg"
            onClick={() => navigate(`/productos?categoria=${slide.categoria}`)}
          >
            {slide.buttonText}
          </button>
        </div>
        {/* Columna Derecha: Imagen */}
        <div className="flex justify-center items-center">
          <img
            src={slide.image}
            alt={slide.title}
            className="rounded-2xl shadow-2xl w-full max-w-md h-[340px] object-cover bg-white"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Flecha Derecha */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full hover:scale-105 border border-gray-200"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </section>
  );
}

export default HeroSection;