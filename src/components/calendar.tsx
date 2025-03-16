import React, { useState, useCallback, useMemo, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'

import * as Localization from 'expo-localization'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  SharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

import { useTheme } from '@/theme/hooks'

const { width } = Dimensions.get('window')

// Get device locale using Expo's localization
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const deviceLocale = Localization.locale

// Helper to calculate days remaining in month
const getDaysRemainingInMonth = (date: Date): number => {
  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate()
  return lastDayOfMonth - date.getDate()
}

type CalendarProps = {
  startDate?: Date
  onDateSelected?: (date: Date) => void
  locale?: string
}

type DayItemProps = {
  day: Date
  weekOffset: number
  isSelected: boolean
  scrollX: SharedValue<number>
  onPress: (date: Date) => void
  colors: ReturnType<typeof useTheme>['colors']
  testID?: string
  locale: string
}

function DayItem({
  day,
  weekOffset,
  isSelected,
  scrollX,
  onPress,
  colors,
  testID,
  locale,
}: DayItemProps) {
  const accessibilityLabel = useMemo(() => {
    return day.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }, [day, locale])

  const animatedDayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      [0, width, width * 2],
      weekOffset === -1
        ? [1, 0.6, 0.3]
        : weekOffset === 0
          ? [0.6, 1, 0.6]
          : [0.3, 0.6, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    ),
    transform: [
      {
        scale: isSelected
          ? interpolate(
              scrollX.value,
              [width - 50, width, width + 50],
              [0.95, 1, 0.95],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            )
          : 1,
      },
    ],
  }))

  return (
    <Animated.View style={animatedDayStyle}>
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isSelected && [
            styles.selectedDayContainer,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.shadow,
            },
          ],
        ]}
        onPress={() => onPress(day)}
        activeOpacity={0.7}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        testID={testID}
      >
        <Text
          style={[
            styles.dayText,
            { color: colors.text },
            isSelected && { color: colors.background },
          ]}
        >
          {day.toLocaleDateString(locale, { weekday: 'short' }).charAt(0)}
        </Text>
        <Text
          style={[
            styles.dateText,
            { color: colors.text },
            isSelected && { color: colors.background },
          ]}
        >
          {day.getDate()}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const getWeekDays = (date: Date, offset: number): Date[] => {
  const days: Date[] = []
  const startDate = new Date(date)

  startDate.setDate(startDate.getDate() + offset * 7)
  const firstDayOfWeek = new Date(startDate)

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek)
    day.setDate(firstDayOfWeek.getDate() + i)
    days.push(day)
  }
  return days
}

export function Calendar({
  startDate = new Date(),
  onDateSelected,
  locale = deviceLocale,
}: CalendarProps) {
  const { colors } = useTheme()
  const [currentDate, setCurrentDate] = useState<Date>(startDate || new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(
    startDate || new Date(),
  )
  const scrollViewRef = useRef<ScrollView>(null)
  const isScrolling = useRef(false)
  const isAnimating = useRef(false)
  const scrollX = useSharedValue(width)

  const updateAfterDateSelection = useCallback(
    (date: Date) => {
      if (!date) return

      setSelectedDate(date)
      setCurrentDate(date)
      onDateSelected?.(date)

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: width, animated: false })
        scrollX.value = width
        isAnimating.current = false
      }, 50)
    },
    [onDateSelected, scrollX],
  )

  const isSameWeek = useCallback((date1: Date, date2: Date) => {
    if (!date1 || !date2) return false

    const days = getWeekDays(date2, 0)
    return days.some(
      (day) =>
        day.getDate() === date1.getDate() &&
        day.getMonth() === date1.getMonth() &&
        day.getFullYear() === date1.getFullYear(),
    )
  }, [])

  const handleDateSelected = useCallback(
    (date: Date) => {
      if (!date || isAnimating.current || isScrolling.current) return

      if (isSameWeek(date, currentDate)) {
        setSelectedDate(date)
        onDateSelected?.(date)
        return
      }

      isAnimating.current = true

      const direction = date > currentDate ? 'next' : 'prev'
      const targetX = direction === 'next' ? width * 2 : 0
      scrollX.value = withTiming(targetX, { duration: 250 }, () => {
        runOnJS(updateAfterDateSelection)(date)
      })

      scrollViewRef.current?.scrollTo({
        x: targetX,
        animated: true,
      })
    },
    [
      currentDate,
      isSameWeek,
      onDateSelected,
      scrollX,
      updateAfterDateSelection,
    ],
  )

  const handleWeekChange = useCallback(
    (direction: 'next' | 'prev') => {
      if (isScrolling.current || isAnimating.current) return
      isScrolling.current = true

      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
      setCurrentDate(newDate)

      const targetX = direction === 'next' ? width * 2 : 0
      scrollX.value = targetX

      scrollViewRef.current?.scrollTo({
        x: targetX,
        animated: true,
      })

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: width, animated: false })
        scrollX.value = width
        isScrolling.current = false
      }, 300)
    },
    [currentDate, scrollX],
  )

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      if (isAnimating.current) return

      const { contentOffset } = event.nativeEvent
      scrollX.value = contentOffset.x

      const currentPage = Math.round(contentOffset.x / width)
      if (currentPage === 0 && !isScrolling.current) {
        handleWeekChange('prev')
      } else if (currentPage === 2 && !isScrolling.current) {
        handleWeekChange('next')
      }
    },
    [handleWeekChange, scrollX],
  )

  const weeks = useMemo(
    () => [
      getWeekDays(currentDate, -1),
      getWeekDays(currentDate, 0),
      getWeekDays(currentDate, 1),
    ],
    [currentDate],
  )

  const monthTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, [0, width, width * 2], [0.7, 1, 0.7], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          [0, width, width * 2],
          [5, 0, 5],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        ),
      },
    ],
  }))

  // Calculate days remaining in the month
  const daysRemaining = useMemo(() => {
    if (!selectedDate) return 0
    return getDaysRemainingInMonth(selectedDate)
  }, [selectedDate])

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      testID="calendar-container"
    >
      <View style={styles.headerContainer}>
        <Animated.Text
          style={[styles.monthText, { color: colors.text }, monthTextStyle]}
          accessibilityRole="header"
        >
          {selectedDate?.toLocaleDateString(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }) || ''}
        </Animated.Text>

        <Text style={[styles.daysRemainingText, { color: colors.text }]}>
          {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
        </Text>
      </View>

      <View style={styles.calendarContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScroll}
          contentOffset={{ x: width, y: 0 }}
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          scrollEnabled={!isAnimating.current}
        >
          {weeks.map((week, weekIndex) => (
            <View key={`week-${weekIndex}`} style={styles.weekContainer}>
              {week.map((day) => (
                <DayItem
                  key={day.toDateString()}
                  day={day}
                  weekOffset={weekIndex - 1}
                  isSelected={
                    selectedDate?.toDateString() === day.toDateString()
                  }
                  scrollX={scrollX}
                  onPress={handleDateSelected}
                  colors={colors}
                  testID="day-item"
                  locale={locale}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
  },
  headerContainer: {
    marginBottom: 10,
  },
  calendarContainer: {
    paddingVertical: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  daysRemainingText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    width: width / 7 - 10,
    height: 70,
  },
  selectedDayContainer: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  dayText: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
