/**
 * Jest configuration for React Native
 *
 * This configuration follows best practices for testing React Native applications:
 * - Uses jest-expo preset for Expo compatibility
 * - Properly transforms and mocks native modules
 * - Sets up path aliases for cleaner imports
 * - Configures coverage reporting
 */

module.exports = {
  // Use the Expo preset which handles React Native components properly
  preset: 'jest-expo',

  // Setup files that run before each test
  setupFilesAfterEnv: ['./jest.setup.ts'],

  // Transform files that aren't handled by the preset
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],

  // Path mapping for cleaner imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Test environment configuration
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!**/.expo/**',
    '!**/web-build/**',
    '!jest.config.js',
    '!babel.config.js',
    '!metro.config.js',
  ],

  // Coverage directory
  coverageDirectory: 'coverage',

  // Verbose output for better debugging
  verbose: true,

  // Cache to speed up subsequent test runs
  cache: true,

  // Clear mocks between tests
  clearMocks: true,

  // Reset mocks between tests
  resetMocks: false,

  // Don't reset modules between tests for better performance
  resetModules: false,

  // Maximum number of workers
  maxWorkers: '50%',

  // Watch plugins for better developer experience
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  // Global setup
  globalSetup: undefined,

  // Global teardown
  globalTeardown: undefined,

  // Test timeout
  testTimeout: 10000,
}
