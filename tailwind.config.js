/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "1-2": "1fr 2fr", // Custom class name with 1fr and 2fr columns
      },
    },
  },
  plugins: [],
};
