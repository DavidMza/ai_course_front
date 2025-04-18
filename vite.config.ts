import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ai_course_front/',
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://courses-ai-api-472395568495.southamerica-west1.run.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1')
      }
    }
  }
});