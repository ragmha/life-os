import { StyleSheet } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { ThemedView } from '@/components/themed-view'
import { useBottomTabOverflow } from '@/components/ui/tab-bar-background'
import { useColorScheme } from '@/hooks/use-color-scheme'

import type { PropsWithChildren, ReactElement } from 'react'

const HEADER_HEIGHT = 250

type Properties = PropsWithChildren<{
  headerImage: ReactElement
  headerBackgroundColor: { dark: string; light: string }
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Properties) {
  const colorScheme = useColorScheme() ?? 'light'
  const scrollReference = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollReference)
  const bottom = useBottomTabOverflow()
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    }
  })

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollReference}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: 'hidden',
    padding: 32,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
})
