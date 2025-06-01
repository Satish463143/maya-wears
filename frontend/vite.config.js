import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable bundle analysis
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for large third-party libraries
          vendor: ['react', 'react-dom'],
          // UI components chunk
          ui: ['flowbite-react', 'react-select', 'react-slick'],
          // Form handling chunk
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          // State management chunk
          state: ['@reduxjs/toolkit', 'react-redux'],
          // Utilities chunk
          utils: ['axios', 'js-cookie', 'sweetalert2', 'react-toastify']
        }
      }
    },
    // Generate source maps for analysis
    sourcemap: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Enable bundle analyzer in development
  define: {
    __ANALYZE__: process.env.ANALYZE === 'true'
  }
})
