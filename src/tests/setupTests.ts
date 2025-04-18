// src/setupTests.ts
import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom'       // adds toBeInTheDocument, etc.
import { server } from '@/mocks/node'  // your MSW server

// Start MSW before all tests, reset & close after.
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Prevent useSpiceData from ever returning undefined in tests:
/*vi.mock('@/hooks/useSpiceData', async () => {
  const actual = await vi.importActual<typeof import('@/hooks/useSpiceData')>(
    '@/hooks/useSpiceData'
  )
  return {
    ...actual,
    useSpiceData: () => ({
      spices: [],               // empty array fallback
      blends: [],               // empty array fallback
      loadingSpices: false,
      loadingBlends: false,
      error: null,
      refreshData: vi.fn(),
    }),
  }
})*/
