/**
 * Design tokens index file
 * This file exports all design tokens from a single place for easier imports.
 * Import from this file instead of individual token files.
 */

import { Colors } from './colors'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  FONT_SCALE,
  horizontalScale,
  verticalScale,
  moderateScale,
  normalizeFont,
  isTablet,
  addDimensionListener,
  deviceSpecific,
} from './responsive'
import { Spacing, Shadows, createShadow } from './spacing'
import {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from './typography'

export {
  // Colors
  Colors,

  // Spacing
  Spacing,
  Shadows,
  createShadow,

  // Typography
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,

  // Responsive
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  FONT_SCALE,
  horizontalScale,
  verticalScale,
  moderateScale,
  normalizeFont,
  isTablet,
  addDimensionListener,
  deviceSpecific,
}
