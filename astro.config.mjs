import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwindcss';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
site: 'https://workspace-dr.github.io',
  base: '/omerhsa',
  integrations: [react(), tailwind(), sitemap()],
  image: {
    service: passthroughImageService()
  }
});
