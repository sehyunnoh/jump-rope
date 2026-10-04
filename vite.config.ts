import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Will be served from https://sehyunnoh.github.io/jump-rope/ once deployed.
  base: '/jump-rope/',
  plugins: [react(), tailwindcss()],
})
