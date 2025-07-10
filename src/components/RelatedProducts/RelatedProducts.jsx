import { useNavigate } from "react-router-dom";

const data = {
  vasos3d: [
    {
      title: "Vaso 3D Verde",
      price: "$25.00",
      oldPrice: "$30.00",
      image: "/images/products/vasos3d/green-glass.jpg",
      discount: "17%",
    },
    {
      title: "Vaso 3D Amarillo",
      price: "$22.00",
      oldPrice: "$28.00",
      image: "/images/products/vasos3d/yellow-glass1.jpg",
      discount: "21%",
    },
    {
      title: "Vaso 3D Rojo",
      price: "$24.00",
      oldPrice: "$29.00",
      image: "/images/products/vasos3d/colour-glass2.jpg",
      discount: "17%",
    },
    {
      title: "Vaso 3D Amarillo-Rojo",
      price: "$26.00",
      oldPrice: "$32.00",
      image: "/images/products/vasos3d/yellow-red-glass.jpg",
      discount: "19%",
    },
  ],
};

function RelatedProducts({ category = "vasos3d" }) {
  const products = data[category] || [];
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <section className="w-full max-w-5xl mx-auto mt-8 mb-4 rounded-2xl bg-white/80 shadow-lg p-4 sm:p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-1 text-black drop-shadow-lg">
        Productos Relacionados
      </h2>
      <p className="text-sm text-gray-700 mb-4 drop-shadow-md">
        Te pueden interesar estos productos similares.
      </p>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 pl-1 pr-1 sm:pl-2 sm:pr-2">
          {products.map((product, index) => (
            <div
              key={index}
              className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] bg-white backdrop-blur rounded-xl shadow border border-gray-100 transition hover:shadow-lg flex-shrink-0 relative flex flex-col"
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)' }}
            >
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                {product.discount}
              </span>
              <div className="w-full h-40 sm:h-48 flex items-center justify-center mb-4 bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm text-gray-800 mb-1 truncate px-3">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mb-3 px-3">
                <span className="text-black-600 font-bold text-base">{product.price}</span>
                <span className="line-through text-gray-400 text-sm">
                  {product.oldPrice}
                </span>
              </div>
              <div className="flex flex-col gap-2 px-3 pb-3">
                <button className="w-full bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2">
                  🛒 Añadir al Carrito
                </button>
                <button
                  className="w-full border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
                  onClick={() => navigate(`/producto/${encodeURIComponent(product.title)}`)}
                >
                  🔍 Más Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts; 