function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Columna 1 - Logo y descripción */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">MiTienda</h2>
          <p className="text-sm">
            Compra productos de calidad desde la comodidad de tu hogar. Envíos a todo el país.
          </p>
        </div>

        {/* Columna 2 - Navegación */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Inicio</a></li>
            <li><a href="/productos" className="hover:text-white transition">Productos</a></li>
            <li><a href="/ofertas" className="hover:text-white transition">Ofertas</a></li>
            <li><a href="/contacto" className="hover:text-white transition">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3 - Ayuda */}
        <div>
          <h3 className="text-white font-semibold mb-4">Ayuda</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-white transition">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
          </ul>
        </div>

        {/* Columna 4 - Redes sociales */}
        <div>
          <h3 className="text-white font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">X</a>
          </div>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} MiTienda. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer
