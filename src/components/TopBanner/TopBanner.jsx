function TopBanner() {
  return (
    <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs shadow-sm">
      <div className="w-full mx-auto px-2 py-2 flex justify-between items-start px-10">
        <p className="tracking-wide font-sans font-medium"> 
          🎉 Por lanzamiento recibe un 20% de descuento
        </p>

        <ul className="flex gap-3">
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200">
              Centro de Ayuda
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-200 transition-colors duration-200">
              Seguimiento de Orden
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopBanner;
