import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar producto (limitado por stock si existe)
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      const stock = product.stock ?? Infinity;
      if (found) {
        // Si ya está, aumenta hasta el stock máximo
        const newQuantity = Math.min(found.quantity + 1, stock);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Si no está, agrega uno sólo (si hay stock)
        if (stock > 0) return [...prev, { ...product, quantity: 1 }];
        return prev;
      }
    });
  };

  // Quitar producto
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Cambiar cantidad (limitado por stock y mínimo 1)
  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) => {
        const stock = item.stock ?? Infinity;
        return item.id === productId
          ? { ...item, quantity: Math.min(Math.max(1, quantity), stock) }
          : item;
      })
    );
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Contador total y total precio (con useMemo)
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.precio), 0), [cart]);

  // Get si el stock está superado para algún ítem (ideal para feedback visual)
  const isStockExceeded = (product) => {
    const found = cart.find((item) => item.id === product.id);
    return found && product.stock !== undefined && found.quantity >= product.stock;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isStockExceeded,   // Úsalo en tu botón de "agregar" para deshabilitar
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
