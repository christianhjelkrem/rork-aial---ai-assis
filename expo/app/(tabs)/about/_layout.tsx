import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AboutLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: "700" as const, color: colors.primary },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Om appen" }} />
    </Stack>
  );
}
