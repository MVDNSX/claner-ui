import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Разрешает доступ извне (0.0.0.0)
    port: 5173, // Можно указать свой порт
    strictPort: true, // Гарантирует использование именно этого порта
    allowedHosts: ['clanpwaura.loca.lt'],
  },
})
