/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import type { ColorScheme, ColorName } from '@/types/theme'

import { Colors } from '../constants/colors'

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

  // Check if the color exists in the theme
  if (Object.prototype.hasOwnProperty.call(themeColors, colorName)) {
    // Type assertion is safe here because we've checked that the property exists
    return themeColors[colorName as keyof typeof themeColors]
  }

  // Fallback to a default color
  return '#000000'
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
