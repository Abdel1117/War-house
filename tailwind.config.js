
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        greenlight : "#94db94",
        bluelight : "#8cc"
      },
      backgroundImage: {
        hero: `url(../src/assets/images/War_house_images.jpg)`,
      },
      keyframes: {
        'height-expand': {
          '0%': { height: '0px' },
          '100%': { height: '200px' },
        },
    },
    animation: {
      'height-expand': 'height-expand 0.5s ease-out',
      'width-0-100': 'width-0-100 0.5s ease-out',
      },
   
    },
   
  },
  plugins: [],
  darkMode: "class"
}
