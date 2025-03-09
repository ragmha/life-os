import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, Fragment } from 'react'

import { ThemeProvider, useTheme } from '@/hooks/useTheme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
  const { isDarkMode, colors } = useTheme()

  return (
    <Fragment>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="theme" />
        <Stack.Screen name="theme-settings" options={{ title: 'Theme' }} />
      </Stack>
    </Fragment>
  )
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  )
}
