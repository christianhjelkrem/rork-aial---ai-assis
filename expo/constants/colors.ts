export interface ThemeColors {
  primary: string;
  primaryLight: string;
  accent: string;
  accentLight: string;
  accentMuted: string;
  sand: string;
  sandLight: string;
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  white: string;
  free: string;
  freeLight: string;
  error: string;
  shadow: string;
  overlay: string;
  tabBar: string;
  tabBarBorder: string;
  searchBar: string;
  chipBg: string;
  sheetBg: string;
  modalBg: string;
  tagColors: { bg: string; text: string }[];
  categoryColors: Record<string, { bg: string; text: string; activeBg: string }>;
}

const lightColors: ThemeColors = {
  primary: "#1B3A4B",
  primaryLight: "#2A5066",
  accent: "#4ECDC4",
  accentLight: "#7EDDD7",
  accentMuted: "rgba(78, 205, 196, 0.12)",
  sand: "#F5E6D3",
  sandLight: "#FBF5EE",
  background: "#F0EDE8",
  card: "#FFFFFF",
  cardBorder: "rgba(27, 58, 75, 0.06)",
  text: "#1B3A4B",
  textSecondary: "#5A7D8A",
  textMuted: "#8FA8B3",
  white: "#FFFFFF",
  free: "#2ECC71",
  freeLight: "rgba(46, 204, 113, 0.12)",
  error: "#E74C3C",
  shadow: "rgba(27, 58, 75, 0.08)",
  overlay: "rgba(27, 58, 75, 0.5)",
  tabBar: "#FFFFFF",
  tabBarBorder: "rgba(27, 58, 75, 0.06)",
  searchBar: "#FFFFFF",
  chipBg: "#FFFFFF",
  sheetBg: "#FFFFFF",
  modalBg: "#FFFFFF",
  tagColors: [
    { bg: "rgba(78, 205, 196, 0.12)", text: "#2A9D8F" },
    { bg: "rgba(244, 162, 97, 0.12)", text: "#D4763C" },
    { bg: "rgba(42, 157, 143, 0.12)", text: "#1B7A6E" },
    { bg: "rgba(231, 111, 81, 0.12)", text: "#C84B31" },
    { bg: "rgba(38, 70, 83, 0.12)", text: "#264653" },
    { bg: "rgba(233, 196, 106, 0.12)", text: "#B8941A" },
  ],
  categoryColors: {
    kino: { bg: "rgba(142, 68, 173, 0.12)", text: "#8E44AD", activeBg: "#8E44AD" },
    konsert: { bg: "rgba(231, 76, 60, 0.12)", text: "#C0392B", activeBg: "#C0392B" },
    kultur: { bg: "rgba(41, 128, 185, 0.12)", text: "#2980B9", activeBg: "#2980B9" },
    sport: { bg: "rgba(39, 174, 96, 0.12)", text: "#27AE60", activeBg: "#27AE60" },
    natur: { bg: "rgba(22, 160, 133, 0.12)", text: "#16A085", activeBg: "#16A085" },
    annet: { bg: "rgba(149, 165, 166, 0.12)", text: "#7F8C8D", activeBg: "#7F8C8D" },
  },
};

const darkColors: ThemeColors = {
  primary: "#E8EDF0",
  primaryLight: "#9BB8C7",
  accent: "#4ECDC4",
  accentLight: "#3AA89F",
  accentMuted: "rgba(78, 205, 196, 0.18)",
  sand: "#2A2520",
  sandLight: "#1E1A17",
  background: "#0F1419",
  card: "#1A2330",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  text: "#E8EDF0",
  textSecondary: "#8CA3B0",
  textMuted: "#5A7080",
  white: "#FFFFFF",
  free: "#2ECC71",
  freeLight: "rgba(46, 204, 113, 0.18)",
  error: "#E74C3C",
  shadow: "rgba(0, 0, 0, 0.3)",
  overlay: "rgba(0, 0, 0, 0.7)",
  tabBar: "#141D26",
  tabBarBorder: "rgba(255, 255, 255, 0.06)",
  searchBar: "#1A2330",
  chipBg: "#1A2330",
  sheetBg: "#1A2330",
  modalBg: "#1A2330",
  tagColors: [
    { bg: "rgba(78, 205, 196, 0.18)", text: "#5EE0D6" },
    { bg: "rgba(244, 162, 97, 0.18)", text: "#F4A261" },
    { bg: "rgba(42, 157, 143, 0.18)", text: "#3CC0AE" },
    { bg: "rgba(231, 111, 81, 0.18)", text: "#E76F51" },
    { bg: "rgba(120, 160, 180, 0.18)", text: "#8CB8CC" },
    { bg: "rgba(233, 196, 106, 0.18)", text: "#E9C46A" },
  ],
  categoryColors: {
    kino: { bg: "rgba(142, 68, 173, 0.22)", text: "#BB7FD4", activeBg: "#8E44AD" },
    konsert: { bg: "rgba(231, 76, 60, 0.22)", text: "#E8786A", activeBg: "#C0392B" },
    kultur: { bg: "rgba(41, 128, 185, 0.22)", text: "#5DADE2", activeBg: "#2980B9" },
    sport: { bg: "rgba(39, 174, 96, 0.22)", text: "#58D68D", activeBg: "#27AE60" },
    natur: { bg: "rgba(22, 160, 133, 0.22)", text: "#48C9B0", activeBg: "#16A085" },
    annet: { bg: "rgba(149, 165, 166, 0.22)", text: "#AAB7B8", activeBg: "#7F8C8D" },
  },
};

export { lightColors, darkColors };

export default lightColors;
