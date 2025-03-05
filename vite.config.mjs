import { defineConfig } from 'vite';
import { default as viteReact } from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), svgr(), tailwindcss(), commonjs()],
  server: {
    strictPort: true,
  },
  build: {
    outDir: `build`,
  },
  resolve: {
    alias: {
      $fonts: resolve('./public/fonts'),
      '@': resolve('./src'),
    },
  },
});
