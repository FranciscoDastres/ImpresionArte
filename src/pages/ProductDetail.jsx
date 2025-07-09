import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

// Datos de ejemplo (puedes reemplazar por fetch a la API si lo deseas)
const data = {
  "Vaso 3D Verde": {
    title: "Vaso 3D Verde",
    price: "$25.00",
    oldPrice: "$30.00",
    images: [
      "/images/products/vasos3d/green-glass.jpg",
      "/images/products/vasos3d/colour-glass1.jpg"
    ],
    description: "Vaso 3D personalizado en color verde, ideal para bebidas frías y calientes.",
    discount: "17%"
  },
  "Placa Navi Honda": {
    title: "Placa Navi Honda",
    price: "$45.00",
    oldPrice: "$55.00",
    images: [
      "/images/products/navi/honda.jpg",
      "/images/products/navi/placa-navi.jpg"
    ],
    description: "Placa decorativa Navi modelo Honda, perfecta para tu hogar.",
    discount: "18%"
  },
  // ...agrega los demás productos aquí
};

export default function ProductDetail() {
  const { productId } = useParams();
  const decodedId = decodeURIComponent(productId);
  const product = data[decodedId];
  const [selectedImg, setSelectedImg] = useState(product?.images[0] || "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  if (!product) {
    return <div className="p-8 text-center text-red-600 font-bold">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-8 border-2 border-black rounded-2xl bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 mt-4">




      {/* Galería vertical + imagen principal */}
      <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-4 items-center md:items-start">
        {/* Imagen principal */}
        <div className="w-[250px] h-[250px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mx-2">
          <img
            src={selectedImg}
            alt={product.title}
            className="object-cover"
            width={300}
            height={300}
          />
        </div>
        {/* Miniaturas: horizontal en móvil, vertical en desktop */}
        <div className="flex md:flex-col gap-2 mt-2 md:mt-0 overflow-x-auto md:overflow-x-visible w-full md:w-auto">
          {product.images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setSelectedImg(img)}
              className={`w-16 h-16 aspect-square rounded-lg border-2 ${selectedImg === img ? "border-blue-500" : "border-gray-200"} overflow-hidden focus:outline-none flex-shrink-0`}
            >
              <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      {/* Detalles del producto */}
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        <div className="flex items-center gap-4">
          <span className="text-red-600 text-xl font-bold">{product.price}</span>
          <span className="line-through text-gray-400">{product.oldPrice}</span>
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{product.discount}</span>
        </div>
        <p className="text-gray-700">{product.description}</p>
        <div className="flex items-center gap-2">
          {/* Selector de cantidad compacto */}
          <div className="flex items-center border rounded-md bg-white h-10 w-20">
            <span className="flex-1 text-center text-lg font-semibold">{quantity}</span>
            <div className="flex flex-col">
              <button
                type="button"
                className="h-1/2 w-7 flex items-center justify-center text-gray-700  rounded-tr-md transition-colors"
                onClick={() => setQuantity(q => Math.min(q + 1, 99))}
                tabIndex={-1}
              >
                ▲
              </button>
              <button
                type="button"
                className="h-1/2 w-7 flex items-center justify-center text-gray-700  rounded-br-md transition-colors"
                onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                tabIndex={-1}
              >
                ▼
              </button>
            </div>
          </div>
          {/* Botón agregar al carrito */}
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base min-w-[150px]">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
