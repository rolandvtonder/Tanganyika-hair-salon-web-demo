import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

/* One HTML file per page, so /services/ and the rest are real files that
   any static host serves directly, each with its own title and description.

   BASE is the path the site is served under. Unset it is '/', for local dev
   or a host at the domain root; the GitHub Pages workflow sets it to the
   repository path. */
export default defineConfig({
  base: process.env.BASE ?? '/',
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
