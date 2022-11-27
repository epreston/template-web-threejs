// vite.config.js

import { defineConfig } from 'vite';
// import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  // config options
  root: 'src',
  build: {
    outDir: '../dist/',
  },
  server: {
    open: '/index.html',
  },
  plugins: [glsl()],
});
