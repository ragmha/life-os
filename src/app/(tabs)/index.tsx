import { StyleSheet, View } from 'react-native'

import { AppText } from '@/components/text'
import { useTheme } from '@/theme/hooks'

/**
 * Home screen component that displays the main landing page of the app.
 */
export default function HomeScreen() {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppText type="title">Home</AppText>
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
