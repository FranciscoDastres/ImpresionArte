"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Heart, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/api";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAdmin, isClient } = useAuth();
  const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getCategorias();
        setCategories(data);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error(err);
        // Usar categorías por defecto en caso de error
        setCategories([
          {
            id: 1,
            nombre: "Vasos 3D",
            descripcion: "Vasos personalizados en 3D",
          },
          {
            id: 2,
            nombre: "Placas Navi",
            descripcion: "Placas decorativas Navi",
          },
          {
            id: 3,
            nombre: "Figuras",
            descripcion: "Figuras coleccionables 3D",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <header className="border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-10 mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg text-gray-800">ImpresionArte</div>
                <div className="text-xs text-gray-600">Impresiones 3D Personalizadas</div>
              </div>
            </a>

            {/* Search Bar */}
            {/* Search Bar Grande y Centrado */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full h-12 rounded-lg bg-gray-200 text-gray-800 placeholder:text-gray-500 px-5 pr-12 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base border border-gray-300"
                    style={{ fontWeight: 500 }}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>


            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {/* User Menu */}
                  <div className="relative user-menu">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>{user.nombre}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        {isAdmin() && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Panel Admin</span>
                          </Link>
                        )}
                        {isClient() && (
                          <Link
                            to="/client"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>Mi Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                            navigate("/");
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Iniciar Sesión</Link>
                  <span className="text-gray-400">|</span>
                  <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-colors">Registro</Link>
                </>
              )}
              <button className="p-2 hover:text-blue-600 transition-colors relative" onClick={() => setCartSidebarOpen(true)}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-b border-gray-200 bg-white">
          <Link to="/login" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Iniciar Sesión</Link>
          <Link to="/register" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Registro</Link>
          <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Favoritos</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Carrito</a>
          <div className="pt-2 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-900 mb-2">Categorías</div>
            {loading ? (
              <div className="text-sm text-gray-500">Cargando categorías...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error al cargar categorías</div>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/productos?categoria=${encodeURIComponent(category.nombre)}`}
                  className="block text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.nombre}
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {/* Navigation Desktop */}
      <nav className="border-b border-gray-200 hidden md:block bg-white">
        <div className="px-10 mx-auto">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              {/* Sidebar Categorías Desktop */}
              <div className="relative">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center space-x-2 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="font-medium">COMPRAR POR CATEGORÍA</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Sidebar y Overlay */}
                <>
                  {/* Overlay */}
                  <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${sidebarOpen ? "block" : "hidden"
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  />
                  {/* Sidebar con transición */}
                  <div
                    className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                      }`}
                  >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-800">ImpresionArte</div>
                          <div className="text-xs text-gray-600">Impresiones 3D Personalizadas</div>
                        </div>
                      </div>
                      <button onClick={() => setSidebarOpen(false)}>
                        <X className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      <ul className="space-y-2">
                        {categories.map((cat) => (
                          <li key={cat.id}>
                            <Link
                              to={`/productos?categoria=${encodeURIComponent(cat.nombre)}`}
                              className="text-gray-700 hover:text-blue-600 text-base font-medium py-2 px-2 rounded transition block"
                            >
                              {cat.nombre}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              </div>

              {/* Enlaces directos a categorías */}
              <div className="flex space-x-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/productos?categoria=${encodeURIComponent(category.nombre)}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {category.nombre}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span>Envío Gratis en Compras Mayores a $20.000</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${cartSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg text-gray-800">Carrito de compras</span>
          </div>
          <button onClick={() => setCartSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center mt-10">Tu carrito está vacío.</div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-3">
                    {item.imagen && (
                      <img src={item.imagen} alt={item.nombre} className="w-12 h-12 object-cover rounded" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{item.nombre}</div>
                      <div className="text-xs text-gray-500">{CLP.format(item.precio)} x {item.quantity}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 mt-1">Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="flex justify-between font-semibold text-gray-800 mb-2">
              <span>Total:</span>
              <span>{CLP.format(cartTotal)}</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-2" onClick={() => { setCartSidebarOpen(false); navigate('/checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Ir a pagar
            </button>
            <button className="w-full text-xs text-gray-500 underline" onClick={clearCart}>Vaciar carrito</button>
          </div>
        )}
      </div>
      {/* Overlay para cerrar el slide */}
      {cartSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setCartSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Header;
