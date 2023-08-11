/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    extend: {
      fontFamily: {
        mainFont: "nanoFont",
      },
      backgroundColor: {
        mainColor: "#141414",
      },
      color: {
        mainColor: "#141414",
      },
    },
    screens: {
      phone: "531px",
      tablet: "856px",
      display: "1536px",
    },
  },
  plugins: [],
};
