import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';

interface VendorItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  onPress?: () => void;
}

const VENDOR_DATA: VendorItem[] = [
  {
    id: '1',
    name: 'Amartha Power Connect',
    location: 'Bandung, Jawa Barat',
    rating: 4.9,
    image: 'https://picsum.photos/200/200?random=4',
  },
  {
    id: '2',
    name: 'Amartha Power Connect',
    location: 'Bandung, Jawa Barat',
    rating: 4.9,
    image: 'https://picsum.photos/200/200?random=5',
  },
];

interface VendorSectionProps {
  onSeeAll?: () => void;
  onItemPress?: (id: string) => void;
}

const VendorSection: React.FC<VendorSectionProps> = ({ onSeeAll, onItemPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vendor Panel Surya</Text>
        <Pressable onPress={onSeeAll}>
          <Text style={styles.seeAll}>Selengkapnya</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {VENDOR_DATA.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.9 : 1 },
            ]}
            onPress={() => onItemPress?.(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardName}>{item.name}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingIcon}>⭐</Text>
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    paddingBottom: Spacing.xl,
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
  list: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.gray100,
  },
  cardContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
});

export default VendorSection;
