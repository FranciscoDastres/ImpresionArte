function TopBanner() {
  return (
    <div className="hidden lg:block bg-white text-gray-500 text-xs">
      <div className="w-full mx-auto px-2 py-2 flex justify-between items-start border-t border-t-2 border-gray-400 px-10">
        <p className="tracking-wide font-sans"> 
          Por lanzamiento recibe un 20% de descuento
        </p>

        <ul className="flex gap-3">
          <li>
            <a href="#" className="hover:text-gray-700 transition">
              Help Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-700 transition">
              Order Tracking
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopBanner;
