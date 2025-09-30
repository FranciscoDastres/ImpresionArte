import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/api";

function CategoryCards() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getCategorias()
            .then(res => setCategories(Array.isArray(res) ? res : []))
            .catch(err => {
                setError("Error al cargar categorías");
                console.error(err);
            })
            .finally(() => setLoading(false));
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
        return (<div>Cargando categorías...</div>);

    if (error)
        return (<div>Error: {error}</div>);

    return (
        <div>
            {shownCategories.map((cat) => (
                <div
                    key={cat.id}
                    onClick={() => !cat.disabled && handleCategoryClick(cat.nombre)}
                    className="card-categoria"
                    style={{ height: "160px" }}
                >
                    <span>{cat.icono || '📦'}</span>
                    <h3>{cat.nombre}</h3>
                </div>
            ))}
        </div>
    );
}

export default CategoryCards;
