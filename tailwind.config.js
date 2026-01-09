/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffffff',
          500: '#000000',
          600: '#000000',
          700: '#000000',
        }
      }
    },
  },
  plugins: [],
}