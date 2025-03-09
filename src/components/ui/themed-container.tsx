import React, { ReactNode, useMemo } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { useTheme } from '@/theme/hooks'

type ThemedContainerProperties = {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
  accessibilityLabel?: string
}

/**
 * A theme-aware container component that automatically applies the correct background color
 * based on the current theme.
 */
export function ThemedContainer({
  children,
  style,
  accessibilityLabel = 'Screen container',
}: ThemedContainerProperties) {
  const { colors } = useTheme()

  // Memoize container style to prevent unnecessary object creation on re-renders
  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: colors.background }, style],
    [colors.background, style],
  )

  return (
    <View
      style={containerStyle}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="none"
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
