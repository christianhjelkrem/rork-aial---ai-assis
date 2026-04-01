import React, { useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { Clock, MapPin, ArrowRight, Film, Music, Palette, Mountain, Baby, Laugh, Calendar, Ticket } from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { EventData } from "@/types/event";
import { formatEventTime, formatEventDate } from "@/lib/dateUtils";
import { getParentCategory } from "@/constants/tagHierarchy";

const CATEGORY_CONFIG: Record<string, { color: string; label: string }> = {
  kino: { color: "#8E44AD", label: "Kino" },
  konsert: { color: "#C0392B", label: "Konsert" },
  kultur: { color: "#2980B9", label: "Kultur" },
  sport: { color: "#27AE60", label: "Sport" },
  barn: { color: "#E67E22", label: "Barn" },
  humor: { color: "#D4AC0D", label: "Humor" },
};

function getCategoryForEvent(tags: string[]): { key: string; color: string; label: string } | null {
  for (const tag of tags) {
    const parent = getParentCategory(tag);
    if (parent && CATEGORY_CONFIG[parent.key]) {
      return { key: parent.key, ...CATEGORY_CONFIG[parent.key] };
    }
  }
  return null;
}

function CategoryIcon({ categoryKey, size, color }: { categoryKey: string; size: number; color: string }) {
  switch (categoryKey) {
    case "kino": return <Film size={size} color={color} />;
    case "konsert": return <Music size={size} color={color} />;
    case "kultur": return <Palette size={size} color={color} />;
    case "sport": return <Mountain size={size} color={color} />;
    case "barn": return <Baby size={size} color={color} />;
    case "humor": return <Laugh size={size} color={color} />;
    default: return <Calendar size={size} color={color} />;
  }
}

interface HeroCardProps {
  event: EventData;
}

function HeroCardComponent({ event }: HeroCardProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const onPressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    router.push({ pathname: "/event/[id]", params: { id: event.source_id } });
  }, [router, event.source_id]);

  const category = getCategoryForEvent(event.tags ?? []);
  const dateStr = formatEventDate(event.start_at);
  const timeStr = formatEventTime(event.start_at, event.end_at);

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.card}
        testID={`hero-card-${event.source_id}`}
      >
        <View style={styles.imageContainer}>
          {event.image_url ? (
            <Image
              source={{ uri: event.image_url }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={[styles.placeholder, { backgroundColor: category?.color ?? Colors.primary }]}>
              <CategoryIcon
                categoryKey={category?.key ?? "default"}
                size={64}
                color="rgba(255,255,255,0.2)"
              />
            </View>
          )}

          <View style={styles.gradientOverlay} />

          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: category.color }]}>
              <CategoryIcon categoryKey={category.key} size={12} color="#FFF" />
              <Text style={styles.categoryBadgeText}>{category.label}</Text>
            </View>
          )}

          {event.is_free === true && (
            <View style={styles.freeBadge}>
              <Ticket size={10} color="#FFF" />
              <Text style={styles.freeBadgeText}>Gratis</Text>
            </View>
          )}

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle} numberOfLines={2}>{event.title}</Text>
            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <Clock size={13} color="#FFF" />
                <Text style={styles.heroMetaText}>
                  {dateStr}{timeStr ? ` · ${timeStr}` : ""}
                </Text>
              </View>
              {event.location_name && (
                <View style={styles.heroMetaItem}>
                  <MapPin size={13} color="#FFF" />
                  <Text style={styles.heroMetaText} numberOfLines={1}>
                    {event.location_name}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.heroArrow}>
            <ArrowRight size={18} color="#FFF" />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export const HeroCard = React.memo(HeroCardComponent);

const styles = StyleSheet.create({
  wrapper: {},
  card: {
    borderRadius: 20,
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  imageContainer: {
    width: "100%" as const,
    aspectRatio: 16 / 9,
    position: "relative" as const,
  },
  image: {
    width: "100%" as const,
    height: "100%" as const,
  },
  placeholder: {
    width: "100%" as const,
    height: "100%" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  gradientOverlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%" as const,
    backgroundColor: "transparent",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...({
      backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
    } as Record<string, string>),
  },
  categoryBadge: {
    position: "absolute" as const,
    top: 14,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 5,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "800" as const,
    color: "#FFF",
    letterSpacing: 0.3,
  },
  freeBadge: {
    position: "absolute" as const,
    top: 14,
    right: 14,
    backgroundColor: Colors.free,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
  },
  freeBadgeText: {
    fontSize: 11,
    fontWeight: "800" as const,
    color: "#FFF",
  },
  heroContent: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 18,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800" as const,
    color: "#FFF",
    lineHeight: 26,
    letterSpacing: -0.3,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroMeta: {
    marginTop: 6,
    gap: 4,
  },
  heroMetaItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 5,
  },
  heroMetaText: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: "rgba(255,255,255,0.9)",
    flex: 1,
  },
  heroArrow: {
    position: "absolute" as const,
    bottom: 18,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
});
