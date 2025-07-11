import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiService from "../../services/api";
import { useCart } from "../../contexts/CartContext";

function RelatedProducts({ category = "vasos3d" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] pb-2 pl-2 pr-10">
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
                  <button className="flex-1 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2"
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to cart
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
      </div>
    </section>
  );
}

export default RelatedProducts; 