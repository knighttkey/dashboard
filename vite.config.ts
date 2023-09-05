import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssNesting from 'postcss-nesting'
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    cesium({
      rebuildCesium: true,
    }),],

  base: './',  //資源路徑改為相對
  build: {
    outDir: './docs'
  },
  server: {
    host: '0.0.0.0',
    port: 9001,
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
})