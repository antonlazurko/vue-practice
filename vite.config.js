import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the app from https://<user>.github.io/vue-practice/
  base: command === 'build' ? '/vue-practice/' : '/',
  plugins: [vue()],
}))
