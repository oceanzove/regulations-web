import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'immutable': resolve(__dirname, 'node_modules/immutable/dist/immutable.js'),
    }
  },
  define: {
    global: 'window'
  }
});
