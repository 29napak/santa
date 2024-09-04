import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  root: '.', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
  server: {
    port: 3001, // เปลี่ยนพอร์ตเป็น 3001 หรือพอร์ตอื่นๆ ที่ไม่ได้ใช้งาน
  },
});
