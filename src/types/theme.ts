import { Colors } from '@/constants/colors'

/**
 * Valid color schemes for the app
 */
export type ColorScheme = 'light' | 'dark'

/**
 * Valid color names that exist in both light and dark themes
 */
export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark
