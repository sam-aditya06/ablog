/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      animation: {
        dropdownV1: 'dropdownkfV1 0.2s linear 1',
      },
      keyframes: {
        dropdownkfV1: {
          '0%': {height: '0px'},
          '100%': {height: '7rem'}
        }
      }
    },
  },
  plugins: [],
}