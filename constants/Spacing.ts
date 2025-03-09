/**
 * Spacing tokens for the application.
 * This file contains all spacing definitions for consistent layout.
 * Always reference these tokens instead of hardcoding spacing values.
 */

/**
 * Base spacing unit in points (density-independent pixels)
 * All spacing values are derived from this base unit for consistency
 */
const BASE_UNIT = 4;

export const Spacing = {
  // Core spacing values
  xxs: BASE_UNIT, // 4
  xs: BASE_UNIT * 2, // 8
  sm: BASE_UNIT * 3, // 12
  md: BASE_UNIT * 4, // 16
  lg: BASE_UNIT * 6, // 24
  xl: BASE_UNIT * 8, // 32
  xxl: BASE_UNIT * 12, // 48

  // Semantic spacing
  gutter: BASE_UNIT * 4, // 16 - Standard padding for screen edges
  itemSpacing: BASE_UNIT * 3, // 12 - Space between related items
  sectionSpacing: BASE_UNIT * 6, // 24 - Space between sections
  stackSpacing: BASE_UNIT * 2, // 8 - Space between stacked elements
  inlineSpacing: BASE_UNIT * 2, // 8 - Space between inline elements

  // Component-specific spacing
  cardPadding: BASE_UNIT * 4, // 16
  buttonPadding: {
    vertical: BASE_UNIT * 2, // 8
    horizontal: BASE_UNIT * 4, // 16
  },
  inputPadding: {
    vertical: BASE_UNIT * 3, // 12
    horizontal: BASE_UNIT * 3, // 12
  },
  iconMargin: BASE_UNIT * 2, // 8

  // Layout
  borderRadius: {
    sm: BASE_UNIT, // 4
    md: BASE_UNIT * 2, // 8
    lg: BASE_UNIT * 3, // 12
    xl: BASE_UNIT * 4, // 16
    pill: 9999, // Pill shape
  },
};

// Helper function to create consistent shadows
export const createShadow = (elevation: number) => ({
  shadowOffset: { width: 0, height: elevation },
  shadowOpacity: 0.1,
  shadowRadius: elevation * 0.5,
  elevation: elevation,
});

// Common shadows
export const Shadows = {
  small: createShadow(2),
  medium: createShadow(4),
  large: createShadow(8),
};
