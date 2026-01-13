import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/src/',
  build: { outDir: 'dist' },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
