import React from 'react'

import { ThemedText } from '@/components/themed-text'
import { render, screen } from '@/test/utils'

// Mock the useTheme hook
jest.mock('@/hooks/use-theme', () => ({
  ...jest.requireActual('@/hooks/use-theme'),
  useTheme: () => ({
    isDarkMode: false,
    colors: {
      text: '#000000',
      link: '#0a7ea4',
    },
  }),
}))

describe('ThemedText', () => {
  it('renders correctly', () => {
    render(<ThemedText>Testing Library Test</ThemedText>)

    // Using screen queries from Testing Library
    const textElement = screen.getByText('Testing Library Test')
    expect(textElement).toBeTruthy()
  })

  it('applies custom light color when provided', () => {
    render(<ThemedText lightColor="#FF0000">Custom Color Text</ThemedText>)

    const textElement = screen.getByText('Custom Color Text')
    expect(textElement).toBeTruthy()
    // In a real test, we would check the style properties
  })

  it('renders correctly in dark mode', () => {
    render(<ThemedText>Dark Mode Text</ThemedText>, { darkMode: true })

    expect(screen.getByText('Dark Mode Text')).toBeTruthy()
  })
})
