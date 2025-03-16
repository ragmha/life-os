import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'

import { Calendar } from '@/components/calendar'
import { useTheme } from '@/theme/hooks'

/**
 * Home screen component that displays the main landing page of the app.
 */
export default function HomeScreen() {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar />
      <Calendar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
