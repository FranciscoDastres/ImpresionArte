"use client"

import { useState } from "react"

function GalleryTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "todos", label: "Todos" },
    { id: "fine-art", label: "Fine Art" },
    { id: "fotografico", label: "Fotográfico" },
    { id: "canvas", label: "Canvas" },
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
              tab.id === "canvas" ? "rounded-r-md" : ""
            } border border-gray-300 focus:z-10 focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function GalleryItem({ item, category }) {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={`https://placehold.co/600x600/9333ea/ffffff?text=${category} ${item}`}
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

function FeaturedWorks({ fullPage = false }) {
  const [activeTab, setActiveTab] = useState("todos")

  // Datos de ejemplo para cada categoría
  const galleryItems = {
    todos: Array.from({ length: fullPage ? 12 : 6 }, (_, i) => i + 1),
    "fine-art": Array.from({ length: fullPage ? 8 : 3 }, (_, i) => i + 1),
    fotografico: Array.from({ length: fullPage ? 8 : 3 }, (_, i) => i + 1),
    canvas: Array.from({ length: fullPage ? 8 : 3 }, (_, i) => i + 1),
  }

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
            {galleryItems[activeTab].map((item) => (
              <GalleryItem key={item} item={item} category={activeTab === "todos" ? "Artística" : activeTab} />
            ))}
          </div>
          {activeTab === "todos" && !fullPage && (
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

