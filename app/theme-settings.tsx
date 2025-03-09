import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Colors } from '@/constants/Colors'
import { useTheme, ThemeType } from '@/hooks/useTheme'

export default function ThemeSettingsScreen() {
  const router = useRouter()
  const { theme, setTheme, isDarkMode } = useTheme()
  const colorScheme = isDarkMode ? 'dark' : 'light'
  const colors = Colors[colorScheme]

  // Set text and background colors based on the current theme
  const textColor = { color: colors.text }
  const backgroundColor = {
    backgroundColor: colors.background,
  }
  const cardBgColor = { backgroundColor: colors.card }

  // Theme options
  const themeOptions = [
    {
      id: 'system',
      title: 'System',
      description: "Follow your device's appearance settings",
      icon: 'phone-portrait-outline',
      iconColor: colors.primary,
    },
    {
      id: 'dark',
      title: 'Dark',
      description: 'Dark appearance for low-light environments',
      icon: 'moon-outline',
      iconColor: colors.neutral,
    },
    {
      id: 'light',
      title: 'Light',
      description: 'Light appearance for bright environments',
      icon: 'sunny-outline',
      iconColor: colors.warning,
    },
  ]

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme)
    // Wait a moment for the theme to apply before going back
    setTimeout(() => {
      router.back()
    }, 300)
  }

  return (
    <View style={[styles.container, backgroundColor]}>
      <Stack.Screen
        options={{
          title: 'Theme',
          headerShown: true,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.headerText, textColor]}>
          Choose your preferred appearance
        </Text>

        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.themeCard,
              cardBgColor,
              theme === option.id && styles.selectedCard,
            ]}
            onPress={() => handleThemeChange(option.id as ThemeType)}
          >
            <View style={styles.cardHeader}>
              <Ionicons
                name={option.icon as any}
                size={24}
                color={option.iconColor}
                style={styles.cardIcon}
              />
              <Text style={[styles.cardTitle, textColor]}>{option.title}</Text>
              {theme === option.id && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary}
                />
              )}
            </View>

            <Text style={styles.cardDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.currentSetting}>
          Current setting:{' '}
          {theme === 'system'
            ? `System (${isDarkMode ? 'dark' : 'light'})`
            : theme}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  themeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginLeft: 36,
  },
  currentSetting: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 16,
  },
})
