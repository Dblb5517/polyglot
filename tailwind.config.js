/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",     // if using Vite
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
   plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
}
