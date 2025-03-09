# Life os

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
    bun start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Design Tokens

This project uses a design token system to maintain consistent styling across the application. All design tokens are centralized in the `constants/` directory and exported from `constants/DesignTokens.ts`.

### Using Design Tokens

Instead of hardcoding values, always use the appropriate design tokens:

```tsx
import {
  Colors,
  Spacing,
  FontSize,
  FontWeight,
  moderateScale,
  deviceSpecific,
} from "@/constants/DesignTokens";
import { useTheme } from "@/hooks/useTheme";

function MyComponent() {
  const { isDarkMode } = useTheme();
  const colorScheme = isDarkMode ? "dark" : "light";
  const colors = Colors[colorScheme];

  // Basic usage
  return (
    <View
      style={{
        backgroundColor: colors.background,
        padding: Spacing.md, // 16
        borderRadius: Spacing.borderRadius.md, // 8
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: FontSize.md, // 16
          fontWeight: FontWeight.medium,
          marginBottom: Spacing.sm, // 12
        }}
      >
        Hello World
      </Text>
    </View>
  );

  // Responsive usage
  return (
    <View
      style={{
        padding: deviceSpecific({
          phone: Spacing.md, // 16 on phones
          tablet: Spacing.lg, // 24 on tablets
        }),
        fontSize: moderateScale(FontSize.md), // Scales based on screen size
      }}
    >
      {/* Component content */}
    </View>
  );
}
```

### Available Design Tokens

#### Colors

The color system is organized into semantic categories:

- **Text**: `text`, `textSecondary`
- **Backgrounds**: `background`, `card`
- **UI Elements**: `tint`, `primary`, `icon`, `tabIconDefault`, `tabIconSelected`, `separator`
- **Status**: `success`, `warning`, `neutral`
- **Borders**: `border`
- **Shadows**: `shadow`

#### Spacing

Spacing tokens provide consistent spacing throughout the app:

- **Core values**: `xxs` (4), `xs` (8), `sm` (12), `md` (16), `lg` (24), `xl` (32), `xxl` (48)
- **Semantic spacing**: `gutter`, `itemSpacing`, `sectionSpacing`, `stackSpacing`, `inlineSpacing`
- **Component-specific**: `cardPadding`, `buttonPadding`, `inputPadding`, `iconMargin`
- **Border radius**: `borderRadius.sm`, `borderRadius.md`, `borderRadius.lg`, `borderRadius.xl`, `borderRadius.pill`

#### Typography

Typography tokens ensure consistent text styling:

- **Font sizes**: `FontSize.xs` (12) through `FontSize.display` (36)
- **Font weights**: `FontWeight.regular`, `FontWeight.medium`, `FontWeight.semibold`, `FontWeight.bold`
- **Line heights**: `LineHeight.tight`, `LineHeight.normal`, `LineHeight.relaxed`
- **Predefined text styles**: `TextStyle.h1` through `TextStyle.h5`, `TextStyle.bodyLarge`, `TextStyle.bodyMedium`, etc.

#### Shadows

Shadow tokens provide consistent elevation:

- `Shadows.small`, `Shadows.medium`, `Shadows.large`
- `createShadow(elevation)` helper function for custom shadows

#### Responsive Utilities

React Native-specific responsive utilities:

- **Screen dimensions**: `SCREEN_WIDTH`, `SCREEN_HEIGHT`
- **Scaling helpers**:
  - `horizontalScale(size)` - Scale based on screen width
  - `verticalScale(size)` - Scale based on screen height
  - `moderateScale(size, factor)` - Scale with a moderation factor
  - `normalizeFont(size)` - Normalize font size across devices
- **Device detection**:
  - `isTablet()` - Check if the device is a tablet
  - `deviceSpecific({ phone, tablet })` - Return different values based on device type
- **Accessibility**:
  - `FONT_SCALE` - Get the user's font scale setting
- **Orientation changes**:
  - `addDimensionListener(callback)` - Listen for dimension changes
