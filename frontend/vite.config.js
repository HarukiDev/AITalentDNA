import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.xlsx'],
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
      '/jobRec': {
        target: 'http://103.190.214.174:5016',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jobRec/, ''),
      },
      'jobList': {
        target: 'http://103.190.214.174:5004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jobList/, ''),
      },
      'culture': {
        target: 'http://103.190.214.174:5005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/culture/, ''),
      }
    },
  },
})
