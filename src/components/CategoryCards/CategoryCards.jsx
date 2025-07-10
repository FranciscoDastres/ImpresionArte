"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/api";

function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getCategorias();
        setCategories(data);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Navegación a la página de productos por categoría
    navigate(`/productos?categoria=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <section className="w-full px-4 py-2">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 py-2">
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
    <section className="w-full px-4 py-2">
      {/* Mobile: slider horizontal, Desktop: grid */}
      <div
        className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar md:grid md:grid-cols-3 md:gap-2 md:overflow-visible md:scroll-auto justify-center mx-auto"
        style={{ maxWidth: '600px' }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.nombre)}
            className="bg-white/90 backdrop-blur-sm aspect-square shadow-lg border border-gray-200 p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl min-w-[140px] md:min-w-0"
          >
            <div className={`${category.color_fondo || 'bg-gray-100'} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4`}>
              <span className={`text-3xl sm:text-4xl ${category.color_icono || 'text-gray-600'}`}>
                {category.icono || '📦'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900">{category.nombre}</h3>
            {category.descripcion && (
              <p className="text-xs text-gray-600 mt-1 hidden sm:block">{category.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
