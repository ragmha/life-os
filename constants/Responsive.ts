/**
 * Responsive design utilities for React Native
 * This file contains utilities for creating responsive layouts in React Native
 */

import { Dimensions, Platform, PixelRatio, ScaledSize } from "react-native";

// Get the screen dimensions
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// Base width and height used for scaling (based on standard iPhone 11)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scale a value based on the screen width
 * @param size - Size to scale
 * @returns Scaled size
 */
export const horizontalScale = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Scale a value based on the screen height
 * @param size - Size to scale
 * @returns Scaled size
 */
export const verticalScale = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Scale a value based on the screen width with a factor
 * This is useful for text sizes to avoid scaling too much
 * @param size - Size to scale
 * @param factor - Factor to reduce scaling (default: 0.5)
 * @returns Scaled size
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (horizontalScale(size) - size) * factor;
};

/**
 * Get font scale factor from device settings
 * Useful for respecting user's accessibility settings
 */
export const FONT_SCALE = PixelRatio.getFontScale();

/**
 * Normalize a font size based on the device's pixel ratio and font scale
 * @param size - Font size to normalize
 * @returns Normalized font size
 */
export const normalizeFont = (size: number): number => {
  const newSize = size * (SCREEN_WIDTH / BASE_WIDTH);
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

/**
 * Check if the device is a tablet
 * @returns Whether the device is a tablet
 */
export const isTablet = (): boolean => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  return (adjustedWidth >= 1000 || adjustedHeight >= 1000) && pixelDensity < 2;
};

/**
 * Listen for dimension changes (e.g., orientation changes)
 * @param callback - Function to call when dimensions change
 * @returns Function to remove the listener
 */
export const addDimensionListener = (
  callback: (dimensions: { window: ScaledSize; screen: ScaledSize }) => void
): (() => void) => {
  const subscription = Dimensions.addEventListener("change", callback);
  return () => subscription.remove();
};

/**
 * Returns a value based on the device type (phone or tablet)
 * @param options - Object containing values for different device types
 * @returns The value for the current device type
 */
export const deviceSpecific = <T>(options: { phone: T; tablet: T }): T => {
  return isTablet() ? options.tablet : options.phone;
};
