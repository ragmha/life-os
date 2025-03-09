import { View, type ViewProps } from 'react-native'

import { useTheme } from '@/hooks/use-theme'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

/**
 * A themed view component that adapts to the current theme.
 *
 * @param style - Additional styles to apply to the view
 * @param lightColor - Custom background color to use in light mode
 * @param darkColor - Custom background color to use in dark mode
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProperties
}: ThemedViewProps) {
  const { isDarkMode, colors } = useTheme()

  // Determine the background color based on theme and custom colors
  const backgroundColor =
    isDarkMode && darkColor
      ? darkColor
      : !isDarkMode && lightColor
        ? lightColor
        : colors.background

  return <View style={[{ backgroundColor }, style]} {...otherProperties} />
}
