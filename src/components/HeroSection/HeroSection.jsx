import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Vasos 3D Personalizados",
      subtitle: "Diseños únicos y coloridos para tu bebida favorita",
      buttonText: "Ver Colección",
      image: "/images/products/vasos3d/colour-glass1.jpg",
    },
    {
      id: 2,
      title: "Navi - Placas Personalizadas",
      subtitle: "Placas decorativas para tu hogar con estilo único",
      buttonText: "Ver Colección",
      image: "/images/products/navi/placa-navi.jpg",
    },
    {
      id: 3,
      title: "Bender - Figuras Coleccionables",
      subtitle: "Personajes únicos para tu colección",
      buttonText: "Ver Colección",
      image: "/images/products/futurama/bender-chulo.jpg",
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
    <div className="herosection-wrapper py-3 px-3 relative">
      {/* Solo overlay de líneas diagonales para efecto tecnológico */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 20px)',
        opacity: 0.7
      }} />
      <section className="w-full px-0 relative z-10">
        <div 
          className="relative w-[95%] mx-auto h-[600px] md:h-[850px] lg:h-[950px] overflow-hidden shadow-2xl rounded-2xl"
          style={{ 
            background: 'transparent',
            backdropFilter: 'blur(10px)'
          }}
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
                    <div className="text-black max-w-lg lg:max-w-xl xl:max-w-2xl">
                      {/* Título */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 transition-transform duration-500 leading-tight text-center md:text-left">
                        {slide.title}
                      </h1>
                      
                      {/* Subtítulo */}
                      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8 lg:mb-10 opacity-90 transition-transform duration-500 leading-relaxed text-center md:text-left">
                        {slide.subtitle}
                      </p>
                      
                      {/* Botón - siempre en la misma posición */}
                      <div className="flex justify-center md:justify-start">
                        <button
                          className="bg-white text-gray-800 rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-3 md:px-10 md:py-4 text-sm md:text-base lg:text-lg shadow-xl border-2 border-white/20"
                          style={{
                            minWidth: "200px",
                            height: "56px"
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
                      className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                      style={{
                        width: "350px",
                        height: "400px",
                        minWidth: "350px",
                        minHeight: "400px"
                      }}
                    >
                      <img
                        src={slide.image}
                        className="w-full h-full object-cover"
                        alt={slide.title}
                        onError={handleImageError}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                      {/* Overlay gradiente sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas - manteniendo el estilo original */}
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