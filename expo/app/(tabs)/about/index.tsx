import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";
import { Heart, Globe, MapPin, Code } from "lucide-react-native";
import Colors from "@/constants/colors";

const DATA_SOURCES = [
  "Friskus",
  "Viti museene",
  "Tikkio",
  "Parken kulturhus",
  "Folkebiblioteket",
  "Ticketmaster",
  "Bypatrioten",
];

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🏔️</Text>
        <Text style={styles.heroTitle}>Hva skjer i Ålesund?</Text>
        <Text style={styles.heroSubtitle}>
          Alt som skjer i Ålesund-regionen, samlet på ett sted.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Heart size={18} color={Colors.accent} />
          <Text style={styles.sectionTitle}>Om appen</Text>
        </View>
        <Text style={styles.bodyText}>
          Hva skjer i Ålesund? er et hobbyprosjekt som samler kulturarrangementer fra
          Ålesund, Ørskog, Sula og Giske i én enkel oversikt. Vi ønsker å gjøre
          det lettere å finne ut hva som skjer i regionen.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Globe size={18} color={Colors.accent} />
          <Text style={styles.sectionTitle}>Datakilder</Text>
        </View>
        <Text style={styles.bodyText}>
          Arrangementene hentes automatisk fra flere kilder:
        </Text>
        <View style={styles.sourcesList}>
          {DATA_SOURCES.map((source) => (
            <View key={source} style={styles.sourceRow}>
              <View style={styles.sourceDot} />
              <Text style={styles.sourceText}>{source}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MapPin size={18} color={Colors.accent} />
          <Text style={styles.sectionTitle}>Dekningsområde</Text>
        </View>
        <View style={styles.citiesRow}>
          {["Ålesund", "Ørskog", "Sula", "Giske"].map((city) => (
            <View key={city} style={styles.cityChip}>
              <Text style={styles.cityChipText}>{city}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Code size={18} color={Colors.accent} />
          <Text style={styles.sectionTitle}>Åpen kildekode</Text>
        </View>
        <Text style={styles.bodyText}>
          Kildekoden er tilgjengelig på GitHub. Bidrag og tilbakemeldinger er
          velkomne!
        </Text>
        <Pressable
          style={styles.linkButton}
          onPress={() =>
            Linking.openURL("https://github.com/larsohj/iaal")
          }
        >
          <Text style={styles.linkButtonText}>Se på GitHub</Text>
        </Pressable>
      </View>

      <Text style={styles.footerText}>
        Laget med ❤️ for Ålesund-regionen
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  heroCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 28,
    alignItems: "center" as const,
    gap: 10,
  },
  heroEmoji: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: Colors.white,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.accentLight,
    textAlign: "center" as const,
    lineHeight: 20,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  sectionHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  sourcesList: {
    gap: 8,
  },
  sourceRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 10,
  },
  sourceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  sourceText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500" as const,
  },
  citiesRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  cityChip: {
    backgroundColor: Colors.accentMuted,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },
  cityChipText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.accent,
  },
  linkButton: {
    backgroundColor: Colors.accentMuted,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start" as const,
  },
  linkButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.accent,
  },
  footerText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center" as const,
    marginTop: 8,
  },
});
