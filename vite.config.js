import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    // Add this coverage block!
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'], // 'lcov' is strictly required by SonarCloud
    },
  },
})