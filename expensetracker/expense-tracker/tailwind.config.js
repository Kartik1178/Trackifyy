/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        solidpurple: '#800080',
        greyfilter:'rgba(0, 0, 0, 0.5)',
      },
      fontFamily:{
        nunito: ['Nunito', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}

