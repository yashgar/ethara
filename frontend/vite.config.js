import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: ["heroic-enthusiasm-production-83b6.up.railway.app", ".up.railway.app"]
  },
  server: {
    allowedHosts: true
  }
})
