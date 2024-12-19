import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép truy cập từ mạng LAN hoặc VPN
    port: 5173, // Cổng mặc định của Vite
  },
})
