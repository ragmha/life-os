/**
 * Mock for the theme hook
 *
 * This file contains a mock implementation of the useTheme hook for testing.
 * Import this file in your test setup to mock the theme hook globally,
 * or import it in specific tests where needed.
 */

import { Colors } from '@/constants/colors'
import { ThemeType } from '@/hooks/use-theme'

// Define the theme context type
export type ThemeContextType = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  isDarkMode: boolean
  colors: typeof Colors.light | typeof Colors.dark
  isLoading: boolean
  error: string | null
}

// Mock light theme
export const mockLightTheme: ThemeContextType = {
  theme: 'light',
  setTheme: jest.fn(),
  isDarkMode: false,
  colors: Colors.light,
  isLoading: false,
  error: null,
}

// Mock dark theme
export const mockDarkTheme: ThemeContextType = {
  theme: 'dark',
  setTheme: jest.fn(),
  isDarkMode: true,
  colors: Colors.dark,
  isLoading: false,
  error: null,
}

// Create a mock for the useTheme hook
export const mockUseTheme = (isDark = false): ThemeContextType => {
  return isDark ? mockDarkTheme : mockLightTheme
}

// To use this mock globally, uncomment the following:
/*
jest.mock('@/hooks/use-theme', () => ({
  ...jest.requireActual('@/hooks/use-theme'),
  useTheme: () => mockUseTheme(false),
}))
*/
