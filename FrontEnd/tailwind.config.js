// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',       // Azul tech
        secondary: '#1e293b',     // Gris oscuro
        accent: '#22d3ee',        // Cian
        background: '#f1f5f9',    // Fondo claro
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};