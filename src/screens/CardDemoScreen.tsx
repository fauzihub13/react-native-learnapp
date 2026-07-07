import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Card } from '../components';

const CardDemoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <Card
        title="Card Title"
        subtitle="Subtitle text"
        description="This is a basic card with title, subtitle, and description content."
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Variants</Text>

      <Card
        title="Elevated (default)"
        description="Card dengan shadow elevation."
        variant="elevated"
      />

      <Card
        title="Outlined"
        description="Card dengan border outline."
        variant="outlined"
        style={styles.mt}
      />

      <Card
        title="Filled"
        description="Card dengan background filled."
        variant="filled"
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Clickable</Text>

      <Card
        title="Click Me"
        subtitle="Pressable card"
        description="Card ini bisa di-klik. Tekan untuk melihat aksi."
        onPress={() => Alert.alert('Card Clicked!')}
      />

      <Card
        title="Disabled Card"
        description="Card ini disabled, tidak bisa di-klik."
        disabled
        onPress={() => {}}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Dengan Children</Text>

      <Card title="Custom Content">
        <View style={styles.childrenContent}>
          <Text style={styles.childrenText}>
            Kamu bisa menaruh apapun di dalam Card sebagai children.
          </Text>
          <View style={styles.childrenButtons}>
            <Button
              title="Accept"
              size="sm"
              fullWidth={false}
              onPress={() => Alert.alert('Accepted')}
            />
            <Button
              title="Decline"
              size="sm"
              variant="outline"
              fullWidth={false}
              onPress={() => Alert.alert('Declined')}
              style={styles.ml}
            />
          </View>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, styles.mtSection]}>Dengan Footer</Text>

      <Card
        title="Card with Footer"
        description="Card ini memiliki footer section di bagian bawah."
        footer={
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>2 min ago</Text>
            <Text style={styles.footerLink}>View More</Text>
          </View>
        }
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Dengan Header Right
      </Text>

      <Card
        title="Notifications"
        subtitle="3 new items"
        headerRight={
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        }
        description="Kamu memiliki 3 notifikasi baru yang belum dibaca."
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Style</Text>

      <Card
        title="Custom Colors"
        description="Card dengan warna dan radius custom."
        backgroundColor="#EEF2FF"
        borderRadius={8}
        titleStyle={{ color: '#4338CA' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  mt: {
    marginTop: 12,
  },
  mtSection: {
    marginTop: 32,
  },
  childrenContent: {
    marginTop: 8,
  },
  childrenText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  childrenButtons: {
    flexDirection: 'row',
  },
  ml: {
    marginLeft: 8,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  footerLink: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default CardDemoScreen;
