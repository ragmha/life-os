import React from 'react'

import StatusScreen from '@/app/(tabs)/status'
import { render, screen } from '@/lib/test/utils'
import { ThemeContextType } from '@/theme/hooks/use-theme'

// Mock the useTheme hook with proper typing
jest.mock('@/theme/hooks/use-theme', () => {
  const { Colors } = jest.requireActual<{
    Colors: typeof import('@/theme').Colors
  }>('@/theme')

  const mockModule: {
    useTheme: () => ThemeContextType
  } = {
    ...jest.requireActual('@/theme/hooks/use-theme'),
    useTheme: (): ThemeContextType => ({
      theme: 'light',
      setTheme: jest.fn(),
      isDarkMode: false,
      colors: Colors.light,
      isLoading: false,
      error: null,
    }),
  }
  return mockModule
})

describe('StatusScreen', () => {
  it('renders correctly', () => {
    render(<StatusScreen />)

    expect(screen.getByText('Status')).toBeTruthy()
  })

  it('renders the status container', () => {
    render(<StatusScreen />)

    expect(screen.getByTestId('status-screen')).toBeTruthy()
  })

  it('renders correctly in dark mode', () => {
    render(<StatusScreen />, { darkMode: true })

    expect(screen.getByText('Status')).toBeTruthy()
  })
})
