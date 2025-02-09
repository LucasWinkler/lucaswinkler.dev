import { config } from '@/config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.appName,
    short_name: config.appShortName,
    description: config.appDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#090a0c',
    theme_color: '#090a0c',
    id: '/',
    icons: [
      {
        src: '/android-chrome-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
