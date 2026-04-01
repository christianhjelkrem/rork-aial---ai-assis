import { useMemo } from "react";
import { useColorScheme } from "react-native";
import createContextHook from "@nkzw/create-context-hook";
import { lightColors, darkColors, ThemeColors } from "@/constants/colors";

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const colors = useMemo<ThemeColors>(
    () => (isDark ? darkColors : lightColors),
    [isDark]
  );

  return useMemo(() => ({ colors, isDark }), [colors, isDark]);
});
