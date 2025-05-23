"use client"

import { useState } from "react"

function GalleryTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "todos", label: "Todos" },
    { id: "vidrio", label: "Vidrio" },
    { id: "placas", label: "Placas" },
    { id: "otros", label: "Otros" },
  ]

  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-md shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
            } ${tab.id === "todos" ? "rounded-l-md" : ""} ${
              tab.id === "otros" ? "rounded-r-md" : ""
            } border border-gray-300 focus:z-10 focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function GalleryItem({ imagePath, title, description }) {
  const [imageError, setImageError] = useState(false)

  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={
              imageError ? `https://placehold.co/600x600/9333ea/ffffff?text=${encodeURIComponent(title)}` : imagePath
            }
            alt={title}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20 flex items-center justify-center">
            <div className="transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium text-sm">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

function FeaturedWorks({ fullPage = false }) {
  const [activeTab, setActiveTab] = useState("todos")

  // Definimos las imágenes que funcionan correctamente
  // Eliminamos las problemáticas o las reemplazamos con placeholders
  const galleryData = {
    vidrio: [
      {
        imagePath: "/img/A3ColourGlass.jpg",
        title: "Vidrio de Color A3",
        description: "Impresión en vidrio de alta calidad",
      },
      {
        imagePath: "/img/A3ColourGlass_2.jpg",
        title: "Vidrio de Color A3 - Variante",
        description: "Impresión en vidrio con acabado especial",
      },
      {
        imagePath: "/img/GreenGlass.jpg",
        title: "Vidrio Verde",
        description: "Impresión en vidrio con tonos verdes",
      },
      {
        imagePath: "/img/YellowAndRedGlass.jpg",
        title: "Vidrio Amarillo y Rojo",
        description: "Combinación de colores en vidrio",
      },
      {
        imagePath: "/img/YelowGlass.jpg",
        title: "Vidrio Amarillo",
        description: "Impresión en vidrio con tonos amarillos",
      },
      {
        imagePath: "/img/YelowGlass2.jpg",
        title: "Vidrio Amarillo - Variante",
        description: "Otra variante de impresión en vidrio amarillo",
      },
    ],
    placas: [
      // Reemplazamos las imágenes problemáticas con placeholders
      {
        imagePath: "https://placehold.co/600x600/9333ea/ffffff?text=Placa+Navi",
        title: "Placa Navi",
        description: "Placa personalizada con diseño Navi",
      },
      {
        imagePath: "/img/PlacasNavi2Hand.jpg",
        title: "Placa Navi 2 Hand",
        description: "Placa Navi con diseño de manos",
      },
      {
        imagePath: "https://placehold.co/600x600/9333ea/ffffff?text=Placa+Navi+3",
        title: "Placa Navi 3",
        description: "Tercera variante de placa Navi",
      },
      {
        imagePath: "/img/PlacasNavi4.jpg",
        title: "Placa Navi 4",
        description: "Cuarta variante de placa Navi",
      },
      {
        imagePath: "/img/PlacasNaviPreguntar.jpg",
        title: "Placa Navi Preguntar",
        description: "Placa Navi con diseño de preguntas",
      },
    ],
    otros: [
      {
        imagePath: "/img/Bender-Chulo.jpg",
        title: "Bender Chulo",
        description: "Diseño especial de Bender",
      },
      {
        imagePath: "/img/Honda_Revisar.jpg",
        title: "Honda Revisar",
        description: "Diseño Honda para revisión",
      },
      {
        imagePath: "/img/Unknow_1.jpg",
        title: "Diseño Desconocido 1",
        description: "Diseño especial categoría desconocida",
      },
      // Reemplazamos la imagen problemática con un placeholder
      {
        imagePath: "https://placehold.co/600x600/9333ea/ffffff?text=Arma+Desconocida",
        title: "Arma Desconocida",
        description: "Diseño de arma especial",
      },
      {
        imagePath: "/img/Unknow_3.jpg",
        title: "Diseño Desconocido 3",
        description: "Tercer diseño de categoría desconocida",
      },
      {
        imagePath: "/img/Unknow_4.jpg",
        title: "Diseño Desconocido 4",
        description: "Cuarto diseño de categoría desconocida",
      },
      {
        imagePath: "/img/Unknow_5.jpg",
        title: "Diseño Desconocido 5",
        description: "Quinto diseño de categoría desconocida",
      },
      {
        imagePath: "/img/Unknow_6.jpg",
        title: "Diseño Desconocido 6",
        description: "Sexto diseño de categoría desconocida",
      },
    ],
  }

  // Creamos la categoría "todos" combinando todas las imágenes
  galleryData.todos = [...galleryData.vidrio, ...galleryData.placas, ...galleryData.otros]

  // Limitamos la cantidad de imágenes si no estamos en la página completa
  const displayItems = fullPage ? galleryData[activeTab] : galleryData[activeTab].slice(0, 6)

  return (
    <section id="galeria" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-600 px-3 py-1 text-sm text-white">Galería</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trabajos destacados</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explora nuestra colección de impresiones artísticas realizadas para clientes satisfechos.
            </p>
          </div>
        </div>

        <GalleryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayItems.map((item, index) => (
              <GalleryItem key={index} imagePath={item.imagePath} title={item.title} description={item.description} />
            ))}
          </div>
          {activeTab === "todos" && !fullPage && galleryData.todos.length > 6 && (
            <div className="mt-10 flex justify-center">
              <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                Ver más trabajos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWorks
