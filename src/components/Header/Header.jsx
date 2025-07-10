"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, ChevronDown } from "lucide-react";

const sidebarCategories = [
  { name: "Vasos 3D" },
  { name: "Placas Navi" },
  { name: "Figuras" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    {
      name: "Vasos 3D",
      description: "Vasos personalizados en 3D",
      href: "/categoria/vasos-3d",
    },
    {
      name: "Placas Navi",
      description: "Placas decorativas Navi",
      href: "/categoria/placas-navi",
    },
    {
      name: "Figuras",
      description: "Figuras coleccionables 3D",
      href: "/categoria/figuras",
    },
  ];

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
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-4 hidden sm:block ">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-gray-200 "
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Iniciar Sesión</a>
              <a className="text-gray-400">|</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Registro</a>
              <button className="p-2 hover:text-blue-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
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
          <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Login</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Register</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Favoritos</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Carrito</a>
          <div className="pt-2 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-900 mb-2">Categorías</div>
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="block text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
              >
                {category.name}
              </a>
            ))}
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
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                      sidebarOpen ? "block" : "hidden"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  />
                  {/* Sidebar con transición */}
                  <div
                    className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
                      sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                        {sidebarCategories.map((cat) => (
                          <li key={cat.name}>
                            <a href="#" className="text-gray-700 hover:text-blue-600 text-base font-medium py-2 px-2 rounded transition block">
                              {cat.name}
                            </a>
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
                  <a
                    key={category.name}
                    href={category.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {category.name}
                  </a>
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
    </div>
  );
}

export default Header;
