import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MIA/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  }
})
