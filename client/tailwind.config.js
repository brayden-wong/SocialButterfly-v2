/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '300px',
      },
      colors: {
        white: {
          milk: '#f5f5f5'
        }
      }
    }
  },
  plugins: [],
}
