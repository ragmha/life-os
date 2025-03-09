import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { useTheme } from '@/hooks/use-theme'

/**
 * Home screen component that displays the main landing page of the app.
 */
export default function HomeScreen() {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText type="title">Home</ThemedText>
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
