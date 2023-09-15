import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import cesium from "vite-plugin-cesium";
import { name, version } from './package.json'
import { resolve } from 'path'
console.log('__dirname', __dirname)
// const input = {
//   index: resolve(__dirname, 'index.html'),
// }
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cesium(),
  ],

  base: "./", //資源路徑改為相對
  build: {
    outDir: "docs",
    // rollupOptions: {
    //   input,
    // },
  },
  server: {
    host: "0.0.0.0",
    port: 9001,
  },
  define: {
    __APP_NAME__: JSON.stringify(name),
    __APP_VERSION__: JSON.stringify(version),
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  resolve: {
    alias: [
      // { find: '@cesium', replacement: path.resolve(__dirname, 'Cesium-ion-SDK/CesiumUnminified') },
    ],
  },
});
