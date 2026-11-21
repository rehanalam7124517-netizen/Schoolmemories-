import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

function copyStaticDirectories() {
  const dirs = ['css', 'js', 'assets'];
  const files = ['favicon.ico'];
  return {
    name: 'copy-static-directories',
    closeBundle() {
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
    },
  };
}

export default defineConfig({
  base: './',
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
  plugins: [copyStaticDirectories()],
});
