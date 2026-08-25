import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The app is a pure static bundle with no backend.
 *
 * `base` is relative by default so the build works when served from any path —
 * a GitHub Pages project site (/repo-name/), a subdirectory, or file://.
 * Override with VITE_BASE if you deploy somewhere that needs an absolute base.
 */
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
