import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: './',  //資源路徑改為相對
  build: {
    outDir: './docs'
  },
  server: {
    host: '0.0.0.0',
    port: 9001,
  },
})