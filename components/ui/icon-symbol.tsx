// This file is a fallback for using MaterialIcons on Android and web.

import type { SymbolWeight } from 'expo-symbols'
import type { ComponentProps } from 'react'
import type { OpaqueColorValue, StyleProp, TextStyle } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// Add your SFSymbol to MaterialIcons mappings here.
const _MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as const

export type IconSymbolName = keyof typeof _MAPPING

// Default fallback icon if mapping is not found
const DEFAULT_ICON: ComponentProps<typeof MaterialIcons>['name'] =
  'help-outline'

/**
 * Safely get the mapped icon name or return the default
 */
function getMappedIconName(
  name: IconSymbolName,
): ComponentProps<typeof MaterialIcons>['name'] {
  // Use a type-safe approach to access the mapping
  switch (name) {
    case 'house.fill':
      return 'home'
    case 'paperplane.fill':
      return 'send'
    case 'chevron.left.forwardslash.chevron.right':
      return 'code'
    case 'chevron.right':
      return 'chevron-right'
    default:
      return DEFAULT_ICON
  }
}

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  // Safely get the mapped icon name
  const iconName = getMappedIconName(name)

  return (
    <MaterialIcons color={color} size={size} name={iconName} style={style} />
  )
}
