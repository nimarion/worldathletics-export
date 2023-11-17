/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tourLightOrange': '#ff8040',
        'tourDarkBlue': '#293847',
        'tourOrange': '#fa4517',
        'tourRed': 'd12630'
      },
    },
  },
  plugins: [

  ],
};


