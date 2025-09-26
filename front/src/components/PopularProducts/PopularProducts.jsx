import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/api";
import useCart from "../../hooks/useCart";

function PopularProducts() {
  const carouselRef = useRef();
  const [activeCategory, setActiveCategory] = useState("vasos3d");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart, isStockExceeded } = useCart();
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

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
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
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
      <h2 className="text-2xl font-bold mb-1 text-black drop-shadow-lg">Productos Populares</h2>
      <p className="text-sm text-gray-700 mb-4 drop-shadow-md">No te pierdas las ofertas actuales hasta fin de mes.</p>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && products.length > 0 && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg p-1 sm:p-2 rounded-full hover:scale-105 border border-white/30"
        >
          <ChevronLeft />
        </button>
      )}

      {!loading && (
        <div
          ref={carouselRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-4 pb-2 pl-2 pr-10 xl:pr-20"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full max-w-xs mx-auto"
            >
              <div className="relative w-full h-60 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.imagen_principal}
                  alt={product.titulo}
                  className="object-contain w-full h-full"
                  onError={e => { e.target.src = '/images/placeholder.png'; }}
                  loading="lazy"
                />
                {product.descuento && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                    -{product.descuento}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div className="flex gap-2 mb-1">
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">stock ready</span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">official store</span>
                </div>
                <h3 className="font-bold text-lg text-black mb-1 truncate">{product.titulo}</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-black text-xl font-bold">{CLP.format(product.precio)}</span>
                  {product.precio_anterior && (
                    <span className="line-through text-gray-400 text-base">{CLP.format(product.precio_anterior)}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className={`flex-1 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2
                      ${isStockExceeded(product) ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    onClick={() => {
                      addToCart({
                        ...product,
                        precio: typeof product.precio === "number" ? product.precio : parseFloat(product.precio ?? product.precio_anterior ?? 0),
                        id: product.id ?? product._id,
                        quantity: 1,
                        stock: product.stock ?? 99,
                        nombre: product.titulo ?? product.nombre
                      });
                    }}
                    disabled={isStockExceeded(product)}
                    aria-label={`Agregar ${product.titulo} al carrito`}
                  >
                    🛒 {isStockExceeded(product) ? "Sin stock" : "Agregar a carrito"}
                  </button>
                  <button className="bg-gray-100 text-gray-500 p-2 rounded-xl hover:bg-gray-200 transition" title="Más detalles" onClick={() => navigate(`/producto/${product.id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.522 4.5 12 4.5c4.478 0 8.577 3.01 9.964 7.183.07.207.07.431 0 .639C20.577 16.49 16.478 19.5 12 19.5c-4.478 0-8.577-3.01-9.964-7.183z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hay productos disponibles en esta categoría.</p>
        </div>
      )}

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
