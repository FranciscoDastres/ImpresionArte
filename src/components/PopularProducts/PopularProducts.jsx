import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/api";

function PopularProducts() {
  const carouselRef = useRef();
  const [activeCategory, setActiveCategory] = useState("vasos3d");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiService.getCategorias();
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0].nombre);
        }
      } catch (err) {
        setError('Error al cargar categorías');
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Cargar productos por categoría
  useEffect(() => {
    const fetchProducts = async () => {
      if (!activeCategory) return;
      
      try {
        setLoading(true);
        const data = await ApiService.getProductosPorCategoria(activeCategory);
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 300;
    if (!container) return;
    container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
  };

  if (error) {
    return (
      <section className="relative px-2 sm:px-6 py-8">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-2 sm:px-6 py-8">
      <h2 className="text-2xl font-bold mb-1 text-black drop-shadow-lg">
        Productos Populares
      </h2>
      <p className="text-sm text-gray-700 mb-4 drop-shadow-md">
        No te pierdas las ofertas actuales hasta fin de mes.
      </p>

      {/* Categorías */}
      <div className="flex gap-6 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.nombre)}
            className={`uppercase text-sm font-semibold ${
              activeCategory === cat.nombre
                ? "text-black border-b-2 border-black"
                : "text-gray-700 hover:text-black"
            } pb-1 transition-colors`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Flecha Izquierda */}
      {!loading && products.length > 0 && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg p-1 sm:p-2 rounded-full hover:scale-105 border border-white/30"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Carrusel de productos */}
      {!loading && (
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2 pl-2 pr-10"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white backdrop-blur-sm rounded-2xl shadow-md p-4 flex-shrink-0 relative border border-gray-200 transition hover:shadow-xl"
            >
              {product.descuento && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                  {product.descuento}
                </span>
              )}

              <div className="w-full h-48 flex items-center justify-center mb-4 bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.imagen_principal}
                  alt={product.titulo}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              <h3 className="font-medium text-sm text-gray-800 mb-1 truncate">
                {product.titulo}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-bold text-base">${product.precio}</span>
                {product.precio_anterior && (
                  <span className="line-through text-gray-400 text-sm">
                    ${product.precio_anterior}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-full bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2">
                  🛒 Añadir al Carrito
                </button>

                <button
                  className="w-full border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
                  onClick={() => navigate(`/producto/${product.id}`)}
                >
                  🔍 Más Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay productos */}
      {!loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hay productos disponibles en esta categoría.</p>
        </div>
      )}

      {/* Flecha Derecha */}
      {!loading && products.length > 0 && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg p-1 sm:p-2 rounded-full hover:scale-105 border border-white/30"
        >
          <ChevronRight />
        </button>
      )}
    </section>
  );
}

export default PopularProducts;
