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
        target: accountTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/accounts/, '/api'),
      },
      '/api/courses': {
        target: enrollmentTarget,
        changeOrigin: true,
      },
      '/api/users': {
        target: enrollmentTarget,
        changeOrigin: true,
      },
      '/enroll': {
        target: enrollmentTarget,
        changeOrigin: true,
      },
      '/drop': {
        target: enrollmentTarget,
        changeOrigin: true,
      },
    },
  },
})