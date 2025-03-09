import { Stack, useRouter } from 'expo-router'
import { useMemo, useCallback } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'

import { ThemeCard } from '@/components/ui/theme-card'
import { ThemedContainer } from '@/components/ui/themed-container'
import { getThemeOptions } from '@/constants/theme-options'
import { useTheme, ThemeType } from '@/hooks/use-theme'

export default function ThemeScreen() {
  const { theme, setTheme, colors } = useTheme()
  const router = useRouter()

  // Memoize theme options to prevent unnecessary recalculations
  const themeOptions = useMemo(() => getThemeOptions(colors), [colors])

  // Memoize text style to prevent unnecessary object creation
  const headerTextStyle = useMemo(
    () => [styles.headerText, { color: colors.text }],
    [colors.text],
  )

  // Memoize the theme change handler to prevent unnecessary function creation
  const handleThemeChange = useCallback(
    (newTheme: ThemeType) => {
      setTheme(newTheme)
      router.back()
    },
    [setTheme, router],
  )

  return (
    <ThemedContainer>
      <Stack.Screen
        options={{
          title: 'Theme',
          headerShown: true,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        accessibilityRole="radiogroup"
        accessibilityLabel="Theme selection"
      >
        <Text style={headerTextStyle} accessibilityRole="header">
          Choose your preferred appearance
        </Text>

        {themeOptions.map((option) => (
          <ThemeCard
            key={option.id}
            option={option}
            isSelected={theme === option.id}
            onSelect={handleThemeChange}
          />
        ))}
      </ScrollView>
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
  },
})
