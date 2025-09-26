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
                    className="w-full min-h-[260px] sm:min-h-[360px] xl:min-h-[540px]"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-[1800px] px-2 md:px-12 xl:px-24">
                                    <div className="grid grid-cols-1 md:grid-cols-2 items-center rounded-2xl h-[260px] sm:h-[340px] md:h-[410px] xl:h-[520px] overflow-hidden bg-transparent">

                                        {/* Texto - igual */}
                                        <div className="flex flex-col items-start justify-center h-full px-2 md:px-14 xl:px-24">
                                            <h1 className="text-base sm:text-2xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
                                                {slide.title}
                                            </h1>
                                            <p className="text-xs sm:text-base md:text-xl xl:text-2xl text-gray-700 mb-3 xl:mb-6">
                                                {slide.subtitle}
                                            </p>

                                            {/* DESKTOP botón debajo del texto, NO se ve en mobile */}
                                            <button
                                                className="hidden md:inline-block bg-blue-500 text-white font-semibold px-7 xl:px-10 py-3 xl:py-4 rounded-full hover:bg-blue-600 transition text-base xl:text-lg"
                                                onClick={() => navigate(`/productos?categoria=${slide.categoria}`)}
                                            >
                                                {slide.buttonText}
                                            </button>
                                        </div>

                                        {/* Imagen + botón mobile */}
                                        <div className="flex flex-col items-center justify-center h-full w-full">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="rounded-2xl w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] xl:max-w-[680px] h-[160px] sm:h-[220px] md:h-[320px] xl:h-[440px] object-contain bg-transparent mx-auto"
                                            />
                                            {/* SOLO MOBILE: Botón centrado bajo imagen */}
                                            <button
                                                className="mt-3 md:hidden bg-blue-500 text-white font-semibold px-4 py-1.5 rounded-full hover:bg-blue-600 transition text-xs w-[70%] max-w-[160px] mx-auto"
                                                onClick={() => navigate(`/productos?categoria=${slide.categoria}`)}
                                            >
                                                {slide.buttonText}
                                            </button>
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
