import React from 'react';
import { useCart } from "../../hooks/useCart";

function ProductCard({ product, onAddToCart }) {
  const { isStockExceeded, addToCart } = useCart();
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  // Elige cuál función usará el botón: prioridad a onAddToCart (prop), o si no, usa addToCart del context
  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Imagen del producto */}
      <div className="relative pb-[100%] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={`Imagen de ${product.name}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.target.src = '/images/placeholder.png'; }}
          loading="lazy"
        />
      </div>

      {/* Contenido del producto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-blue-600 font-bold">{CLP.format(product.price)}</p>
        <button
          className={`mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors
            ${isStockExceeded(product) ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={handleAdd}
          disabled={isStockExceeded(product)}
          aria-label="Añadir este producto al carrito"
        >
          {isStockExceeded(product) ? "Sin stock" : "Añadir al carrito"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
