import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'public',
  publicDir: '../static',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        about: resolve(__dirname, 'public/about.html'),
        menu: resolve(__dirname, 'public/menu.html'),
        gallery: resolve(__dirname, 'public/gallery.html'),
        locations: resolve(__dirname, 'public/locations.html'),
        contact: resolve(__dirname, 'public/contact.html'),
        treetown: resolve(__dirname, 'public/tree-town.html'),
        ayahotel: resolve(__dirname, 'public/aya-hotel.html'),
        notfound: resolve(__dirname, 'public/404.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
