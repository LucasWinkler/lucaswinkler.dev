// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://lucaswinkler.dev',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      lastmod: new Date(),
      serialize(item) {
        if (item.url.includes('/404')) {
          return undefined;
        }

        return item;
      },
    }),
  ],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/InterVariable.woff2'],
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Libre Baskerville',
      cssVariable: '--font-libre-baskerville',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            weight: '400 700',
            style: 'italic',
            src: ['./src/assets/fonts/LibreBaskerville-Italic-VariableFont_wght.ttf'],
            display: 'swap',
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom', 'motion'],
    },
    optimizeDeps: {
      include: ['motion/react'],
    },
  },
});
