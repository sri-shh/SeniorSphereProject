import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls to the C++ backend (backend/seniorsphere-server.exe).
      // xfwd adds X-Forwarded-For so the backend sees each browser's real IP.
      '/api': { target: 'http://localhost:8080', xfwd: true }
    }
  }
})
