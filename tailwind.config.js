/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- IMPORTANTE para que escanee tus archivos
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
