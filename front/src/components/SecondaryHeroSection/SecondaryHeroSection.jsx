export default function SecondaryHeroSection() {
  return (
    <section className="w-full py-20 px-4 flex justify-center items-center rounded-xl">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 rounded-3xl shadow-2xl p-10 border border-gray-100">
        {/* Imagen moderna o ilustración */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/images/secondary-hero-section/secondary-hero-section.jpg"
            alt="Personalización 3D"
            className="h-80 object-contain shadow-xl rounded-xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            loading="lazy"
            onError={e => { e.target.src = '/images/placeholder.png'; }}
          />
        </div>
        {/* Texto y botón */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left bg-white/90 backdrop-blur-sm p-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 drop-shadow-lg leading-tight">
            ¡Personaliza tu producto 3D!
          </h2>
          <p className="text-xl text-black mb-8 max-w-lg leading-relaxed">
            ¿Tienes una idea única? Cuéntanos y la hacemos realidad con impresión 3D profesional. Atención personalizada y resultados increíbles.
          </p>
          <a
            href="https://wa.me/5491123456789"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contáctanos por WhatsApp"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full text-xl shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.7 0 3.3-.425 4.7-1.225l3.3.85a1.125 1.125 0 001.375-1.375l-.85-3.3A9.708 9.708 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z" />
            </svg>
            ¡Contáctanos por WhatsApp!
          </a>
        </div>
      </div>
    </section>
  );
}
