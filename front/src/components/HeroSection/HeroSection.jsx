import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from "react-router-dom";

const slides = [
  { id: 1, title: "Vasos 3D Personalizados", subtitle: "Diseños únicos y coloridos para tu bebida favorita", buttonText: "Ver Colección", image: "/images/products/vasos3d/colour-glass1.jpg", categoria: "vasos3d" },
  { id: 2, title: "Navi - Placas Personalizadas", subtitle: "Placas decorativas para tu hogar con estilo único", buttonText: "Ver Colección", image: "/images/products/navi/placa-navi.jpg", categoria: "navi" },
  { id: 3, title: "Bender - Figuras Coleccionables", subtitle: "Personajes únicos para tu colección", buttonText: "Ver Colección", image: "/images/products/futurama/bender-chulo.jpg", categoria: "figuras" },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center pt-2">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={36}
          slidesPerView={1}
          centeredSlides
          navigation
          loop
          autoplay={{ delay: 4800, disableOnInteraction: false }}
          speed={800}
          className="w-full min-h-[370px] md:min-h-[500px] rounded-2xl"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full flex justify-center">
                <div
                  className="w-full"
                  style={{
                    maxWidth: "calc(100vw - 300px)", // ← 150px a cada lado en desktop
                    paddingLeft: "16px", // padding en mobile/tablet
                    paddingRight: "16px"
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white rounded-2xl shadow-2xl h-[370px] md:h-[500px] overflow-hidden">
                    <div className="flex flex-col items-start justify-center h-full px-9 md:px-16">
                      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{slide.title}</h1>
                      <p className="text-base md:text-xl text-gray-700 mb-5">{slide.subtitle}</p>
                      <button
                        className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-600 transition text-base"
                        onClick={() => navigate(`/productos?categoria=${slide.categoria}`)}
                      >
                        {slide.buttonText}
                      </button>
                    </div>
                    <div className="flex justify-end items-center h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="rounded-2xl shadow-lg w-full max-w-[600px] h-[240px] md:h-[400px] object-cover bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
