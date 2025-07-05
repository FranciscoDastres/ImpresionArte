function TopBanner() {
  return (
    <div className="hidden lg:block bg-white text-gray-600 text-xs border-b border-gray-200">
      <div className="w-full mx-auto px-2 py-2 flex justify-between items-start px-10">
        <p className="tracking-wide font-sans"> 
          Por lanzamiento recibe un 20% de descuento
        </p>

        <ul className="flex gap-3">
          <li>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Help Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Order Tracking
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopBanner;
