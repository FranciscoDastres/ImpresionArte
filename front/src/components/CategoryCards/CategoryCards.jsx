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

  // mínimo 6 tarjetas, con productos ficticios si faltan
  const productosImaginarios = [
    { id: "imag4", nombre: "Producto Imaginario 4", icono: "🧸", color_fondo: "bg-gray-200", color_icono: "text-gray-700" },
    { id: "imag5", nombre: "Producto Imaginario 5", icono: "🪁", color_fondo: "bg-gray-200", color_icono: "text-gray-700" },
    { id: "imag6", nombre: "Producto Imaginario 6", icono: "🎲", color_fondo: "bg-gray-200", color_icono: "text-gray-700" }
  ];
  
  let shownCategories = [
    ...categories,
    ...productosImaginarios
  ].slice(0, 6);

  if (loading)
    return (
      <section className="w-full py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </section>
    );


  if (error)
    return (
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

  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
        {shownCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => !cat.disabled && handleCategoryClick(cat.nombre)}
            className={`shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer
              ${cat.disabled ? "opacity-0 pointer-events-none" : "hover:shadow-2xl hover:scale-105 transition"}
              aspect-square min-w-[120px] max-w-[180px]`}
            style={{ height: "160px" }}
          >
            <div className={`${cat.color_fondo || 'bg-blue-100'} w-16 h-16 flex items-center justify-center mb-3`}>
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
