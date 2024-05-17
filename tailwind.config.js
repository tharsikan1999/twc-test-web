/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        back: "url('assets/img/background.png')",
      },
      colors: {
        customGreen: "#083F46",
      },
    },
  },
  plugins: [],
};
