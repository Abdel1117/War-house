import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],


  test: {
    // https://vitest.dev/config/
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/vitest.setup.tsx'],
    include: ['./src/__tests__/**/*.[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', 'src/test/vitest.setup.js'],
    coverage: {
      provider: 'istanbul',
      exclude: ['**/node_modules/**', '**/dist/**', '**/tailwind.config.cjs', '**/postcss.config.cjs', '**/vite.config.ts'], 
    },
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})
