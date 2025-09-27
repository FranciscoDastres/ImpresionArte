"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/api";
import useCart from "../../hooks/useCart";
import { useAuth } from "../../contexts/AuthContext";

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

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
  const CLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getCategorias();
        setCategories(data);
      } catch (err) {
        setError("Error al cargar categorías");
        setCategories([
          { id: 1, nombre: "Vasos 3D", descripcion: "Vasos personalizados en 3D" },
          { id: 2, nombre: "Placas Navi", descripcion: "Placas decorativas Navi" },
          { id: 3, nombre: "Figuras", descripcion: "Figuras coleccionables 3D" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest(".user-menu")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 w-full">
      {/* HEADER DESKTOP */}
      <header className="border-b border-gray-200 w-full hidden md:block">
        <div className="w-full max-w-none mx-auto px-4 lg:px-20 xl:px-32">
          <div className="flex items-center justify-between py-0 sm:py-5">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-xl xl:text-2xl text-gray-800">ImpresionArte</div>
                <div className="text-sm xl:text-base text-gray-600">Impresiones 3D Personalizadas</div>
              </div>
            </a>
            <div className="flex-1 flex justify-center px-4">
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full h-11 rounded-lg bg-gray-200 text-gray-800 placeholder:text-gray-500 px-4 pr-12 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base border border-gray-300"
                    style={{ fontWeight: 500 }}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 xl:space-x-8">
              {user ? (
                <>
                  <div className="relative user-menu">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">{user.nombre}</span>
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
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Iniciar Sesión</Link>
                  <span className="text-gray-400 font-light">|</span>
                  <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">Registro</Link>
                </>
              )}
              <button className="p-2 hover:text-blue-600 transition-colors relative" onClick={() => setCartSidebarOpen(true)}>
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* NAV CATEGORÍAS DESKTOP */}
        <div className="w-full h-[1px] bg-gray-200 mb-0 mt-1" />
        <nav className="border-b border-gray-200 bg-white w-full overflow-x-auto scrollbar-hide">
          <div className="px-4 lg:px-20 xl:px-32 mx-auto w-full max-w-none">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-6 xl:space-x-10">
                <div className="relative">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center space-x-2 transition-colors duration-200 font-semibold"
                  >
                    <Menu className="w-5 h-5" />
                    <span>COMPRAR POR CATEGORÍA</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`} />
                  </button>
                  <>
                    {sidebarOpen && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                        onClick={() => setSidebarOpen(false)}
                      />
                    )}
                    <div
                      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                                className="text-gray-700 hover:text-blue-600 text-base font-medium py-2 px-2 rounded transition block capitalize"
                              >
                                {capitalize(cat.nombre)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                </div>
                {/* ENLACES DESKTOP CATEGORÍA CON RIPPLE */}
                <div className="flex space-x-4 xl:space-x-6 overflow-x-auto scrollbar-hide">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/productos?categoria=${encodeURIComponent(category.nombre)}`}
                      className="
                        text-gray-700 transition-colors duration-200 whitespace-nowrap font-semibold relative
                        capitalize
                        group
                        px-3 py-1.5 rounded-lg
                        hover:text-blue-600
                        active:outline-none focus:outline-none
                        overflow-hidden
                      "
                      style={{ position: 'relative', display: 'inline-block' }}
                    >
                      <span className="relative z-10">{capitalize(category.nombre)}</span>
                      <span className="
                        pointer-events-none
                        absolute left-1/2 top-1/2 
                        w-0 h-0
                        rounded-full
                        bg-blue-300/30
                        opacity-0
                        group-active:opacity-100
                        group-active:w-[220%]
                        group-active:h-[400%]
                        group-active:transition-all 
                        group-active:duration-400
                        transform
                        -translate-x-1/2
                        -translate-y-1/2
                        transition-all
                        duration-300
                      "></span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-base text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </header>
      {/* HEADER MOBILE */}
      <header className="border-b border-gray-200 w-full md:hidden">
        <div className="w-full flex items-center px-3 py-2 justify-between">
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="font-bold text-base text-gray-800 leading-none">ImpresionArte</span>
          </a>
          <div className="flex space-x-1">
            {/* CARRITO MOBILE AJUSTADO */}
            <button className="p-2 relative" onClick={() => setCartSidebarOpen(true)}>
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 ml-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
        {/* Buscador SOLO en mobile */}
        <div className="block w-full px-3 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full h-9 rounded-lg bg-gray-200 text-gray-800 placeholder:text-gray-500 px-4 pr-10 text-sm"
              style={{ fontWeight: 500 }}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-b border-gray-200 bg-white w-full max-w-[540px] mx-auto">
          <Link to="/login" className="block text-base text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</Link>
          <Link to="/register" className="block text-base text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Registro</Link>
          <a href="#" className="block text-base text-gray-700 hover:text-blue-600 font-medium">Favoritos</a>
          <a href="#" className="block text-base text-gray-700 hover:text-blue-600 font-medium">Carrito</a>
          <div className="pt-2 border-t border-gray-200">
            <div className="text-base font-semibold text-gray-900 mb-2">Categorías</div>
            {loading ? (
              <div className="text-sm text-gray-500">Cargando categorías...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error al cargar categorías</div>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/productos?categoria=${encodeURIComponent(category.nombre)}`}
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors py-1 font-medium capitalize"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {capitalize(category.nombre)}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
      {/* SIDEBAR CARRITO */}
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
                    {item.imagen_principal && (
                      <img src={item.imagen_principal} alt={item.titulo || item.nombre} className="w-12 h-12 object-cover rounded" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{item.titulo || item.nombre}</div>
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
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-2"
              onClick={() => { setCartSidebarOpen(false); navigate('/checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Ir a pagar
            </button>
            <button className="w-full text-xs text-gray-500 underline" onClick={clearCart}>Vaciar carrito</button>
          </div>
        )}
      </div>
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
