import { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext(); // <--- ESTE ES CLAVE

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  console.log("Producto recibido en addToCart:", product);
  setCart((prev) => {
    const found = prev.find((item) => item.id === product.id);
    const stock = product.stock ?? Infinity;
    let result;
    if (found) {
      const newQuantity = Math.min(found.quantity + 1, stock);
      result = prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: newQuantity }
          : item
      );
    } else {
      // LOG justamente aquí:
      if (stock > 0) {
        console.log("Se va a agregar el producto:", { ...product, quantity: 1 });
        result = [...prev, { ...product, quantity: 1 }];
      } else {
        console.warn("No se agrega porque no hay stock: ", stock, product);
        result = prev;
      }
    }
    console.log("Carrito después de addToCart desde Context:", result);
    return result;
  });
};


  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

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

  const clearCart = () => setCart([]);
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.precio), 0), [cart]);
  const isStockExceeded = (product) => {
    const found = cart.find((item) => item.id === product.id);
    return found && product.stock !== undefined && found.quantity >= product.stock;
  };

  return (
    <CartContext.Provider
      value={{
        cart, addToCart, removeFromCart, updateQuantity, clearCart,
        cartCount, cartTotal, isStockExceeded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
