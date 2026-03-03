import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { useTheme } from '@/theme/hooks'

/**
 * Status screen component that displays the current system status of the app.
 */
export default function StatusScreen() {
  const { colors } = useTheme()

  return (
    <View
      testID="status-screen"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText type="title">Status</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
