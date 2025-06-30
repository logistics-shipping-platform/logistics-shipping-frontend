import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  server: {
    proxy: {
      '/ws': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ws/, '/ws')
      }
    }
  }
})