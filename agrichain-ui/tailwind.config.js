// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind finds all classes in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}