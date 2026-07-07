import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Switch, SwitchGroup } from '../components';
import { Colors, Typography, Spacing } from '../styles';

const NOTIFICATION_OPTIONS = [
  { label: 'Push Notifications', value: 'push', description: 'Terima notifikasi push' },
  { label: 'Email Notifications', value: 'email', description: 'Terima notifikasi via email' },
  { label: 'SMS Notifications', value: 'sms', description: 'Terima notifikasi via SMS' },
];

const PRIVACY_OPTIONS = [
  { label: 'Profile Public', value: 'public', description: 'Profile terlihat oleh semua orang' },
  { label: 'Show Online Status', value: 'online', description: 'Tampilkan status online' },
  { label: 'Allow Messages', value: 'messages', description: 'Izinkan pesan dari orang lain' },
];

const SwitchDemoScreen: React.FC = () => {
  const [basic, setBasic] = useState(false);
  const [withDesc, setWithDesc] = useState(true);
  const [notifications, setNotifications] = useState<string[]>(['push']);
  const [privacy, setPrivacy] = useState<string[]>(['public', 'online']);

  const handleSubmit = () => {
    Alert.alert('Settings', `Notifications: ${notifications.join(', ')}\nPrivacy: ${privacy.join(', ')}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <Switch
        value={basic}
        onValueChange={setBasic}
        label="Basic Switch"
      />

      <Switch
        value={withDesc}
        onValueChange={setWithDesc}
        label="With Description"
        description="Ini adalah deskripsi dari switch"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Sizes</Text>

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Small"
        size="sm"
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Medium (default)"
        size="md"
        containerStyle={styles.mt}
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Large"
        size="lg"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Colors</Text>

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Blue (default)"
        activeColor={Colors.primary}
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Green"
        activeColor={Colors.success}
        containerStyle={styles.mt}
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Red"
        activeColor={Colors.danger}
        containerStyle={styles.mt}
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Purple"
        activeColor={Colors.info}
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>States</Text>

      <Switch
        value={false}
        onValueChange={() => {}}
        label="Off"
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="On"
        containerStyle={styles.mt}
      />

      <Switch
        value={false}
        onValueChange={() => {}}
        label="Disabled off"
        disabled
        containerStyle={styles.mt}
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Disabled on"
        disabled
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Label Position
      </Text>

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Label on right (default)"
      />

      <Switch
        value={true}
        onValueChange={() => {}}
        label="Label on left"
        labelPosition="left"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Switch Group
      </Text>

      <SwitchGroup
        label="Notifikasi"
        options={NOTIFICATION_OPTIONS}
        selected={notifications}
        onChange={setNotifications}
        activeColor={Colors.success}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Settings</Text>

      <SwitchGroup
        label="Privasi"
        options={PRIVACY_OPTIONS}
        selected={privacy}
        onChange={setPrivacy}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Save Settings" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  sectionTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  mt: {
    marginTop: Spacing.base,
  },
  mtSection: {
    marginTop: Spacing['2xl'],
  },
  buttonWrapper: {
    marginTop: Spacing['2xl'],
  },
});

export default SwitchDemoScreen;
