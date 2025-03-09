/**
 * Jest setup file for React Native testing
 *
 * This file runs before each test and sets up:
 * - Custom matchers from jest-native
 * - Mocks for native modules
 * - Global test utilities
 */

// Import jest-native matchers for React Native specific assertions
import '@testing-library/jest-native/extend-expect'

// Import all mocks
import './test/mocks'

// Mock timers for consistent timing in tests
jest.useFakeTimers()

// Ensure proper cleanup between tests
afterEach(() => {
  jest.clearAllMocks()
})
