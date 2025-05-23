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
      
    ]
  
    const detailedServices = [
      {
        title: "ImpresionArte",
        description:
          "Ofrecemos un servicio personalizado de impresión 3D para crear cualquier producto que imagines. Desde piezas funcionales hasta objetos decorativos, damos vida a tus ideas con precisión y calidad.",
        features: [
          "Modelos únicos y personalizados según tus necesidades",
          "Materiales de alta calidad y variedad de acabados",
          "Asesoría durante todo el proceso de diseño e impresión",
          "Ideal para regalos, prototipos, decoración y más",
        ],
        image: "https://placehold.co/600x400/9333ea/ffffff?text=Impresion+3D+Personalizada",
      }
      
    ]
  
    return (
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">

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
  
  