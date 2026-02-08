import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: path.resolve(__dirname, 'frontend/public'),
  build: {
    outDir: 'dist',
  },
});
