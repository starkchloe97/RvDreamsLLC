import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  appType: 'spa',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/vue-router/')) return 'router';
          if (id.includes('/node_modules/vue/') || id.includes('/node_modules/@vue/')) return 'vue';
        }
      }
    }
  }
});
