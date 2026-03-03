import React from 'react'

import { fireEvent, screen } from '@testing-library/react-native'
import { router } from 'expo-router'

import LoginScreen from '@/app/login'
import { render } from '@/lib/test/utils'
import { ThemeContextType } from '@/theme/hooks/use-theme'

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

describe('LoginScreen', () => {
  it('renders email and password fields and submit button', () => {
    render(<LoginScreen />)

    expect(screen.getByTestId('login-email-input')).toBeTruthy()
    expect(screen.getByTestId('login-password-input')).toBeTruthy()
    expect(screen.getByTestId('login-submit-button')).toBeTruthy()
  })

  it('shows email error when email is empty on submit', () => {
    render(<LoginScreen />)

    fireEvent.press(screen.getByTestId('login-submit-button'))

    expect(screen.getByTestId('login-email-error')).toBeTruthy()
    expect(screen.getByText('Email is required')).toBeTruthy()
  })

  it('shows email error when email format is invalid', () => {
    render(<LoginScreen />)

    fireEvent.changeText(screen.getByTestId('login-email-input'), 'notanemail')
    fireEvent.press(screen.getByTestId('login-submit-button'))

    expect(screen.getByText('Enter a valid email address')).toBeTruthy()
  })

  it('shows password error when password is empty on submit', () => {
    render(<LoginScreen />)

    fireEvent.changeText(
      screen.getByTestId('login-email-input'),
      'user@example.com',
    )
    fireEvent.press(screen.getByTestId('login-submit-button'))

    expect(screen.getByTestId('login-password-error')).toBeTruthy()
    expect(screen.getByText('Password is required')).toBeTruthy()
  })

  it('shows password error when password is too short', () => {
    render(<LoginScreen />)

    fireEvent.changeText(
      screen.getByTestId('login-email-input'),
      'user@example.com',
    )
    fireEvent.changeText(screen.getByTestId('login-password-input'), '123')
    fireEvent.press(screen.getByTestId('login-submit-button'))

    expect(
      screen.getByText('Password must be at least 6 characters'),
    ).toBeTruthy()
  })

  it('navigates to tabs when valid credentials are entered', () => {
    render(<LoginScreen />)

    fireEvent.changeText(
      screen.getByTestId('login-email-input'),
      'user@example.com',
    )
    fireEvent.changeText(
      screen.getByTestId('login-password-input'),
      'password123',
    )
    fireEvent.press(screen.getByTestId('login-submit-button'))

    expect(router.replace).toHaveBeenCalledWith('/(tabs)')
  })

  it('does not navigate when form is invalid', () => {
    render(<LoginScreen />)

    fireEvent.press(screen.getByTestId('login-submit-button'))

    expect(router.replace).not.toHaveBeenCalled()
  })
})
