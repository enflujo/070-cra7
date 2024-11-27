import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/

/** @type {import("vite").UserConfig} */
export default defineConfig({
  plugins: [vue()],
  clearScreen: false,
  build: {
    rollupOptions: {
      //external: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/blotter.min.js',
      output: {
        globals: {
          Blotter: 'window.Blotter',
        },
      },
    },
    outDir: 'publico',
    assetsDir: 'estaticos',
    sourcemap: true,
  },
  publicDir: 'estaticos',
});
