import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

/* One HTML file per page, so /services/ and the rest are real files that
   any static host serves directly, each with its own title and description. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        visit: resolve(__dirname, 'visit/index.html'),
      },
    },
  },
})
