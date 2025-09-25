import useCart from "../hooks/useCart";

function Cart() {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  if (cart.length === 0) {
    return <div className="text-center py-20 text-gray-600">Tu carrito está vacío.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="flex justify-between border-b py-2 items-center">
            <span>{item.name || item.titulo}</span>
            <div className="flex items-center">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span className="mx-2">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)} className="ml-3 text-red-500">Quitar</button>
            </div>
            <span className="ml-4">{CLP.format(item.precio * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-6 font-bold text-lg">
        <span>Total {cartCount} productos</span>
        <span>{CLP.format(cartTotal)}</span>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
        Ir a pagar
      </button>
      <button className="mt-2 w-full text-xs text-gray-500 underline" onClick={clearCart}>
        Vaciar carrito
      </button>
    </div>
  );
}

export default Cart;
