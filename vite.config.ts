import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: isGithubPages ? '/guilacerda-website/' : '/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
