/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        'Rubrik':["Rubik", "sans-serif"]
      },
      screens:{
        'xsm':'100px'
      }
    },
  },
  plugins: [],
}


