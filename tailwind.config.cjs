/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF5925", // primária da marca
          ink: "#B23C0C",    // laranja acessível p/ botão/texto (branco passa 4.5:1)
          navy: "#222831",   // escuro (sidebar)
          cream: "#FFFAEB",
        },
      },
      fontFamily: { sans: ["Montserrat", "system-ui", "sans-serif"] },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #222831 0%, #FF5925 100%)",
      },
    },
  },
  plugins: [],
};
