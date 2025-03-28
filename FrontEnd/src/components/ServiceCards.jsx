function ServiceCard({ icon, title, description }) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">{icon}</div>
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    )
  }
  
  function ServiceCards({ fullPage = false }) {
    const services = [
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
        ),
        title: "Impresión Fine Art",
        description: "Impresiones de alta calidad en papeles especiales para artistas y fotógrafos.",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        ),
        title: "Impresión Fotográfica",
        description: "Reproduce tus fotografías con colores vibrantes y detalles precisos.",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <path d="M19 11V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6l-8-5v11"></path>
          </svg>
        ),
        title: "Impresión en Canvas",
        description: "Impresiones en lienzo con acabados profesionales y bastidores de calidad.",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <circle cx="13.5" cy="6.5" r="2.5"></circle>
            <circle cx="19" cy="17" r="2"></circle>
            <circle cx="6" cy="12" r="2.5"></circle>
            <circle cx="10" cy="19" r="2"></circle>
            <line x1="13.5" y1="9" x2="6" y2="12"></line>
            <line x1="6" y1="14.5" x2="10" y2="17"></line>
            <line x1="12" y1="19" x2="17" y2="17"></line>
          </svg>
        ),
        title: "Enmarcado Artístico",
        description: "Servicio de enmarcado profesional para destacar tus obras impresas.",
      },
    ]
  
    const detailedServices = [
      {
        title: "Impresión Fine Art",
        description:
          "Nuestro servicio de impresión Fine Art utiliza las mejores tintas pigmentadas y papeles de alta calidad para garantizar impresiones duraderas con colores precisos y detalles nítidos.",
        features: [
          "Papeles 100% algodón libres de ácido",
          "Tintas pigmentadas con durabilidad de hasta 100 años",
          "Calibración de color profesional",
          "Diferentes acabados: mate, semi-mate, brillo",
        ],
        image: "https://placehold.co/600x400/9333ea/ffffff?text=Impresion+Fine+Art",
      },
      {
        title: "Impresión Fotográfica",
        description:
          "Nuestras impresiones fotográficas profesionales capturan cada detalle de tus imágenes con una reproducción de color excepcional y una claridad impresionante.",
        features: [
          "Papeles fotográficos premium",
          "Acabados brillante, lustre y metálico",
          "Calibración de color avanzada",
          "Tamaños personalizados disponibles",
        ],
        image: "https://placehold.co/600x400/9333ea/ffffff?text=Impresion+Fotografica",
      },
      {
        title: "Impresión en Canvas",
        description:
          "Transformamos tus imágenes en impresiones de lienzo de alta calidad, perfectas para decoración de interiores y exhibiciones artísticas.",
        features: [
          "Canvas de algodón de alta calidad",
          "Bastidores de madera resistentes",
          "Acabado protector UV",
          "Opciones de borde: espejado, extendido o blanco",
        ],
        image: "https://placehold.co/600x400/9333ea/ffffff?text=Impresion+Canvas",
      },
    ]
  
    return (
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-purple-600 px-3 py-1 text-sm text-white">Nuestros Servicios</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Soluciones de impresión artística</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ofrecemos una amplia gama de servicios de impresión para artistas, diseñadores y amantes del arte.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {services.map((service, index) => (
              <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} />
            ))}
          </div>
  
          {fullPage && (
            <div className="mt-16 grid gap-12">
              {detailedServices.map((service, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 !== 0 ? "order-2 md:order-1" : ""}>
                    <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 !== 0 ? "order-1 md:order-2" : ""}>
                    <div className="rounded-lg overflow-hidden">
                      <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }
  
  export default ServiceCards
  
  