import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiService from "../../services/api";

function RelatedProducts({ category = "vasos3d" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getProductosPorCategoria(category);
        setProducts(data.slice(0, 4));
      } catch (err) {
        setError('Error al cargar productos relacionados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <section className="w-full max-w-5xl mx-auto mt-8 mb-4 rounded-2xl bg-white/80 shadow-lg p-4 sm:p-8 border border-gray-200">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  if (error || !products.length) return null;

  return (
    <section className="w-full max-w-5xl mx-auto mt-8 mb-4 rounded-2xl bg-white/80 shadow-lg p-4 sm:p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-1 text-black drop-shadow-lg">
        Productos Relacionados
      </h2>
      <p className="text-sm text-gray-700 mb-4 drop-shadow-md">
        Te pueden interesar estos productos similares.
      </p>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 pl-2 pr-10">
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
      </div>
    </section>
  );
}

export default RelatedProducts; 