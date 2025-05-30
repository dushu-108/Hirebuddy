import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    strictPort: true
  },
  preview: {
    port: process.env.PORT || 5173,
    strictPort: true
  }
})
