import ContactSection from "../components/ContactSection"

function ContactoPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contacto</h1>
        <p className="mt-4 text-lg text-gray-500">Estamos aquí para ayudarte con tu proyecto</p>
      </div>
      <ContactSection />
    </div>
  )
}

export default ContactoPage

