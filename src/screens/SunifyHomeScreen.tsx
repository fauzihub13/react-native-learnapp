import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import WeatherCard from '../components/WeatherCard';
import QuickMenu from '../components/QuickMenu';
import NewsSection from '../components/NewsSection';
import VendorSection from '../components/VendorSection';
import HomeBottomTab from '../components/HomeBottomTab';
import { Colors, Typography, Spacing } from '../styles';
import type { RootStackParamList } from '../navigation/types';

const SunifyHomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
              style={styles.avatar}
            />
            <View style={styles.userText}>
              <Text style={styles.greeting}>Tonald Drump</Text>
              <Text style={styles.subGreeting}>Selamat datang kembali!</Text>
            </View>
          </View>
          <Pressable style={styles.bellButton}>
            <Text style={styles.bellIcon}>🔔</Text>
          </Pressable>
        </View>

        <WeatherCard />

        <QuickMenu onItemPress={(id) => console.log('Menu:', id)} />

        <NewsSection
          onSeeAll={() => console.log('See all news')}
          onItemPress={(id) => console.log('News:', id)}
        />

        <VendorSection
          onSeeAll={() => console.log('See all vendors')}
          onItemPress={(id) => console.log('Vendor:', id)}
        />
      </ScrollView>

      <HomeBottomTab onTabPress={(id) => console.log('Tab:', id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.gray100,
  },
  userText: {
    marginLeft: Spacing.md,
  },
  greeting: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  subGreeting: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bellIcon: {
    fontSize: 22,
  },
});

export default SunifyHomeScreen;
