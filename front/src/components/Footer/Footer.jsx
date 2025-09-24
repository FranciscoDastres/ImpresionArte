function Footer() {
  return (
    <footer className="bg-[#232526] text-black py-10 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Columna 1 - Logo y descripción */}
        <div>
          <h2 className="text-black text-2xl font-bold mb-4">ImpresionArte</h2>
          <p className="text-sm text-black">
            Impresiones 3D personalizadas de alta calidad. Envíos a todo el país.
          </p>
        </div>

        {/* Columna 2 - Navegación */}
        <div>
          <h3 className="text-black font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 transition-colors">Inicio</a></li>
            <li><a href="/productos" className="hover:text-blue-600 transition-colors">Productos</a></li>
            <li><a href="/ofertas" className="hover:text-blue-600 transition-colors">Ofertas</a></li>
            <li><a href="/contacto" className="hover:text-blue-600 transition-colors">Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3 - Ayuda */}
        <div>
          <h3 className="text-black font-semibold mb-4">Ayuda</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>

        {/* Columna 4 - Redes sociales */}
        <div>
          <h3 className="text-black font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 transition-colors">Facebook</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-600 transition-colors">X</a>
          </div>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="text-center text-sm text-black mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} ImpresionArte. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer
