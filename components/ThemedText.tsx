import { useMemo } from 'react'
import { Text, type TextProps, StyleSheet } from 'react-native'

import { useTheme } from '@/hooks/useTheme'

export type TextType =
  | 'default'
  | 'title'
  | 'defaultSemiBold'
  | 'subtitle'
  | 'link'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: TextType
}

/**
 * A themed text component that adapts to the current theme.
 *
 * @param style - Additional styles to apply to the text
 * @param lightColor - Custom color to use in light mode
 * @param darkColor - Custom color to use in dark mode
 * @param type - Predefined text style to use
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { isDarkMode, colors } = useTheme()

  // Determine the text color based on theme and custom colors
  const textColor = useMemo(() => {
    if (isDarkMode && darkColor) return darkColor
    if (!isDarkMode && lightColor) return lightColor
    return colors.text
  }, [isDarkMode, darkColor, lightColor, colors.text])

  // Determine the style based on the type
  const typeStyle = useMemo(() => {
    switch (type) {
      case 'title':
        return styles.title
      case 'defaultSemiBold':
        return styles.defaultSemiBold
      case 'subtitle':
        return styles.subtitle
      case 'link':
        return { ...styles.link, color: colors.link }
      default:
        return styles.default
    }
  }, [type, colors.link])

  return <Text style={[{ color: textColor }, typeStyle, style]} {...rest} />
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
})
