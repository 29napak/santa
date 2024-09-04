import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  root: '.', // Specify that the root directory is the same level as vite.config.ts
  build: {
    outDir: 'dist', // Output folder for built files
    rollupOptions: {
      input: './index.html', // Point to the index.html in the root
    },
  },
});
