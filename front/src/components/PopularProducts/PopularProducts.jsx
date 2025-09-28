import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/api";
import useCart from "../../hooks/useCart";

function PopularProducts() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart, isStockExceeded } = useCart();
  const CLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });

  useEffect(() => {
    ApiService.getCategorias()
      .then(res => {
        setCategories(res);
        if (res.length > 0) setActiveCategory(res[0].nombre);
      })
      .catch(err => setError("Error al cargar categorías"))
      .finally(() => setCatLoading(false));
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    setLoading(true);
    ApiService.getProductosPorCategoria(activeCategory)
      .then(setProducts)
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  if (catLoading)
    return (
      <section className="w-full py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </section>
    );

  if (error)
    return (
      <section className="w-full py-8 text-center text-blue-600">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Reintentar
        </button>
      </section>
    );

  return (
    <section className="relative px-2 sm:px-6 md:px-10 lg:px-32 py-2 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2">
        {/* Título y subtítulo a la izquierda */}
        <div className="flex flex-col sm:items-start sm:justify-start mt-3 sm:mt-0 w-full sm:w-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 sm:mb-0">Popular Products</h2>
          <p className="text-sm text-gray-600">
            No te pierdas las ofertas actuales hasta fin de mes.
          </p>
        </div>
        {/* Categoría Tabs a la derecha */}
        <nav className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto py-2 sm:justify-end sm:ml-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.nombre)}
              className={`pb-2 px-3 text-base font-medium transition uppercase
                ${activeCategory === cat.nombre
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
                }`}
              style={{ outline: "none" }}
              aria-current={activeCategory === cat.nombre ? "page" : undefined}
            >
              {cat.nombre}
            </button>
          ))}
        </nav>
      </div>
      {/* Productos */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mx-auto max-w-7xl w-full justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col bg-white rounded-md border border-gray-200 w-full max-w-[270px] min-h-[410px] mx-auto transition-all"
            >
              {/* El badge SIEMPRE arriba de la imagen y con z-10 */}
              {product.descuento && (
                <span className="absolute z-10 top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                  {product.descuento}%
                </span>
              )}
              <div
                className="w-full h-48 bg-white flex items-center justify-center cursor-pointer"
                onClick={() => navigate(`/producto/${product.id}`)}
                title="Ver detalles del producto"
              >
                <img
                  src={product.imagen_principal}
                  alt={product.titulo}
                  className="object-contain w-full h-full p-2 transition hover:opacity-80"
                  onError={e => { e.target.src = '/images/placeholder.png'; }}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-0.5 px-4 pt-3 pb-4 flex-1">
                <div className="text-gray-500 text-xs mb-0.5 truncate">{product.marca || product.categoria || "Marca"}</div>
                <h3 className="font-medium text-base text-gray-900 leading-tight truncate" title={product.titulo}>
                  {product.titulo}
                </h3>
                <div className="flex items-center gap-0.5 my-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                      <polygon points="10,1.6 12.3,7.6 18.7,7.8 13.6,11.7 15.4,17.8 10,14.2 4.6,17.8 6.4,11.7 1.3,7.8 7.7,7.6" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-end gap-2 mb-3">
                  {product.precio_anterior && (
                    <span className="line-through text-gray-400 text-sm">{CLP.format(product.precio_anterior)}</span>
                  )}
                  <span className="text-blue-500 font-semibold text-lg">{CLP.format(product.precio)}</span>
                </div>
                <button
                  className="flex items-center justify-center gap-2 w-full border border-blue-400 text-blue-500 py-2 rounded-md font-medium mt-2 hover:bg-blue-50 transition"
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
                  <span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <circle cx="9" cy="20" r="1.5" />
                      <circle cx="18" cy="20" r="1.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l3.6 9.59a2 2 0 0 0 1.92 1.41h7.33a2 2 0 0 0 1.95-1.57l1.58-7.59H6" />
                    </svg>
                  </span>
                  {isStockExceeded(product) ? "Agotado" : "Agregar"}
                </button>
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
    </section>
  );
}

export default PopularProducts;
