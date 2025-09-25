import { Link } from "react-router-dom";
// Si usas iconos: import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#232526] text-white py-10 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Columna 1 - Logo y descripción */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4">ImpresionArte</h2>
          <p className="text-sm text-gray-200">
            Impresiones 3D personalizadas de alta calidad. Envíos a todo el país.
          </p>
        </div>

        {/* Columna 2 - Navegación */}
        <nav aria-label="Navegación">
          <h3 className="text-white font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link></li>
            <li><Link to="/productos" className="hover:text-blue-400 transition-colors">Productos</Link></li>
            <li><Link to="/ofertas" className="hover:text-blue-400 transition-colors">Ofertas</Link></li>
            <li><Link to="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
          </ul>
        </nav>

        {/* Columna 3 - Ayuda */}
        <div>
          <h3 className="text-white font-semibold mb-4">Ayuda</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>

        {/* Columna 4 - Redes sociales */}
        <div>
          <h3 className="text-white font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">X</a>
          </div>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-600 pt-6">
        © {new Date().getFullYear()} ImpresionArte. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer;
