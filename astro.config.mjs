import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://workspace-dr.github.io',
  base: '/omerhsa',
  
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), vue(), svelte()],
  
  // Esto desactiva Sharp para evitar el error de instalación
  image: {
    service: passthroughImageService()
  }
});
