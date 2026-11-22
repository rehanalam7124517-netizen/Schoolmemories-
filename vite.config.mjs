import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const APP_VERSION = '15.9.0';
const BUILD_STAMP = String(Date.now());
const APK_UPDATE_URL = process.env.VITE_APK_UPDATE_URL || '';

function copyStaticDirectories() {
  const dirs = ['css', 'js', 'assets'];
  const files = ['favicon.ico'];

  const syncIntoDist = () => {
    const root = process.cwd();
    const outDir = path.resolve(root, 'dist');
    if (!fs.existsSync(outDir)) return;
    for (const dir of dirs) {
      const src = path.resolve(root, dir);
      const dest = path.resolve(outDir, dir);
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true, force: true });
      }
    }
    const photosSrc = path.resolve(root, 'media', 'photos');
    const photosDest = path.resolve(outDir, 'media', 'photos');
    if (fs.existsSync(photosSrc)) {
      fs.mkdirSync(path.dirname(photosDest), { recursive: true });
      fs.cpSync(photosSrc, photosDest, { recursive: true, force: true });
    }
    const aistudioAssets = path.resolve(outDir, 'assets', 'aistudio');
    if (fs.existsSync(aistudioAssets)) {
      fs.rmSync(aistudioAssets, { recursive: true, force: true });
    }
    for (const file of files) {
      const src = path.resolve(root, file);
      const dest = path.resolve(outDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    }
    fs.writeFileSync(
      path.resolve(outDir, 'version.json'),
      JSON.stringify({ version: APP_VERSION, buildTime: BUILD_STAMP, apkUpdateUrl: APK_UPDATE_URL }, null, 2)
    );
  };

  return {
    name: 'copy-static-directories',
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify({ version: APP_VERSION, buildTime: BUILD_STAMP, apkUpdateUrl: APK_UPDATE_URL }));
      });
    },
    writeBundle() {
      syncIntoDist();
    },
    closeBundle() {
      const aistudioAssets = path.resolve(process.cwd(), 'dist', 'assets', 'aistudio');
      if (fs.existsSync(aistudioAssets)) {
        fs.rmSync(aistudioAssets, { recursive: true, force: true });
      }
    },
  };
}

export default defineConfig({
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __APP_BUILD_TIME__: JSON.stringify(BUILD_STAMP),
    __APK_UPDATE_URL__: JSON.stringify(APK_UPDATE_URL),
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  plugins: [
    copyStaticDirectories(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
      ],
      manifest: {
        id: '/',
        name: 'The OG Legends — Our Memories',
        short_name: 'OG Legends',
        description:
          'Mother Teresa Public School Batch 2025–26 memories, cohort profiles, journey timeline, photo & video gallery, and batch messages.',
        theme_color: '#090a0f',
        background_color: '#090a0f',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//, /firestore\.googleapis\.com/],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        globIgnores: ['**/assets/aistudio/**', '**/media/photos/**'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\/version\.json/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\/(js|css)\/.*\.(js|css)/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'og-runtime-code',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/media\/photos\/.*\.(jpg|jpeg|png|webp)/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'og-photos-cache',
              expiration: {
                maxEntries: 160,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
});
