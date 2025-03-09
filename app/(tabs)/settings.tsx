import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { type ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native'

import { Spacing, FontSize, FontWeight } from '@/constants/DesignTokens'
import { useTheme } from '@/hooks/useTheme'

// Define types for our settings items
interface SettingsItem {
  id: string
  title: string
  value?: string
  icon?: string
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
            name={item.icon as any}
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
  const { theme, colors } = useTheme()

  // Set text and background colors based on the current theme
  const textColor = { color: colors.text }
  const backgroundColor = {
    backgroundColor: colors.background,
  }
  const sectionBgColor = {
    backgroundColor: colors.card,
  }
  const separatorColor = colors.separator

  // Get the current theme display name
  const getThemeDisplayName = () => {
    switch (theme) {
      case 'system':
        return 'System'
      case 'dark':
        return 'Dark'
      case 'light':
        return 'Light'
      default:
        return 'System'
    }
  }

  // Appearance settings
  const appearanceSettings: SettingsItem[] = [
    {
      id: 'theme',
      title: 'Theme',
      value: getThemeDisplayName(),
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
  sectionHeader: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.gutter,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: Spacing.iconMargin,
  },
  itemTitle: {
    fontSize: FontSize.md,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: FontSize.md,
    marginRight: Spacing.xs,
  },
  separator: {
    height: 1,
    marginLeft: Spacing.gutter,
  },
  sectionSeparator: {
    height: Spacing.md,
  },
})
