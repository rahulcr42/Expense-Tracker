import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // This will separate vendor libraries into their own chunk
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increases the chunk size limit for warnings (in KB)
  },
})
