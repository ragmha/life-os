import { ThemeOption } from '@/components/ui/theme-card'
import { ThemeType } from '@/hooks/use-theme'

import { Colors } from './colors'

// Import the ThemeOption interface from our component

/**
 * Creates theme options based on the current theme colors
 * @param colors The current theme colors
 * @returns Array of theme options
 */
export function getThemeOptions(
  colors: typeof Colors.light | typeof Colors.dark,
): ThemeOption[] {
  return [
    {
      id: 'system',
      title: 'System',
      description: 'Match your device settings',
      icon: 'phone-portrait-outline',
      iconColor: colors.primary,
    },
    {
      id: 'dark',
      title: 'Dark',
      description: 'Easier on the eyes in low light',
      icon: 'moon-outline',
      iconColor: colors.neutral,
    },
    {
      id: 'light',
      title: 'Light',
      description: 'Classic bright appearance',
      icon: 'sunny-outline',
      iconColor: colors.warning,
    },
  ]
}

/**
 * Gets the display name for a theme
 * @param theme The current theme
 * @param isDarkMode Whether the system is in dark mode
 * @returns The display name for the theme
 */
export function getThemeDisplayName(
  theme: ThemeType,
  isDarkMode: boolean,
): string {
  if (theme === 'system') {
    return `System (${isDarkMode ? 'dark' : 'light'})`
  }
  return theme.charAt(0).toUpperCase() + theme.slice(1)
}
