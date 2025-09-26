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
    <section className="w-full py-8 flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </section>
  );
  if (error) return (
    <section className="w-full py-8 text-center text-red-600">
      <p>Error: {error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Reintentar
      </button>
    </section>
  );

  // Si tienes menos de 5 categorías, rellenamos para que se vea la fila completa
  const filledCategories = [
    ...categories,
    ...Array.from({ length: Math.max(0, 5 - categories.length) }, (_, i) => ({
      id: `empty${i}`,
      nombre: "",
      icono: "",
      color_fondo: "bg-transparent",
      color_icono: "",
      disabled: true,
    }))
  ].slice(0, 5);

  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto flex justify-center gap-7 px-2 overflow-x-auto scrollbar-hide">
        {filledCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => !cat.disabled && handleCategoryClick(cat.nombre)}
            className={`bg-white shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer
              ${cat.disabled ? "opacity-0 pointer-events-none" : "hover:shadow-2xl hover:scale-105 transition"}
              aspect-square min-w-[140px] max-w-[180px] rounded-3xl`}
            style={{ height: "180px" }}
          >
            <div className={`${cat.color_fondo || 'bg-blue-100'} w-16 h-16 rounded-2xl flex items-center justify-center mb-3`}>
              <span className={`text-4xl ${cat.color_icono || 'text-blue-500'}`}>{cat.icono || '📦'}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">{cat.nombre}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
