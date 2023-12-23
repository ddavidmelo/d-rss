import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { quasar } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    VitePWA({
      mode: 'development',
      injectManifest: {
        globPatterns: ['**/*'],
      },
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'firebase-messaging-sw.js',
      base: '/d-rss/',
      manifest: {
        name: 'D-RSS',
        short_name: 'D-RSS',
        theme_color: '#06091c',
        display: 'standalone',
        background_color: '#06091c',
        icons: [
          {
            src: 'logo-48-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'logo-96-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'logo-512-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'logo-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
});