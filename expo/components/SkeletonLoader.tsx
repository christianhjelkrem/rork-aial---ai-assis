import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import Colors from "@/constants/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

function ShimmerBlock({ width, height, borderRadius = 8, style }: {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.15],
  });

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius,
          backgroundColor: Colors.textMuted,
          opacity,
        },
        style,
      ]}
    />
  );
}

function SkeletonCardComponent() {
  return (
    <View style={styles.card}>
      <ShimmerBlock width="100%" height={SCREEN_WIDTH * 0.52} borderRadius={0} />
      <View style={styles.cardContent}>
        <ShimmerBlock width="85%" height={18} borderRadius={6} />
        <View style={{ height: 8 }} />
        <ShimmerBlock width="60%" height={14} borderRadius={6} />
        <View style={{ height: 6 }} />
        <ShimmerBlock width="45%" height={14} borderRadius={6} />
      </View>
    </View>
  );
}

const SkeletonCard = React.memo(SkeletonCardComponent);

function SkeletonCarouselComponent() {
  const cardWidth = SCREEN_WIDTH * 0.72;
  return (
    <View style={styles.carouselSection}>
      <View style={styles.carouselHeader}>
        <View style={styles.carouselTitleRow}>
          <ShimmerBlock width={8} height={8} borderRadius={4} />
          <ShimmerBlock width={80} height={17} borderRadius={6} />
        </View>
      </View>
      <View style={styles.carouselRow}>
        {[0, 1].map((i) => (
          <View key={i} style={[styles.carouselCard, { width: cardWidth }]}>
            <ShimmerBlock width={cardWidth} height={cardWidth * 0.625} borderRadius={0} />
            <View style={styles.carouselCardContent}>
              <ShimmerBlock width="80%" height={14} borderRadius={5} />
              <View style={{ height: 6 }} />
              <ShimmerBlock width="55%" height={11} borderRadius={5} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const SkeletonCarousel = React.memo(SkeletonCarouselComponent);

function SkeletonSectionHeaderComponent() {
  return (
    <View style={styles.sectionHeader}>
      <ShimmerBlock width={4} height={36} borderRadius={2} />
      <View style={{ gap: 6, flex: 1, marginLeft: 12 }}>
        <ShimmerBlock width="40%" height={18} borderRadius={6} />
        <ShimmerBlock width="25%" height={12} borderRadius={5} />
      </View>
    </View>
  );
}

const SkeletonSectionHeader = React.memo(SkeletonSectionHeaderComponent);

function SkeletonFilterRowComponent() {
  return (
    <View style={styles.filterRow}>
      {[70, 60, 55].map((w, i) => (
        <ShimmerBlock key={i} width={w} height={36} borderRadius={20} />
      ))}
      <View style={{ flex: 1 }} />
      <ShimmerBlock width={40} height={40} borderRadius={14} />
    </View>
  );
}

const SkeletonFilterRow = React.memo(SkeletonFilterRowComponent);

function SkeletonFeedComponent() {
  return (
    <View style={styles.feedContainer}>
      <View style={styles.searchSkeleton}>
        <ShimmerBlock width="100%" height={44} borderRadius={14} />
      </View>

      <View style={styles.categoryRow}>
        {[55, 65, 75, 60, 50].map((w, i) => (
          <ShimmerBlock key={i} width={w} height={38} borderRadius={24} />
        ))}
      </View>

      <SkeletonFilterRow />

      <SkeletonCarousel />
      <SkeletonCarousel />

      <View style={styles.resultRowSkeleton}>
        <ShimmerBlock width={3} height={16} borderRadius={2} />
        <ShimmerBlock width={130} height={15} borderRadius={6} />
      </View>

      <SkeletonSectionHeader />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
}

export const SkeletonFeed = React.memo(SkeletonFeedComponent);

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
  },
  searchSkeleton: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  categoryRow: {
    flexDirection: "row" as const,
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 6,
  },
  filterRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  carouselSection: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  carouselHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  carouselTitleRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  carouselRow: {
    flexDirection: "row" as const,
    paddingHorizontal: 16,
    gap: 12,
  },
  carouselCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden" as const,
  },
  carouselCardContent: {
    padding: 10,
  },
  resultRowSkeleton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    marginTop: 4,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.card,
    borderRadius: 18,
    overflow: "hidden" as const,
  },
  cardContent: {
    padding: 14,
  },
});
