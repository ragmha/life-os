import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, Fragment } from "react";
import { ThemeProvider, useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isDarkMode, colors } = useTheme();
  const colorScheme = isDarkMode ? "dark" : "light";

  return (
    <Fragment>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="theme" />
        <Stack.Screen name="theme-settings" options={{ title: "Theme" }} />
      </Stack>
    </Fragment>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
