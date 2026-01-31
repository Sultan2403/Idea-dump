/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // scan all React files
  ],
  theme: {
    extend: {
      colors: {
        // Base cream palette
        cream: "#FAF7F2",
        offwhite: "#F8F5F0",
        primaryText: "#2C2C2C", // a touch softer, still readable

        secondaryText: "#6B6B6B",
        borderGray: "#E6E1D8",
        // Accent colors
        softBrown: "#A67C52",
        dustyBlue: "#6C7A89",
        mutedSage: "#6F8F7A",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Source Serif 4", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem", // subtle rounding
        lg: "0.75rem",
      },
    },
  },
  plugins: [],
};
