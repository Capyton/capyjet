import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      components: path.resolve('src/components'),
      hooks: path.resolve('src/hooks'),
      types: path.resolve('src/types'),
      utils: path.resolve('src/utils'),
    },
  },
  base: '/capyjet/',
});
