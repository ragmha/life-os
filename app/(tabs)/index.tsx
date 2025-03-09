import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/ThemedText";

/**
 * Home screen component that displays the main landing page of the app.
 */
export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText type="title">Home</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
