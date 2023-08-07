/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/index.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        blue: "hsl(209, 23%, 22%)",
        darkBlue: "hsl(207, 26%, 17%)",
        veryDarkBlue: "hsl(200, 15%, 8%)",
        darkGray: "hsl(0, 0%, 52%)",
        lightGray: "hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
