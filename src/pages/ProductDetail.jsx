import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import ApiService from "../services/api";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getProductoPorId(productId);
        setProduct(data);
        setSelectedImg(data.imagen_principal);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 font-bold mb-4">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="p-8 text-center text-black-600 font-bold">Producto no encontrado</div>;
  }

  // Preparar imágenes para el carrusel
  const images = [product.imagen_principal];
  if (product.imagenes_adicionales && product.imagenes_adicionales.length > 0) {
    images.push(...product.imagenes_adicionales);
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-8 border-2 border-black rounded-2xl bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 mt-4">
        {/* Galería de imágenes */}
        <div className="flex-1">
          <div className="w-full h-96 bg-white rounded-xl overflow-hidden mb-4">
            <img
              src={selectedImg}
              alt={product.titulo}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                    selectedImg === img ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.titulo} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <h1 className="text-2xl font-bold text-gray-900">{product.titulo}</h1>
          <div className="flex items-center gap-4">
            <span className="text-black-600 text-xl font-bold">${product.precio}</span>
            {product.precio_anterior && (
              <span className="line-through text-gray-400">${product.precio_anterior}</span>
            )}
            {product.descuento && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {product.descuento}
              </span>
            )}
          </div>
          <p className="text-gray-700">{product.descripcion}</p>
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
            <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors font-semibold text-base min-w-[150px]">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
      
      {/* Productos relacionados debajo del detalle */}
      {product.categoria_nombre && (
        <RelatedProducts category={product.categoria_nombre} />
      )}
    </>
  );
}
