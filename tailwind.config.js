/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./content/**/*.{vue,js,ts,jsx,tsx}",
    "./content/.vitepress/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      screens: {
        'xl': '1280px',
        '2xl': '1280px',
        'lg': '960px'
      }
    },
  },
  plugins: [],
}

