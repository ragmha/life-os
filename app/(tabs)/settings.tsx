import { type ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { Spacing, FontSize, FontWeight } from '@/constants/design-tokens'
import { getThemeDisplayName } from '@/constants/theme-options'
import { useTheme } from '@/hooks/use-theme'

// Define a union type for the allowed icon names
// Add all the icon names you expect to use
// For demonstration, I'm adding a few common ones
// You should expand this list based on your usage

type IconName =
  | 'moon-outline'
  | 'sunny-outline'
  | 'phone-portrait-outline'
  | 'chevron-forward'

// Define types for our settings items
interface SettingsItem {
  id: string
  title: string
  value?: string
  icon?: IconName
  iconColor?: string
  onPress: () => void
  rightElement?: ReactNode
}

interface SettingsSection {
  title: string
  data: SettingsItem[]
}

/**
 * Renders a single settings item
 */
function SettingsListItem({
  item,
  textColor,
  sectionBgColor,
  secondaryTextColor,
}: {
  item: SettingsItem
  textColor: { color: string }
  sectionBgColor: { backgroundColor: string }
  secondaryTextColor: string
}) {
  return (
    <TouchableOpacity
      style={[styles.item, sectionBgColor]}
      onPress={item.onPress}
    >
      <View style={styles.itemLeft}>
        {item.icon && (
          <Ionicons
            name={item.icon}
            size={22}
            color={item.iconColor || textColor.color}
            style={styles.itemIcon}
          />
        )}
        <Text style={[styles.itemTitle, textColor]}>{item.title}</Text>
      </View>

      <View style={styles.itemRight}>
        {item.value && (
          <Text style={[styles.itemValue, { color: secondaryTextColor }]}>
            {item.value}
          </Text>
        )}
        {item.rightElement || (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={secondaryTextColor}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

/**
 * Settings screen component that displays user configurable options
 */
export default function SettingsScreen() {
  const { theme, colors, isDarkMode } = useTheme()

  // Set text and background colors based on the current theme
  const textColor = { color: colors.text }
  const backgroundColor = {
    backgroundColor: colors.background,
  }
  const sectionBgColor = {
    backgroundColor: colors.card,
  }
  const separatorColor = colors.separator

  // Appearance settings
  const appearanceSettings: SettingsItem[] = [
    {
      id: 'theme',
      title: 'Theme',
      value: getThemeDisplayName(theme, isDarkMode),
      icon:
        theme === 'dark'
          ? 'moon-outline'
          : theme === 'light'
            ? 'sunny-outline'
            : 'phone-portrait-outline',
      iconColor:
        theme === 'dark'
          ? colors.neutral
          : theme === 'light'
            ? colors.warning
            : colors.primary,
      onPress: () => {
        router.push('/theme-settings')
      },
    },
  ]

  // Combine all settings sections
  const settingsSections: SettingsSection[] = [
    {
      title: 'Appearance',
      data: appearanceSettings,
    },
  ]

  return (
    <View style={[styles.container, backgroundColor]}>
      <SectionList
        sections={settingsSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SettingsListItem
            item={item}
            textColor={textColor}
            sectionBgColor={sectionBgColor}
            secondaryTextColor={colors.textSecondary}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader, textColor]}>{title}</Text>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separator, { backgroundColor: separatorColor }]}
          />
        )}
        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparator} />
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.gutter,
    paddingVertical: Spacing.sm,
  },
  itemIcon: {
    marginRight: Spacing.iconMargin,
  },
  itemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemTitle: {
    fontSize: FontSize.md,
  },
  itemValue: {
    fontSize: FontSize.md,
    marginRight: Spacing.xs,
  },
  sectionHeader: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    paddingBottom: Spacing.xs,
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.lg,
  },
  sectionSeparator: {
    height: Spacing.md,
  },
  separator: {
    height: 1,
    marginLeft: Spacing.gutter,
  },
})
