
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
        'cookie-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
    },
    animation: {
      'height-expand': 'height-expand 0.5s ease-out',
      'width-0-100': 'width-0-100 0.5s ease-out',
      'cookie-slide-up': 'cookie-slide-up 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
      },
   
    },
   
  },
  plugins: [],
  darkMode: "class"
}
