import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/

/** @type {import("vite").UserConfig} */
export default defineConfig({
  base: '/070-cra7/',
  plugins: [vue()],
  clearScreen: false,
  build: {
    rollupOptions: {
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
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
