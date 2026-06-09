/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#d9e5f5",
          200: "#b3caeb",
          300: "#7da4da",
          400: "#4a7ec7",
          500: "#2c5fb3",
          600: "#204d9a",
          700: "#1e4285",
          800: "#1a3a6e",
          900: "#1B3A6B",
          950: "#0f2340",
        },
        gold: {
          400: "#d4af6a",
          500: "#c9a251",
          600: "#b8972e",
          700: "#a0802a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
