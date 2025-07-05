"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, ChevronDown } from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const categories = [
    {
      name: "Limpieza",
      description: "Shampoo & Soap Essentials",
      href: "/categoria/limpieza"
    },
    {
      name: "Tecnología", 
      description: "Electrónicos y Gadgets",
      href: "/categoria/tecnologia"
    },
    {
      name: "Moda Mujer",
      description: "Ropa y Accesorios",
      href: "/categoria/moda-mujer"
    }
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border border-gray-300">
      <header className="border-b">
        <div className="px-4 sm:px-6 lg:px-10 mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-lg">ImpresionArte</div>
                <div className="text-xs text-gray-500">Impresiones 3D Personalizadas</div>
              </div>
            </a>

            {/* Search Bar */}
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-4 hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black placeholder:text-black focus:outline-none text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <a href="#" className="text-gray-700 hover:text-gray-900">Login</a>
              <a className="text-gray-700 hover:text-gray-900">|</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Register</a>
              <button className="p-2 hover:text-gray-900">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-900">
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
        <div className="md:hidden px-4 pb-4 space-y-3 border-b bg-white">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 rounded-lg bg-gray-200 text-black placeholder:text-black focus:outline-none text-sm"
          />
          <a href="#" className="block text-sm text-gray-700 hover:text-gray-900">Login</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-gray-900">Register</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-gray-900">Favoritos</a>
          <a href="#" className="block text-sm text-gray-700 hover:text-gray-900">Carrito</a>
          
          {/* Mobile Categories */}
          <div className="pt-2 border-t">
            <div className="text-sm font-medium text-gray-900 mb-2">Categorías</div>
            {categories.map((category) => (
              <a 
                key={category.name}
                href={category.href} 
                className="block text-sm text-gray-700 hover:text-gray-900 py-1"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Desktop */}
      <nav className="border-b hidden md:block">
        <div className="px-10 mx-auto">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              {/* Categorías Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  onMouseEnter={() => setCategoryMenuOpen(true)}
                  className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="font-medium">COMPRAR POR CATEGORÍA</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {categoryMenuOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onMouseLeave={() => setCategoryMenuOpen(false)}
                  >
                    <div className="p-4">
                      <div className="text-sm font-medium text-gray-900 mb-3">Nuestras Categorías</div>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <a
                            key={category.name}
                            href={category.href}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                          >
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category.description}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
            
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span>Envío Gratis en Compras Mayores a $50</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
