// vite.config.js

import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  // config options
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.m4a'],
  server: {
    open: '/index.html'
  },
  plugins: [glsl()],
  build: {
    target: ['es2022', 'chrome112', 'edge112', 'firefox112', 'safari16.4', 'ios16.4']
  }
});
