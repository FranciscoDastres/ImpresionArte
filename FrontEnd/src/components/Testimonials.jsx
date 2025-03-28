function StarRating({ rating }) {
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={i < rating ? "#FBBF24" : "#E5E7EB"}
              stroke={i < rating ? "#FBBF24" : "#E5E7EB"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          ))}
      </div>
    )
  }
  
  function TestimonialCard({ testimonial }) {
    return (
      <div className="h-full rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
        <p className="mb-4">{testimonial.content}</p>
        <div className="flex items-center space-x-4">
          <img
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h4 className="font-medium">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    )
  }
  
  function Testimonials() {
    const testimonials = [
      {
        name: "María González",
        role: "Artista Visual",
        content:
          "La calidad de impresión es excepcional. Mis obras lucen exactamente como las imaginé. El servicio al cliente es de primera clase.",
        avatar: "https://placehold.co/100x100/9333ea/ffffff?text=MG",
        rating: 5,
      },
      {
        name: "Carlos Rodríguez",
        role: "Fotógrafo Profesional",
        content:
          "He probado varios servicios de impresión y sin duda ImpresionArte ofrece los mejores resultados. Los colores son vibrantes y precisos.",
        avatar: "https://placehold.co/100x100/9333ea/ffffff?text=CR",
        rating: 5,
      },
      {
        name: "Laura Martínez",
        role: "Diseñadora Gráfica",
        content:
          "El acabado de las impresiones es impecable. Siempre cumplen con los plazos de entrega y el equipo es muy profesional.",
        avatar: "https://placehold.co/100x100/9333ea/ffffff?text=LM",
        rating: 4,
      },
    ]
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-purple-600 px-3 py-1 text-sm text-white">Testimonios</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Lo que dicen nuestros clientes</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre por qué artistas y diseñadores confían en nuestros servicios de impresión.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Testimonials
  
  