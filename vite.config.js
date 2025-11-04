import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SOCKET_IO_URL } from './src/utils/apiConfig.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: SOCKET_IO_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
