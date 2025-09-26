import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/api";

function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    ApiService.getCategorias()
      .then(setCategories)
      .catch(err => {
        setError("Error al cargar categorías");
        console.error(err);
      })
      .finally(() => isMounted && setLoading(false));
    return () => { isMounted = false; };
  }, []);

  const handleCategoryClick = categoryName => {
    navigate(`/productos?categoria=${encodeURIComponent(categoryName)}`);
  };

  if (loading) return (
    <section className="w-full px-4 py-2 flex justify-center items-center h-32">
      {/* Puedes probar un loader animado de Tailwind o skeleton cards! */}
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </section>
  );

  if (error) return (
    <section className="w-full px-4 py-2 text-center text-red-600">
      <p>Error: {error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Reintentar
      </button>
    </section>
  );

  return (
    <section className="w-full px-4 py-2">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center mx-auto"
        style={{ maxWidth: '800px' }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.nombre)}
            className="bg-white/90 backdrop-blur-sm aspect-square shadow-lg border border-gray-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl min-w-[140px] md:min-w-0"
          >
            <div className={`${cat.color_fondo || 'bg-gray-100'} w-20 h-20 rounded-full flex items-center justify-center mb-4`}>
              <span className={`text-3xl ${cat.color_icono || 'text-gray-600'}`}>
                {cat.icono || '📦'}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-900">{cat.nombre}</h3>
            {cat.descripcion && (
              <p className="text-xs text-gray-600 mt-1 hidden sm:block">{cat.descripcion}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default CategoryCards;
