/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-hero': "url('/src/assets/background-hero-alt.jpeg')", // Specify the path to your image
        'background-match-summary': "url('/src/assets/background-match-summary.jpeg')", // Specify the path to your image
        'background-job-form': "url('/src/assets/background-hero-3.jpeg')", // Specify the path to your image
      },
      colors: {
        'background-dark': "#0e1217",
        'card-background': "#1c1f26",
      }
    },
  },
  plugins: [],
}
