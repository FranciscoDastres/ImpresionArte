function ContactSection({ fullPage = false }) {
    return (
      <section id="contacto" className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          {fullPage && (
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight">Contacto</h1>
              <p className="mt-4 text-lg text-gray-500">Estamos aquí para ayudarte con tu proyecto</p>
            </div>
          )}
          {!fullPage && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-600 px-3 py-1 text-sm text-white">Contacto</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">¿Listo para comenzar tu proyecto?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contáctanos para discutir tus necesidades de impresión y obtener una cotización personalizada.
                </p>
              </div>
            </div>
          )}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 mt-12">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Envíanos un mensaje</h3>
                <p className="text-gray-500 text-sm">Completa el formulario y te responderemos a la brevedad.</p>
              </div>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      id="first-name"
                      placeholder="Nombre"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <input
                      id="last-name"
                      placeholder="Apellido"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <input
                    id="subject"
                    placeholder="Asunto"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    placeholder="Mensaje"
                    className="min-h-[120px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
            <div className="grid gap-8 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Información de contacto</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
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
                      className="text-purple-600 mt-0.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                      <h4 className="font-medium">Dirección</h4>
                      <p className="text-sm text-gray-500">Av. Providencia 1234, Providencia, Santiago, Chile</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
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
                      className="text-purple-600 mt-0.5"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-gray-500">contacto@impresionarte.cl</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
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
                      className="text-purple-600 mt-0.5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-sm text-gray-500">+56 2 2123 4567</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Horario de atención</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-white overflow-hidden h-[200px] lg:h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.997087668236!2d-70.6095462!3d-33.4256279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf69995fb2a5%3A0x8bb5b36d86b41e7b!2sAv.%20Providencia%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1648132133358!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default ContactSection
  
  