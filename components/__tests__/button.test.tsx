import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { render, screen, fireEvent } from '@/test/utils'

interface ButtonProps {
  onPress: () => void
  title: string
}

// A simple button component for testing
const Button = ({ onPress, title }: ButtonProps) => (
  <TouchableOpacity testID="test-button" onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
)

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button title="Press me" onPress={jest.fn()} />)

    // Using screen queries (recommended by Testing Library)
    const button = screen.getByTestId('test-button')
    expect(button).toBeTruthy()
    expect(screen.getByText('Press me')).toBeTruthy()
  })

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn()
    render(<Button title="Press me" onPress={onPressMock} />)

    const button = screen.getByTestId('test-button')
    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('renders correctly in dark mode', () => {
    render(<Button title="Dark Mode Button" onPress={jest.fn()} />, {
      darkMode: true,
    })

    expect(screen.getByText('Dark Mode Button')).toBeTruthy()
  })
})
