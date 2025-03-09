/**
 * Index file for all mocks
 *
 * This file exports all mocks from the mocks directory.
 * Import this file in your test setup to use all mocks.
 */

// Import all mocks
import './async-storage'
import './expo'
import './react-native'

// Export theme mocks for use in tests
export * from './theme'

// Export any mock utilities that might be needed in tests
export const resetAllMocks = () => {
  jest.clearAllMocks()
}

// Add more mock utilities as needed
