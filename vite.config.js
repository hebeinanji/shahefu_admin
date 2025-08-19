import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // host: true, // 或者 '0.0.0.0'
    // port: 5173,
    proxy: {
      '/admin': {
        // target: 'https://tool.shahefu.cn',
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ''
        }
      },
      "/ai_img":{
        // target: 'https://tool.shahefu.cn',
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/ai_img': ''
        }
      },
    }
  },
})
