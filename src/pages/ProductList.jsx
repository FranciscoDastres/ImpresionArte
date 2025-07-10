import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ApiService from "../services/api";

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

  const categoriaParam = searchParams.get("categoria");

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
      const matchesCategory = !selectedCategory || product.categoria_nombre === selectedCategory;
      return matchesCategory;
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
    setSelectedCategory("");
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
            <div className="flex flex-wrap gap-6 mb-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] bg-white backdrop-blur-sm rounded-2xl shadow-md p-4 flex-shrink-0 relative border border-gray-200 transition hover:shadow-xl"
                  style={{ flex: '1 1 260px', maxWidth: '320px' }}
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
