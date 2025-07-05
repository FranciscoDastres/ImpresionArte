import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const data = {
  vasos3d: [
    {
      title: "Vaso 3D Verde",
      price: "$25.00",
      oldPrice: "$30.00",
      image: "/images/products/vasos3d/green-glass.jpg",
      discount: "17%",
    },
    {
      title: "Vaso 3D Amarillo",
      price: "$22.00",
      oldPrice: "$28.00",
      image: "/images/products/vasos3d/yellow-glass1.jpg",
      discount: "21%",
    },
    {
      title: "Vaso 3D  Rojo",
      price: "$24.00",
      oldPrice: "$29.00",
      image: "/images/products/vasos3d/colour-glass2.jpg",
      discount: "17%",
    },
    {
      title: "Vaso 3D Amarillo-Rojo",
      price: "$26.00",
      oldPrice: "$32.00",
      image: "/images/products/vasos3d/yellow-red-glass.jpg",
      discount: "19%",
    },
  ],
  navi: [
    {
      title: "Placa Navi Honda",
      price: "$45.00",
      oldPrice: "$55.00",
      image: "/images/products/navi/honda.jpg",
      discount: "18%",
    },
    {
      title: "Placa Navi Decorativa",
      price: "$38.00",
      oldPrice: "$48.00",
      image: "/images/products/navi/placa-navi2.jpg",
      discount: "21%",
    },
    {
      title: "Placa Navi Estilo Clásico",
      price: "$42.00",
      oldPrice: "$52.00",
      image: "/images/products/navi/placa-navi3.jpg",
      discount: "19%",
    },
    {
      title: "Placa Navi Moderna",
      price: "$40.00",
      oldPrice: "$50.00",
      image: "/images/products/navi/placa-navi4.jpg",
      discount: "20%",
    },
  ],
  figuras: [
    {
      title: "Bender Chulo",
      price: "$35.00",
      oldPrice: "$45.00",
      image: "/images/products/futurama/bender-chulo.jpg",
      discount: "22%",
    },
    {
      title: "Figura Unknown 1",
      price: "$28.00",
      oldPrice: "$38.00",
      image: "/images/products/robots/Unknow_1.jpg",
      discount: "26%",
    },
    {
      title: "Figura Unknown 2 Weapon",
      price: "$32.00",
      oldPrice: "$42.00",
      image: "/images/products/robots/Unknow_2.jpg",
      discount: "24%",
    },
  ],
};
const categories = Object.keys(data);

function PopularProducts() {
  const carouselRef = useRef();
  const [activeCategory, setActiveCategory] = useState("vasos3d");
  const products = data[activeCategory];

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 300;
    direction === "left"
      ? (container.scrollLeft -= scrollAmount)
      : (container.scrollLeft += scrollAmount);
  };

  return (
    <section className="relative px-6 py-8">
      <h2 className="text-2xl font-bold mb-1 text-black drop-shadow-lg">Productos Populares</h2>
      <p className="text-sm text-gray-700 mb-4 drop-shadow-md">
        No te pierdas las ofertas actuales hasta fin de mes.
      </p>

      {/* Categorías */}
      <div className="flex gap-6 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`uppercase text-sm font-semibold ${
              activeCategory === cat
                ? "text-black border-b-2 border-black"
                : "text-gray-700 hover:text-black"
            } pb-1 transition-colors`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flecha Izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg p-2 rounded-full hover:scale-105 border border-white/30"
      >
        <ChevronLeft />
      </button>

      {/* Carrusel de productos */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 flex-shrink-0 relative border border-gray-200"
          >
            <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
              {product.discount}
            </span>
            <div className="w-40 h-40 flex items-center justify-center mb-2 bg-gray-100/80 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-semibold text-sm truncate">{product.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">{product.price}</span>
              <span className="line-through text-gray-400 text-sm">
                {product.oldPrice}
              </span>
            </div>
            <button className="mt-3 w-full border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2">
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Flecha Derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg p-2 rounded-full hover:scale-105 border border-white/30"
      >
        <ChevronRight />
      </button>
    </section>
  );
}

export default PopularProducts;
