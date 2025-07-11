import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ApiService from "../services/api";
import { useCart } from "../contexts/CartContext";

function ProductList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { addToCart } = useCart();

  const categoriaParam = searchParams.get("categoria");
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar categorías
        const categoriesData = await ApiService.getCategorias();
        setCategories(categoriesData);

        // Cargar productos
        let productsData;
        if (categoriaParam) {
          productsData = await ApiService.getProductosPorCategoria(categoriaParam);
          setSelectedCategory(categoriaParam);
        } else {
          productsData = await ApiService.getProductos();
        }

        setProducts(productsData);
      } catch (err) {
        setError('Error al cargar productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoriaParam]);

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter(product => {
      if (!selectedCategory || selectedCategory === 'todas') return true;
      // Normalizar nombres para evitar problemas de mayúsculas/minúsculas y tildes
      return (product.categoria_nombre || '').toLowerCase() === selectedCategory.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.precio - b.precio;
        case "price-high":
          return b.precio - a.precio;
        case "name":
          return a.titulo.localeCompare(b.titulo);
        case "newest":
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("todas");
    setSortBy("newest");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 font-bold mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoriaParam ? `Productos - ${categoriaParam}` : "Todos los Productos"}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filtros y Ordenar */}
        <div className="bg-white/80 rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por categoría */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.nombre}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>
            {/* Ordenar por */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Más recientes</option>
                <option value="price-low">Precio: menor a mayor</option>
                <option value="price-high">Precio: mayor a menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          {(selectedCategory || sortBy !== "newest") && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-black hover:text-gray-700 text-xs font-semibold px-3 py-1 rounded transition-colors border border-black"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Grid de productos */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] mb-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full max-w-xs mx-auto"
                  style={{ flex: '1 1 260px', maxWidth: '320px' }}
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

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-1 rounded border text-xs font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No se encontraron productos que coincidan con los filtros.
            </div>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
