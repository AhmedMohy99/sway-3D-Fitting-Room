/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        swayCyan: '#46daff', // The glow color from your image
        swayBlack: '#0a0a0a',
      },
      boxShadow: {
        swayGlow: '0 0 15px rgba(70, 218, 255, 0.6)',
      }
    },
  },
}
