// vite.config.js

import { defineConfig } from 'vite';
// import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  // config options
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.m4a'],
  server: {
    open: '/index.html',
  },
  plugins: [glsl()],
  build: {
    target: ['es2022', 'edge111', 'firefox111', 'chrome111', 'safari16.3', 'ios16.3'],
  },
});
