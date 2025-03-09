import { ComponentProps, useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AccessibilityState,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { useTheme, ThemeType } from '@/hooks/use-theme'

// Define proper types for theme options
export type ThemeOption = {
  id: ThemeType
  title: string
  description: string
  icon: ComponentProps<typeof Ionicons>['name']
  iconColor: string
}

type ThemeCardProperties = {
  option: ThemeOption
  isSelected: boolean
  onSelect: (themeType: ThemeType) => void
}

export function ThemeCard({
  option,
  isSelected,
  onSelect,
}: ThemeCardProperties) {
  const { colors } = useTheme()

  // Memoize dynamic styles to prevent unnecessary recalculations
  const dynamicStyles = useMemo(
    () => ({
      text: { color: colors.text },
      card: { backgroundColor: colors.card },
      selected: {
        borderColor: colors.primary,
        borderWidth: 2,
      },
      shadow: {
        shadowColor: colors.shadow,
      },
    }),
    [colors],
  )

  // Accessibility props for better screen reader support
  const accessibilityState: AccessibilityState = {
    selected: isSelected,
  }

  const accessibilityLabel = `${option.title} theme. ${option.description}. ${isSelected ? 'Currently selected.' : 'Tap to select.'}`

  function handlePress() {
    onSelect(option.id)
  }

  return (
    <TouchableOpacity
      style={[
        styles.themeCard,
        dynamicStyles.card,
        isSelected && dynamicStyles.selected,
        dynamicStyles.shadow,
      ]}
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.cardHeader}>
        <Ionicons
          name={option.icon}
          size={24}
          color={option.iconColor}
          style={styles.cardIcon}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
        />
        <Text
          style={[styles.cardTitle, dynamicStyles.text]}
          accessibilityRole="header"
        >
          {option.title}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={colors.primary}
            accessibilityElementsHidden={true}
            importantForAccessibility="no"
          />
        )}
      </View>

      <Text
        style={[styles.cardDescription, dynamicStyles.text]}
        accessibilityRole="text"
      >
        {option.description}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardDescription: {
    fontSize: 14,
    marginLeft: 36,
    opacity: 0.9, // Align with title for better readability
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  themeCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})
