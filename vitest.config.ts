import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mocks/**',
        'coverage/**'
      ],
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      all: true,
      thresholds: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    deps: {
      inline: [/^(?!.*\.(css|less|sass|scss|styl)$).*$/, /msw/]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});