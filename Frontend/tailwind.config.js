/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neuro-bg': '#f8fafc',
        'neuro-primary': '#0f172a',
        'neuro-accent': '#38bdf8',
        'neuro-danger': '#ef4444',
      }
    },
  },
  plugins: [],
}