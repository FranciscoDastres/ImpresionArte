"use client"

function CategoryCards() {
  const categories = [
    { id: 1, name: "Vasos 3D", icon: "🥤", bgColor: "bg-[#e0f2fe]", iconColor: "text-blue-500" },
    { id: 2, name: "Placas Navi", icon: "🏠", bgColor: "bg-[#f1f5f9]", iconColor: "text-sky-600" },
    { id: 3, name: "Figuras", icon: "🎭", bgColor: "bg-[#cbd5e1]", iconColor: "text-gray-700" },
  ]

  const handleCategoryClick = (categoryName) => {
    // Navegación futura
  }

  return (
    <section className="w-full px-4 py-2">
      {/* Mobile: slider horizontal, Desktop: grid */}
      <div
        className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar md:grid md:grid-cols-3 md:gap-2 md:overflow-visible md:scroll-auto justify-center mx-auto"
        style={{ maxWidth: '600px' }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="bg-white/90 backdrop-blur-sm aspect-square shadow-lg border border-gray-200 p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl min-w-[140px] md:min-w-0"
          >
            <div className={`${category.bgColor} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4`}>
              <span className={`text-3xl sm:text-4xl ${category.iconColor}`}>{category.icon}</span>
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoryCards
