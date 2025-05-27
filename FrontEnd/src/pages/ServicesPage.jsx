import ServiceCards from "../components/ServiceCards"

function ServiceCards() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Nuestros Servicios</h1>
          <p className="mt-4 text-lg text-gray-500">Descubre nuestra amplia gama de servicios de impresión artística</p>
        </div>
        <ServiceCards />

        <div className="mt-16 grid gap-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Impresión Fine Art</h2>
              <p className="text-gray-600 mb-4">
                Nuestro servicio de impresión Fine Art utiliza las mejores tintas pigmentadas y papeles de alta calidad
                para garantizar impresiones duraderas con colores precisos y detalles nítidos.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Papeles 100% algodón libres de ácido</li>
                <li>Tintas pigmentadas con durabilidad de hasta 100 años</li>
                <li>Calibración de color profesional</li>
                <li>Diferentes acabados: mate, semi-mate, brillo</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/600x400/purple/white?text=Impresion+Fine+Art"
                alt="Impresión Fine Art"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/600x400/purple/white?text=Impresion+Fotografica"
                alt="Impresión Fotográfica"
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4">Impresión Fotográfica</h2>
              <p className="text-gray-600 mb-4">
                Nuestras impresiones fotográficas profesionales capturan cada detalle de tus imágenes con una
                reproducción de color excepcional y una claridad impresionante.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Papeles fotográficos premium</li>
                <li>Acabados brillante, lustre y metálico</li>
                <li>Calibración de color avanzada</li>
                <li>Tamaños personalizados disponibles</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Impresión en Canvas</h2>
              <p className="text-gray-600 mb-4">
                Transformamos tus imágenes en impresiones de lienzo de alta calidad, perfectas para decoración de
                interiores y exhibiciones artísticas.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Canvas de algodón de alta calidad</li>
                <li>Bastidores de madera resistentes</li>
                <li>Acabado protector UV</li>
                <li>Opciones de borde: espejado, extendido o blanco</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/600x400/purple/white?text=Impresion+Canvas"
                alt="Impresión en Canvas"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCards

