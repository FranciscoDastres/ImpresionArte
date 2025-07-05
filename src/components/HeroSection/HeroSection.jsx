import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Shampoo & Soap Essentials",
      subtitle: "Cuidado personal para toda la familia",
      buttonText: "Ver Productos",
      image: "/images/products/domestic/shampoo-and-soap.jpg",
    },
    {
      id: 2,
      title: "Lo Último en Tecnología",
      subtitle: "Encuentra el iPhone y más al mejor precio",
      buttonText: "Explorar",
      image: "/images/products/electronics/iphone.jpg",
    },
    {
      id: 3,
      title: "Estilo Mujer Temporada 2025",
      subtitle: "Estilo y elegancia para esta temporada",
      buttonText: "Descubrir",
      image: "/images/products/fashion/woman-1.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <div className="herosection-wrapper py-3 px-3 bg-sky-500">
      <section className="w-full px-0">
        <div 
          className="relative w-[95%] mx-auto h-[600px] md:h-[850px] lg:h-[950px] overflow-hidden shadow-lg rounded-lg"
          style={{ backgroundColor: '#a5f3fc' }}
        >
          {/* Slides wrapper */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 h-full">
                {/* Grid container para alineación perfecta */}
                <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-0">
                  
                  {/* Columna izquierda - Contenido de texto */}
                  <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-8 lg:px-12">
                    <div className="text-gray-800 max-w-lg lg:max-w-xl xl:max-w-2xl">
                      {/* Título */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 transition-transform duration-500 leading-tight text-center md:text-left">
                        {slide.title}
                      </h1>
                      
                      {/* Subtítulo */}
                      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8 lg:mb-10 opacity-70 transition-transform duration-500 leading-relaxed text-center md:text-left">
                        {slide.subtitle}
                      </p>
                      
                      {/* Botón - siempre en la misma posición */}
                      <div className="flex justify-center md:justify-start">
                        <button
                          className="bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base lg:text-lg shadow-lg"
                          style={{
                            minWidth: "180px",
                            height: "48px"
                          }}
                        >
                          {slide.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha - Imagen */}
                  <div className="flex justify-center items-center p-4 md:p-8">
                    <div 
                      className="flex justify-center items-center bg-gray-50 rounded-lg shadow-xl"
                      style={{
                        width: "300px",
                        height: "300px",
                        minWidth: "300px",
                        minHeight: "300px"
                      }}
                    >
                      <img
                        src={slide.image}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                        alt={slide.title}
                        onError={handleImageError}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;