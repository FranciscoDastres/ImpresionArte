"use client"

function Footer({ setCurrentPage }) {
  const handleNavClick = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="ImpresionArte Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-purple-600">ImpresionArte</span>
            </div>
            <p className="text-sm text-gray-500">
              Especialistas en impresión artística de alta calidad para artistas, fotógrafos y diseñadores.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick("home")} className="text-gray-500 hover:text-purple-600">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("servicios")} className="text-gray-500 hover:text-purple-600">
                  Servicios
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("galeria")} className="text-gray-500 hover:text-purple-600">
                  Galería
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("contacto")} className="text-gray-500 hover:text-purple-600">
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  Impresión Fine Art
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  Impresión Fotográfica
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  Impresión en Canvas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  Enmarcado Artístico
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  Montaje y Acabados
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Suscríbete</h3>
            <p className="text-sm text-gray-500">Recibe nuestras novedades y ofertas especiales.</p>
            <div className="flex space-x-2">
              <input
                placeholder="Tu email"
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                Suscribir
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ImpresionArte. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

