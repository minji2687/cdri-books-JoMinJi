/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette
        primary: '#4780ED',
        red: '#E84119',
        gray: '#DADADA',
        'light-gray': '#F2F4F6',
        black: '#222222',
        // Text
        'text-primary': '#353C49',
        'text-secondary': '#6E7582',
        'text-subtitle': '#8D94A0',
      },
    },
  },
  plugins: [],
}
