import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const data = {
  fashion: [
    {
      title: "fashion Men Opaque Casual Shirt",
      price: "₹1,450.00",
      oldPrice: "₹1,650.00",
      image: "/images/products/fashion/shirt-1.jpg",
      discount: "10%",
    },
    {
      title: "fashion Men Comfort Cuban Collar",
      price: "₹1,850.00",
      oldPrice: "₹2,200.00",
      image: "/images/products/fashion/shirt-2.jpg",
      discount: "14%",
    },
    {
      title: "fashion Men Pure Cotton Striped",
      price: "₹1,999.00",
      oldPrice: "₹2,250.00",
      image: "/images/products/fashion/shirt-3.jpg",
      discount: "12%",
    },
    {
      title: "fashion Embroidered Satin Saree",
      price: "₹4,785.00",
      oldPrice: "₹5,500.00",
      image: "/images/products/fashion/shirt-4.jpg",
      discount: "13%",
    },
  ],
  electronics: [
    {
      title: "electronics Embroidered Shirt",
      price: "₹1,955.00",
      oldPrice: "₹1,999.00",
      image: "/images/products/fashion/shirt-5.jpg",
      discount: "12%",
    },
    {
      title: "electronics Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-6.jpg",
      discount: "10%",
    },
    {
      title: "electronics Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-7.jpg",
      discount: "10%",
    },
    {
      title: "electronics Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-8.jpg",
      discount: "10%",
    },
  ],
  beauty: [
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-9.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-10.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-11.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-12.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-13.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-14.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-14.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-14.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-14.jpg",
      discount: "10%",
    },
    {
      title: "beauty Extra Shirt",
      price: "₹2,250.00",
      oldPrice: "₹2,500.00",
      image: "/images/products/fashion/shirt-14.jpg",
      discount: "10%",
    },
  ],
};
const categories = Object.keys(data);

function PopularProducts() {
  const carouselRef = useRef();
  const [activeCategory, setActiveCategory] = useState("fashion");
  const products = data[activeCategory];

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 300;
    direction === "left"
      ? (container.scrollLeft -= scrollAmount)
      : (container.scrollLeft += scrollAmount);
  };

  return (
    <section className="relative px-6 py-8">
      <h2 className="text-2xl font-bold mb-1">Popular Products</h2>
      <p className="text-sm text-gray-500 mb-4">
        Do not miss the current offers until the end of the month.
      </p>

      {/* Categorías */}
      <div className="flex gap-6 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`uppercase text-sm font-semibold ${
              activeCategory === cat
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500 hover:text-red-400"
            } pb-1 transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flecha Izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:scale-105"
      >
        <ChevronLeft />
      </button>

      {/* Carrusel de productos */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white rounded-lg shadow p-4 flex-shrink-0 relative"
          >
            <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
              {product.discount}
            </span>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="font-semibold text-sm truncate">{product.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">{product.price}</span>
              <span className="line-through text-gray-400 text-sm">
                {product.oldPrice}
              </span>
            </div>
            <button className="mt-3 w-full border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2">
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Flecha Derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:scale-105"
      >
        <ChevronRight />
      </button>
    </section>
  );
}

export default PopularProducts;
