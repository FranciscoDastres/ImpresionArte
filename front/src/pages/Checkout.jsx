import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [notas, setNotas] = useState("");
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
                    <img src={item.imagen} alt={item.nombre || item.titulo} className="w-14 h-14 object-cover rounded" />
                  )}
                  <div>
                    <div className="font-medium text-gray-800">{item.nombre || item.titulo}</div>
                    <div className="text-xs text-gray-500">
                      <button 
                        className="px-2 mx-1 rounded bg-gray-100 font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        aria-label="Restar unidad"
                      >-</button>
                      Cantidad: {item.quantity}
                      <button 
                        className="px-2 mx-1 rounded bg-gray-100 font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Sumar unidad"
                      >+</button>
                    </div>
                    <button 
                      className="text-xs text-red-500 mt-1 underline"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Quitar producto"
                    >Quitar</button>
                  </div>
                </div>
                <div className="font-semibold text-gray-700 text-right">
                  <div className="text-sm mb-1">Unitario: {CLP.format(item.precio)}</div>
                  <div className="font-bold">{CLP.format(item.precio * item.quantity)}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-semibold">
              Notas / Comentario (opcional)
            </label>
            <textarea
              value={notas}
              onChange={e => setNotas(e.target.value)}
              className="w-full border-gray-300 rounded py-2 px-3 focus:border-blue-300"
              rows={2}
              placeholder="¿Tienes alguna instrucción especial?"
            />
          </div>
          {/* Espacio reservado para dirección/envío/cupones */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Opcional: Aquí podrías mostrar la dirección o el campo para cupon */}
          </div>
          <div className="flex flex-col gap-3 mb-6 bg-blue-50 rounded p-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>{CLP.format(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Envío:</span>
              <span>{CLP.format(3500)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-blue-700">
              <span>Total a pagar:</span>
              <span>{CLP.format(cartTotal + 3500)}</span>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition mb-2"
            disabled
            aria-label="Proceder al pago"
          >
            Proceder al pago (próximamente)
          </button>
          <button
            className="block w-full text-xs text-gray-500 underline mb-2"
            onClick={clearCart}
            aria-label="Vaciar carrito"
          >
            Vaciar carrito
          </button>
          <Link to="/" className="block text-center text-gray-500 underline mt-2">Seguir comprando</Link>
        </>
      )}
    </div>
  );
}
