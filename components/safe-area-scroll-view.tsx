import { ScrollView, type ScrollViewProps } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks/use-theme'

export type SafeAreaScrollViewProps = ScrollViewProps & {
  lightColor?: string
  darkColor?: string
  respectSafeArea?: {
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
  }
}

/**
 * A themed ScrollView component that respects safe area boundaries.
 *
 * @param style - Additional styles to apply to the ScrollView
 * @param lightColor - Custom background color to use in light mode
 * @param darkColor - Custom background color to use in dark mode
 * @param respectSafeArea - Configure which safe areas to respect (defaults to all)
 */
export function SafeAreaScrollView({
  style,
  lightColor,
  darkColor,
  respectSafeArea = { top: true, bottom: true, left: true, right: true },
  contentContainerStyle,
  ...otherProperties
}: SafeAreaScrollViewProps) {
  const { isDarkMode, colors } = useTheme()
  const insets = useSafeAreaInsets()

  // Determine the background color based on theme and custom colors
  const backgroundColor =
    isDarkMode && darkColor
      ? darkColor
      : !isDarkMode && lightColor
        ? lightColor
        : colors.background

  // Calculate padding based on safe area insets
  const padding = {
    paddingTop: respectSafeArea.top ? insets.top : 0,
    paddingBottom: respectSafeArea.bottom ? insets.bottom : 0,
    paddingLeft: respectSafeArea.left ? insets.left : 0,
    paddingRight: respectSafeArea.right ? insets.right : 0,
  }

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      contentContainerStyle={[padding, contentContainerStyle]}
      {...otherProperties}
    />
  )
}
