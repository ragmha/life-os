/**
 * Mocks for React Native modules
 *
 * This file contains mocks for various React Native modules used in the application.
 * Import this file in your test setup to mock React Native dependencies.
 */

// Silence React Native warnings during tests
jest.mock('react-native/Libraries/LogBox/LogBox', () => ({
  ignoreLogs: jest.fn(),
}))

// Mock fetch with a properly typed implementation
const createMockResponse = (): Response => {
  // Create a real Response object
  const mockResponse = new Response(JSON.stringify({}), {
    status: 200,
    statusText: 'OK',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })

  // Add spy methods to track calls
  jest.spyOn(mockResponse, 'json').mockResolvedValue({})
  jest.spyOn(mockResponse, 'text').mockResolvedValue('')

  return mockResponse
}

// Create a typed mock for fetch
const mockFetch = jest
  .fn()
  .mockImplementation(() => Promise.resolve(createMockResponse()))

// Assign the mock to global.fetch
global.fetch = mockFetch

// Suppress React Native specific warnings
const originalConsoleWarn = console.warn
console.warn = (...args: Parameters<typeof console.warn>) => {
  // Suppress useNativeDriver warning
  if (typeof args[0] === 'string' && args[0].includes('useNativeDriver')) {
    return
  }
  originalConsoleWarn(...args)
}
