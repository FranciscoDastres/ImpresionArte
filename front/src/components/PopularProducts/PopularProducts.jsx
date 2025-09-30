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
        setCategories(Array.isArray(res) ? res : []);
        if (Array.isArray(res) && res.length > 0) setActiveCategory(res[0].nombre);
      })
      .catch(err => setError("Error al cargar categorías"))
      .finally(() => setCatLoading(false));
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    setLoading(true);
    ApiService.getProductosPorCategoria(activeCategory)
      .then(res => setProducts(Array.isArray(res) ? res : []))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  if (catLoading)
    return (<div>Cargando categorías...</div>);

  if (error)
    return (<div>Error: {error}</div>);

  return (
    <div>
      {/* ...lo demás del componente... */}
      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            {/* Render del producto */}
            {product.titulo}
          </div>
        ))
      )}
      {!loading && products.length === 0 && (
        <div>No hay productos disponibles en esta categoría.</div>
      )}
    </div>
  );
}

export default PopularProducts;
