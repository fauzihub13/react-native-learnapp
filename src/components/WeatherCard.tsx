import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const WeatherCard: React.FC = () => {
  return (
    <LinearGradient
      colors={['#2563EB', '#1E40AF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.temperature}>25°</Text>
          <Text style={styles.condition}>Cerah berawan</Text>
          <Text style={styles.location}>Bogor, Jawa Barat</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.weatherIcon}>⛅</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  left: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  condition: {
    fontSize: Typography.fontSize.md,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Spacing.xs,
  },
  location: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  right: {
    marginLeft: Spacing.base,
  },
  weatherIcon: {
    fontSize: 70,
  },
});

export default WeatherCard;
