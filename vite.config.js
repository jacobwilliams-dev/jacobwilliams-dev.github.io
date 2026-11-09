import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Vite's default, set on purpose: the site is served from the domain root
  base: '/',
  plugins: [react()],
})
