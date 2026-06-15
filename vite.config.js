import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    // MOVE exclude HERE so it applies to the whole test runner
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
    
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      // You can keep the exclude here too if you want, but it's redundant now
    },
  },
})