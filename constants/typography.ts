/**
 * Typography tokens for the application.
 * This file contains all text style definitions for consistent typography.
 * Always reference these tokens instead of hardcoding font sizes, weights, etc.
 */

export const FontFamily = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  // Add custom fonts here if you're using them
}

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
}

// Using valid React Native font weight values
export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
}

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
}

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
}

// Predefined text styles
export const TextStyle = {
  // Headings
  h1: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.tight,
  },
  h2: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.tight,
  },
  h3: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.tight,
  },
  h4: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: LineHeight.tight,
  },
  h5: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    lineHeight: LineHeight.tight,
  },

  // Body text
  bodyLarge: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.normal,
  },
  bodyMedium: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.normal,
  },
  bodySmall: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.normal,
  },

  // UI elements
  button: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    lineHeight: LineHeight.tight,
  },
  caption: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.normal,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    lineHeight: LineHeight.tight,
  },
}
