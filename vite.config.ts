import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/TerminalPortfolio/",
  plugins: [react()],
  server: {
    host: '::',
    port: 8080
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    rollupOptions: {
      external: [
        '@tanstack/react-query',
        '@radix-ui/react-tooltip',
        'framer-motion',
        'next-themes',
        'sonner',
        '@radix-ui/react-toast',
      ],
    },
  },
})
