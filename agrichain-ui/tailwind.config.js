/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: Must be 'class' for manual theme toggling
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Defining custom font family based on the design
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // Custom colors can be extended here if needed
    },
  },
  plugins: [],
}