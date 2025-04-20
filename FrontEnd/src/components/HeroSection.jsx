function HeroSection() {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-100 to-white py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Impresiones artísticas de alta calidad
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Transforma tus ideas en obras de arte impresas con la más alta calidad y precisión.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button className="rounded-md bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700">
                  Explorar Galería
                </button>
                <button className="rounded-md border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50">
                  Nuestros Servicios
                </button>
              </div>
            </div>
            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl md:aspect-square lg:aspect-[4/3]">
              <img
                src="/src/assets/img/Unknow_3.jpg"
                alt="Impresiones artísticas"
                className="object-cover w-full h-full rounded-xl shadow-xl"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-purple-200 rounded-xl" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </section>
    )
  }
  
  export default HeroSection
  
  