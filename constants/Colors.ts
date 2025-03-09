/**
 * Design tokens for the application.
 * This file contains all color definitions used throughout the app.
 * Always reference these tokens instead of hardcoding color values.
 */

// Base palette
const palette = {
  // Primary colors
  primary: "#4A6FFF",
  primaryLight: "#0a7ea4",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",

  // Grays
  gray50: "#F5F5F5",
  gray100: "#EEEEEE",
  gray200: "#DDDDDD",
  gray300: "#BBBBBB",
  gray400: "#8E8E93",
  gray500: "#6B6B6B",
  gray600: "#666666",
  gray700: "#333333",
  gray800: "#1E1E1E",
  gray900: "#121212",

  // Text colors
  textDark: "#11181C",
  textLight: "#ECEDEE",

  // Icon colors
  iconDark: "#687076",
  iconLight: "#9BA1A6",

  // Accent colors
  yellow: "#FFB900",
  blue: "#0a7ea4",

  // Background colors
  backgroundLight: "#FFFFFF",
  backgroundDark: "#151718",
};

export const Colors = {
  light: {
    // Text
    text: palette.textDark,
    textSecondary: palette.gray400,
    link: palette.blue,

    // Backgrounds
    background: palette.backgroundLight,
    card: palette.white,

    // UI Elements
    tint: palette.primaryLight,
    primary: palette.primary,
    icon: palette.iconDark,
    tabIconDefault: palette.iconDark,
    tabIconSelected: palette.primaryLight,
    separator: palette.gray100,

    // Status
    success: palette.primary,
    warning: palette.yellow,
    neutral: palette.gray500,

    // Borders
    border: palette.gray200,

    // Shadows
    shadow: palette.black,
  },
  dark: {
    // Text
    text: palette.textLight,
    textSecondary: palette.gray400,
    link: palette.primaryLight,

    // Backgrounds
    background: palette.backgroundDark,
    card: palette.gray800,

    // UI Elements
    tint: palette.white,
    primary: palette.primary,
    icon: palette.iconLight,
    tabIconDefault: palette.iconLight,
    tabIconSelected: palette.white,
    separator: palette.gray700,

    // Status
    success: palette.primary,
    warning: palette.yellow,
    neutral: palette.gray500,

    // Borders
    border: palette.gray700,

    // Shadows
    shadow: palette.black,
  },
};
