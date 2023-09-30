/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1080px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        serif: ["Hanuman", "serif"],
        sans: ["Poppins", "sans-serif"],
        logo: ["Antonio"],
        ja: ["YakuHanJP", "Zen Kaku Gothic New"],
      },
      letterSpacing: {
        widest: ".3em",
      },
    },
  },
  plugins: [],
};
