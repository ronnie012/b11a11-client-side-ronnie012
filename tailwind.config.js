import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all relevant files
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: Add Inter font
      },
    },
  },
  plugins: [
    daisyui,
    // require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light", // Default light theme
      "dark",  // Default dark theme
    ],
  },
}