/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
    },
    // backgroundImage: {
    //   "custom-gradient":
    //     "linear-gradient(rgba(0, 0, 0, 0.38), rgba(255, 255, 255, 0.38))",
    // },
  },
  plugins: [],
};
