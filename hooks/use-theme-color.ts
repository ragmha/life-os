/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../constants/colors'

import { useColorScheme } from './use-color-scheme'

export function useThemeColor(
  properties: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProperties = properties[theme]

  if (colorFromProperties) {
    return colorFromProperties
  } else {
    return Colors[theme][colorName]
  }
}
