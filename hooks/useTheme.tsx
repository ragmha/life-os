import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useColorScheme } from 'react-native'

import { Colors } from '@/constants/Colors'

export type ThemeType = 'system' | 'dark' | 'light'

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  isDarkMode: boolean
  colors: (typeof Colors)['light'] | (typeof Colors)['dark']
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'app_theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<ThemeType>('system')
  const [isLoading, setIsLoading] = useState(true)

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        setIsLoading(true)
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
        if (savedTheme && ['system', 'dark', 'light'].includes(savedTheme)) {
          setThemeState(savedTheme as ThemeType)
        }
      } catch (error) {
        console.error('Failed to load theme:', error)
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
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.error('Failed to save theme:', error)
      // Consider showing a user-facing error message here
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
    return { theme, setTheme, isDarkMode, colors }
  }, [theme, isDarkMode, colors])

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
