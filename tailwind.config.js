/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'height-expand': {
          '0%': { height: '0px' },
          '100%': { height: '200px' },
        },
    },
    animation: {
      'height-expand': 'height-expand 0.5s ease-out',
      },
    },
  },
  plugins: [],
  darkMode: "class"
}

