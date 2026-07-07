import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from '../components';

const ButtonDemoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Variants</Text>

      <Button title="Primary" onPress={() => Alert.alert('Primary')} />
      <Button
        title="Secondary"
        variant="secondary"
        onPress={() => Alert.alert('Secondary')}
        style={styles.mt}
      />
      <Button
        title="Outline"
        variant="outline"
        onPress={() => Alert.alert('Outline')}
        style={styles.mt}
      />
      <Button
        title="Ghost"
        variant="ghost"
        onPress={() => Alert.alert('Ghost')}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Sizes</Text>

      <Button
        title="Small"
        size="sm"
        fullWidth={false}
        onPress={() => Alert.alert('Small')}
      />
      <Button
        title="Medium"
        size="md"
        fullWidth={false}
        onPress={() => Alert.alert('Medium')}
        style={styles.mt}
      />
      <Button
        title="Large"
        size="lg"
        fullWidth={false}
        onPress={() => Alert.alert('Large')}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Custom Colors
      </Text>

      <Button
        title="Red Button"
        backgroundColor="#FF3B30"
        onPress={() => Alert.alert('Red')}
      />
      <Button
        title="Green Button"
        backgroundColor="#34C759"
        onPress={() => Alert.alert('Green')}
        style={styles.mt}
      />
      <Button
        title="Custom Border"
        variant="outline"
        borderColor="#FF9500"
        textColor="#FF9500"
        borderWidth={2}
        onPress={() => Alert.alert('Custom Border')}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>States</Text>

      <Button
        title="Loading..."
        loading
        onPress={() => {}}
      />
      <Button
        title="Disabled"
        disabled
        onPress={() => {}}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Style</Text>

      <Button
        title="Rounded Full"
        borderRadius={50}
        onPress={() => Alert.alert('Rounded')}
      />
      <Button
        title="Small Radius"
        backgroundColor="#5856D6"
        borderRadius={4}
        onPress={() => Alert.alert('Small Radius')}
        style={styles.mt}
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
});

export default ButtonDemoScreen;
