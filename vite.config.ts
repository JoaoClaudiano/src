import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/src/', // nome do seu repo no GitHub Pages
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
