// SecondaryHeroSection.jsx
import { Truck } from 'lucide-react';

// 🔁 Datos de los banners apilados a la derecha
const rightBanners = [
  {
    image: 'https://via.placeholder.com/200x150',
    title: 'Buy women products with low price',
    price: '₹999',
    link: '#',
    bg: 'bg-purple-100',
  },
  {
    image: 'https://via.placeholder.com/200x150',
    title: "Buy Men's Bags with low price",
    price: '₹900',
    link: '#',
    bg: 'bg-yellow-100',
  },
];

// 🧱 Cards inferiores
const miniCards = [
  { img: 'https://via.placeholder.com/150', title: "Buy Apple iPhone", price: '₹45000' },
  { img: 'https://via.placeholder.com/150', title: "Buy Men's Footwear", price: '₹1500' },
  { img: 'https://via.placeholder.com/150', title: "Buy women products", price: '₹999' },
  { img: 'https://via.placeholder.com/150', title: "Buy Men's Bags", price: '₹900' },
];

export default function SecondaryHeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-12">

      {/* 🔁 Parte superior: animación + 2 banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Animación a la izquierda (2 columnas) */}
        <div className="md:col-span-2 h-[324px] rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="Animación"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Banners apilados a la derecha */}
        <div className="flex flex-col gap-6">
          {rightBanners.map((b, i) => (
            <div
              key={i}
              className={`${b.bg} rounded-xl flex items-center p-4 shadow`}
              style={{ height: 150 }}
            >
              <img
                src={b.image}
                alt={b.title}
                className="h-full object-contain"
              />
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium">{b.title}</p>
                <p className="mt-1 text-red-600 font-bold">{b.price}</p>
                <a href={b.link} className="text-xs underline mt-2 block">
                  SHOP NOW
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚚 Free Shipping Bar */}
      <div className="border border-red-500 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-3">
          <Truck className="text-red-500" />
          <span className="font-semibold">FREE SHIPPING</span>
          <span className="text-sm text-gray-600">
            Free Delivery On Your First Order and over $200
          </span>
        </div>
        <span className="font-bold text-red-500">- Only $200*</span>
      </div>

      {/* 🧱 Mini cards fila */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {miniCards.map((c, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl flex flex-col items-center p-4 shadow"
          >
            <img src={c.img} alt={c.title} className="h-20 object-contain mb-2" />
            <p className="text-sm font-medium text-center">{c.title}</p>
            <p className="text-red-600 font-semibold mt-1">{c.price}</p>
            <a href="#" className="text-xs underline mt-2">SHOP NOW</a>
          </div>
        ))}
      </div>
    </section>
  );
}
