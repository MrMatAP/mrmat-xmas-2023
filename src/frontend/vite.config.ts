import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  build: {
    outDir: '../mrmat_xmas_2023/static',
    emptyOutDir: true
  }
})
