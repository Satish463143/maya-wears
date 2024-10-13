/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite/plugin');

export default {
  content: [
    './index.html',
    './src/**/*.{jsx,js,ts,tsx}', // Scan your JSX/TSX files
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' // Include Flowbite React
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite], // Add Flowbite plugin
};
