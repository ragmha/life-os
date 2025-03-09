import { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Link, Stack } from 'expo-router'

import { useTheme } from '@/hooks/use-theme'

export default function NotFoundScreen() {
  const { colors } = useTheme()

  return (
    <Fragment>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={{ color: colors.link }}>Go to home screen!</Text>
        </Link>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
