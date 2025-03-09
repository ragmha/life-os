import React, { ReactNode, createContext } from 'react'

import {
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react-native'

import {
  ThemeContextType,
  mockDarkTheme,
  mockLightTheme,
} from '@/lib/test/mocks'

// Create a mock ThemeContext since the original is not exported
export const MockThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

type TestProviderProps = {
  children: ReactNode
  darkMode?: boolean
}

// Test wrapper with ThemeProvider
export function TestThemeProvider({
  children,
  darkMode = false,
}: TestProviderProps) {
  const contextValue = darkMode ? mockDarkTheme : mockLightTheme

  return (
    <MockThemeContext.Provider value={contextValue}>
      {children}
    </MockThemeContext.Provider>
  )
}

// Custom render options
type CustomRenderOptions = {
  darkMode?: boolean
} & Omit<RenderOptions, 'wrapper'>

/**
 * Custom render function that wraps the component with ThemeProvider
 * Following the pattern recommended in the React Native Testing Library documentation:
 * https://testing-library.com/docs/react-native-testing-library/setup/
 */
function render(ui: React.ReactElement, options: CustomRenderOptions = {}) {
  const { darkMode = false, ...renderOptions } = options

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <TestThemeProvider darkMode={darkMode}>{children}</TestThemeProvider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// Export the custom render function
export { render }
