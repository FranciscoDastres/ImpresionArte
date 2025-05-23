"use client"

import { useState } from "react"

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function Header({ setCurrentPage, currentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (page, sectionId) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
    if (sectionId) {
      setTimeout(() => scrollToSection(sectionId), 100) // Espera para asegurar render
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="ImpresionArte Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-purple-600">ImpresionArte</span>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavClick("home", "inicio")}
            className={`text-sm font-medium ${currentPage === "home" ? "text-purple-600" : "hover:text-purple-600"}`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick("servicios", "servicios")}
            className={`text-sm font-medium ${currentPage === "servicios" ? "text-purple-600" : "hover:text-purple-600"}`}
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick("galeria", "galeria")}
            className={`text-sm font-medium ${currentPage === "galeria" ? "text-purple-600" : "hover:text-purple-600"}`}
          >
            Galería
          </button>
          <button
            onClick={() => handleNavClick("contacto", "contacto")}
            className={`text-sm font-medium ${currentPage === "contacto" ? "text-purple-600" : "hover:text-purple-600"}`}
          >
            Contacto
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Iniciar Sesión
          </button>
          <button className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
            Cotizar Ahora
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <button
              onClick={() => handleNavClick("home", "inicio")}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick("servicios", "servicios")}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick("galeria", "galeria")}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
            >
              Galería
            </button>
            <button
              onClick={() => handleNavClick("contacto", "contacto")}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100"
            >
              Contacto
            </button>
            <div className="pt-2 pb-1">
              <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 mb-2">
                Iniciar Sesión
              </button>
              <button className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                Cotizar Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

