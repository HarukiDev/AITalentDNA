import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://103.190.214.174:5017',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/chat': {
        target: 'http://103.190.214.174:5011',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat/, ''),
      },
      '/find': {
        target: 'http://103.190.214.174:5002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/find/, ''),
      },
    },
  },
})
