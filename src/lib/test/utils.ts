/**
 * Main test utilities file
 * This file exports all test utilities from the setup directory
 * Following the pattern recommended in the React Native Testing Library documentation:
 * https://testing-library.com/docs/react-native-testing-library/setup/
 */

// Re-export everything from React Native Testing Library
export * from '@testing-library/react-native'

// Export our custom render function as the default render
export { render } from './setup/theme-provider'

// Add more exports as needed
