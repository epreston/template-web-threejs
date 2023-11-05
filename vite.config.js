// vite.config.js

import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  /** @type {import('vite').UserConfig} */
  return {
    // config options
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    plugins: [glsl({ compress: mode === 'production' ? true : false })],
    build: {
      target: ['es2022', 'chrome112', 'edge112', 'firefox112', 'safari16.4', 'ios16.4'],
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // chunking and dependency size observability
          manualChunks: (id) => {
            // create chunk for three deps.
            if (id.includes('node_modules/three') || id.includes('@three')) {
              return 'three';
            }
            // create chunk for tweakpane deps.
            if (id.includes('tweakpane') || id.includes('@tweakpane')) {
              return 'tweakpane';
            }
          }
        }
      }
    }
  };
});
