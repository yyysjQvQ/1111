import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const mainBackend = env.VITE_MAIN_BACKEND || 'http://localhost:8081'
  const aiBackend = env.VITE_AI_BACKEND || 'http://localhost:8082'
  const extBackend = env.VITE_EXT_BACKEND || 'http://localhost:8083'
  return {
    plugins: [vue()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
      port: Number(env.VITE_DEV_PORT || 5173),
      host: '0.0.0.0',
      proxy: {
        '/api/auth': { target: mainBackend, changeOrigin: true },
        '/api/users': { target: mainBackend, changeOrigin: true },
        '/api/voices': { target: mainBackend, changeOrigin: true },
        '/api/audio': { target: aiBackend, changeOrigin: true },
        '/api/tts': { target: aiBackend, changeOrigin: true },
        '/api/voice': { target: aiBackend, changeOrigin: true },
        '/api/feedback': { target: extBackend, changeOrigin: true },
        '/api/stats': { target: extBackend, changeOrigin: true },
        '/api/scripts': { target: extBackend, changeOrigin: true },
        '/api/help': { target: extBackend, changeOrigin: true },
        '/api/live': { target: extBackend, changeOrigin: true }
      }
    },
    build: { chunkSizeWarningLimit: 1600 }
  }
})
