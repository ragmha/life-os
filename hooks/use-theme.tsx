import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useColorScheme, Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors } from '@/constants/colors'

export type ThemeType = 'system' | 'dark' | 'light'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  isDarkMode: boolean
  colors: (typeof Colors)['light'] | (typeof Colors)['dark']
  isLoading: boolean
  error: string | null
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'app_theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<ThemeType>('system')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
        if (savedTheme && ['system', 'dark', 'light'].includes(savedTheme)) {
          setThemeState(savedTheme as ThemeType)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        console.error('Failed to load theme:', errorMessage)
        setError(`Failed to load theme: ${errorMessage}`)
        // Fallback to system theme if there's an error
      } finally {
        setIsLoading(false)
      }
    }

    loadTheme()
  }, [])

  // Save theme when it changes
  const setTheme = async (newTheme: ThemeType) => {
    try {
      setError(null)
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme)
      setThemeState(newTheme)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error('Failed to save theme:', errorMessage)
      setError(`Failed to save theme: ${errorMessage}`)

      // Show user-facing error message
      Alert.alert(
        'Theme Error',
        'Failed to save theme preference. Please try again.',
        [{ text: 'OK' }],
      )
    }
  }

  // Determine if dark mode is active
  const isDarkMode = useMemo(() => {
    return (
      theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark')
    )
  }, [theme, systemColorScheme])

  // Get the current theme colors
  const colors = useMemo(() => {
    return isDarkMode ? Colors.dark : Colors.light
  }, [isDarkMode])

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { theme, setTheme, isDarkMode, colors, isLoading, error }
  }, [theme, isDarkMode, colors, isLoading, error])

  if (isLoading) {
    // You could return a loading indicator here if needed
    return null
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
