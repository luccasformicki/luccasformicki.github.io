/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./curriculo/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D0D0D",
        accent: "#B026B0",
        body: "#C4C4C4",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "24px 24px",
      },
    },
  },
  plugins: [],
};
