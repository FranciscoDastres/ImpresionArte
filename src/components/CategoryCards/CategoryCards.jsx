"use client"

function CategoryCards() {
  const categories = [
    { id: 1, name: "Fashion", icon: "👔", bgColor: "bg-blue-100", iconColor: "text-blue-600" },
    { id: 2, name: "Electronics", icon: "📱", bgColor: "bg-purple-100", iconColor: "text-purple-600" },
    { id: 3, name: "Bags", icon: "👜", bgColor: "bg-red-100", iconColor: "text-red-600" },
    { id: 4, name: "Footwear", icon: "👟", bgColor: "bg-blue-100", iconColor: "text-blue-600" },
    { id: 5, name: "Groceries", icon: "🛒", bgColor: "bg-green-100", iconColor: "text-green-600" },
    { id: 6, name: "Beauty", icon: "💄", bgColor: "bg-pink-100", iconColor: "text-pink-600" },
    { id: 7, name: "Beauty", icon: "💄", bgColor: "bg-pink-100", iconColor: "text-pink-600" },
    { id: 8, name: "Beauty", icon: "💄", bgColor: "bg-pink-100", iconColor: "text-pink-600" },
  ]

  const handleCategoryClick = (categoryName) => {
    console.log(`Clicked on ${categoryName}`)
    // Aquí después agregaremos la navegación
  }

  return (
    <section className="w-full px-4 py-2">
      <div className="w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="bg-white aspect-square  shadow-md border border-gray-200 p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
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
