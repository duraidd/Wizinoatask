/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#00adb5',  // Adjust the color values as needed
          DEFAULT: '#00adb5',
          dark: '#00adb5',
        },
      },
    },
  },
  plugins: [],
}

export default config;
