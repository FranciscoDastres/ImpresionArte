import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart, cartTotal } = useCart();
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500 text-center mb-6">Tu carrito está vacío.</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-6">
            {cart.map((item) => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {item.imagen && (
                    <img src={item.imagen} alt={item.nombre} className="w-14 h-14 object-cover rounded" />
                  )}
                  <div>
                    <div className="font-medium text-gray-800">{item.nombre}</div>
                    <div className="text-xs text-gray-500">Cantidad: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-semibold text-gray-700">{CLP.format(item.precio * item.quantity)}</div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-lg text-gray-800">Total:</span>
            <span className="font-bold text-xl text-blue-600">{CLP.format(cartTotal)}</span>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition mb-2"
            disabled
          >
            Proceder al pago (próximamente)
          </button>
          <Link to="/" className="block text-center text-gray-500 underline mt-2">Seguir comprando</Link>
        </>
      )}
    </div>
  );
}
