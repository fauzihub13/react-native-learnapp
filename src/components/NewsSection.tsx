import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

interface NewsItem {
  id: string;
  title: string;
  image: string;
  onPress?: () => void;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Manfaatkan Energi Bersih, Merck Pasang Panel Surya di Pabrik',
    image: 'https://picsum.photos/400/250?random=1',
  },
  {
    id: '2',
    title: 'Manfaat Panel Surya untuk Rumah Tangga',
    image: 'https://picsum.photos/400/250?random=2',
  },
  {
    id: '3',
    title: 'Tips Memilih Panel Surya yang Tepat',
    image: 'https://picsum.photos/400/250?random=3',
  },
];

interface NewsSectionProps {
  onSeeAll?: () => void;
  onItemPress?: (id: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onSeeAll, onItemPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Berita Terkini</Text>
        <Pressable onPress={onSeeAll}>
          <Text style={styles.seeAll}>Selengkapnya</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {NEWS_DATA.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.9 : 1 },
            ]}
            onPress={() => onItemPress?.(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  seeAll: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray100,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // backgroundBlurRadius: 10,
  },
  cardTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
    lineHeight: 22,
  },
});

export default NewsSection;
