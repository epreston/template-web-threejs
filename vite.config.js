// vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  // config options
  root: 'src',
  build: {
    outDir: '../dist/',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        //   nested: resolve(__dirname, 'src/nested/index.html')
      },
    },
  },
  // server: {
  //   open: '/index.html',
  // },
  plugins: [glsl()],
});
