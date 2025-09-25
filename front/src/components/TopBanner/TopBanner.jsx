import { Link } from "react-router-dom";

function TopBanner() {
  return (
    <div role="banner" className="hidden lg:block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs shadow-sm">
      <div className="w-full mx-auto px-2 py-2 flex justify-between items-center px-10">
        <p className="tracking-wide font-sans font-medium"> 
          <span className="inline-block animate-bounce">🎉</span> Por lanzamiento recibe un 20% de descuento
        </p>

        <ul className="flex gap-3">
          <li>
            {/* Si interno, usa Link. Si externo, usa <a> con target="_blank" */}
            <Link to="/ayuda" className="hover:text-blue-200 transition-colors duration-200">
              Centro de Ayuda
            </Link>
          </li>
          <li>
            <Link to="/seguimiento" className="hover:text-blue-200 transition-colors duration-200">
              Seguimiento de Orden
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopBanner;
