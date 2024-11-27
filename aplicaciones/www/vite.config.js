import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), externalizeDeps()],
  clearScreen: false,
  build: {
    outDir: 'publico',
    assetsDir: 'estaticos',
    sourcemap: true,
  },
  publicDir: 'estaticos',
});
