import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

const accountTarget = process.env.VITE_ACCOUNT_API_BASE_URL || 'http://localhost:8002'
const enrollmentTarget = process.env.VITE_ENROLLMENT_API_BASE_URL || 'http://localhost:8001'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/accounts': {
        target: process.env.VITE_ACCOUNT_API_BASE_URL || 'http://localhost:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/accounts/, '/api'),
      },
    },
  },
})