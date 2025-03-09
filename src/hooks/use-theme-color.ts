/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import type { ColorScheme, ColorName } from '@/types/theme'

import { Colors } from '@/constants/colors'

import { useColorScheme } from './use-color-scheme'

/**
 * Safely get a color from properties based on theme
 */
function getColorFromProperties(
  properties: { light?: string; dark?: string },
  theme: ColorScheme,
): string | undefined {
  if (theme === 'light') {
    return properties.light
  }
  if (theme === 'dark') {
    return properties.dark
  }
  return undefined
}

/**
 * Safely get a color from the Colors object
 */
function getColorFromColors(theme: ColorScheme, colorName: ColorName): string {
  // Use a type-safe approach to access colors
  const themeColors = theme === 'light' ? Colors.light : Colors.dark

  // Define a type-safe mapping function to avoid direct object injection
  const getColorByName = (
    colors: typeof themeColors,
    name: ColorName,
  ): string => {
    // Use a switch statement instead of dynamic property access
    switch (name) {
      case 'text':
        return colors.text
      case 'textSecondary':
        return colors.textSecondary
      case 'link':
        return colors.link
      case 'background':
        return colors.background
      case 'card':
        return colors.card
      case 'tint':
        return colors.tint
      case 'primary':
        return colors.primary
      case 'icon':
        return colors.icon
      case 'tabIconDefault':
        return colors.tabIconDefault
      case 'tabIconSelected':
        return colors.tabIconSelected
      case 'separator':
        return colors.separator
      case 'success':
        return colors.success
      case 'warning':
        return colors.warning
      case 'neutral':
        return colors.neutral
      case 'border':
        return colors.border
      case 'shadow':
        return colors.shadow
      default:
        // This should never happen since we're using a type-safe ColorName
        return '#000000'
    }
  }

  // Get the color using the safe mapping function
  return getColorByName(themeColors, colorName)
}

/**
 * Hook to get the appropriate color for the current theme
 */
export function useThemeColor(
  properties: { light?: string; dark?: string },
  colorName: ColorName,
): string {
  const theme = useColorScheme() ?? 'light'
  const validTheme: ColorScheme = theme === 'dark' ? 'dark' : 'light'

  // First try to get color from properties
  const colorFromProperties = getColorFromProperties(properties, validTheme)
  if (colorFromProperties) {
    return colorFromProperties
  }

  // Otherwise get from Colors
  return getColorFromColors(validTheme, colorName)
}
