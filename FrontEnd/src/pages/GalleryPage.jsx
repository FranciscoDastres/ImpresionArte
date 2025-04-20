"use client"

import { useState } from "react"

function GalleryFilter({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: "todos", label: "Todos" },
    { id: "fine-art", label: "Fine Art" },
    { id: "fotografico", label: "Fotográfico" },
    { id: "canvas", label: "Canvas" },
    { id: "enmarcado", label: "Enmarcado" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeFilter === filter.id
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

function GalleryItem({ item, category }) {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={`https://placehold.co/600x600/purple/white?text=${category} ${item}`}
            alt={`Obra ${category} ${item}`}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
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
          <h3 className="font-medium">
            Obra {category} {item}
          </h3>
          <p className="text-sm text-gray-500">Impresión {category}</p>
        </div>
      </div>
    </div>
  )
}

function GaleriaPage() {
  const [activeFilter, setActiveFilter] = useState("todos")

  // Datos de ejemplo para cada categoría
  const galleryItems = {
    todos: Array.from({ length: 12 }, (_, i) => i + 1),
    "fine-art": Array.from({ length: 6 }, (_, i) => i + 1),
    fotografico: Array.from({ length: 6 }, (_, i) => i + 1),
    canvas: Array.from({ length: 6 }, (_, i) => i + 1),
    enmarcado: Array.from({ length: 6 }, (_, i) => i + 1),
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Nuestra Galería</h1>
          <p className="mt-4 text-lg text-gray-500">Explora nuestros trabajos más destacados</p>
        </div>

        <GalleryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryItems[activeFilter].map((item) => (
            <GalleryItem key={item} item={item} category={activeFilter === "todos" ? "Artística" : activeFilter} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GaleriaPage

