import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo-recife.png'],
      manifest: {
        name: 'EduRecife — Matrículas Escolares',
        short_name: 'EduRecife',
        description: 'Painel de matrículas escolares do município do Recife',
        theme_color: '#1351b4',
        background_color: '#f0f4f8',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo-recife.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo-recife.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/back-end-edu-rec\.onrender\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 24 horas
              },
            },
          },
        ],
      },
    }),
  ],
});