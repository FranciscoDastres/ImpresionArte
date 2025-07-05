import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Imagen del producto */}
      <div className="relative pb-[100%] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Contenido del producto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;