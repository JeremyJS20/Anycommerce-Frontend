import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Domain': path.resolve(__dirname, './src/Domain'),
      '@Data': path.resolve(__dirname, './src/Data'),
      '@Infrastructure': path.resolve(__dirname, './src/Infrastructure'),
      '@Presentation': path.resolve(__dirname, './src/Presentation'),
      '@Validation': path.resolve(__dirname, './src/Validation'),
      '@Main': path.resolve(__dirname, './src/Main'),
    },
  },
})
