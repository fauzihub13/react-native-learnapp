import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Checkbox, CheckboxGroup } from '../components';

const HOBBY_OPTIONS = [
  { label: 'Membaca', value: 'reading', description: 'Buku, novel, artikel' },
  { label: 'Olahraga', value: 'sports', description: 'Sepakbola, basket, lari' },
  { label: 'Musik', value: 'music', description: 'Gitar, piano, vokal' },
  { label: 'Coding', value: 'coding', description: 'Web, mobile, backend' },
  { label: 'Fotografi', value: 'photo', description: 'Landscape, portrait' },
];

const TERMS_OPTIONS = [
  { label: 'Saya setuju dengan Syarat & Ketentuan', value: 'terms' },
  { label: 'Saya setuju dengan Kebijakan Privasi', value: 'privacy' },
];

const CheckboxDemoScreen: React.FC = () => {
  const [basicChecked, setBasicChecked] = useState(false);
  const [withDesc, setWithDesc] = useState(false);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [terms, setTerms] = useState<string[]>([]);
  const [termsError, setTermsError] = useState('');

  const handleSubmit = () => {
    if (!terms.includes('terms') || !terms.includes('privacy')) {
      setTermsError('Semua persetujuan wajib dicentang');
      return;
    }
    setTermsError('');
    Alert.alert('Submitted', `Hobbies: ${hobbies.join(', ')}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <Checkbox
        checked={basicChecked}
        onChange={setBasicChecked}
        label="Simple Checkbox"
      />

      <Checkbox
        checked={withDesc}
        onChange={setWithDesc}
        label="With Description"
        description="Ini adalah deskripsi dari checkbox"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Sizes</Text>

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Small"
        size="sm"
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Medium (default)"
        size="md"
        containerStyle={styles.mt}
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Large"
        size="lg"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Colors</Text>

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Blue (default)"
        color="#007AFF"
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Green"
        color="#34C759"
        containerStyle={styles.mt}
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Red"
        color="#FF3B30"
        containerStyle={styles.mt}
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Purple"
        color="#AF52DE"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>States</Text>

      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Unchecked"
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Checked"
        containerStyle={styles.mt}
      />

      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Disabled unchecked"
        disabled
        containerStyle={styles.mt}
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Disabled checked"
        disabled
        containerStyle={styles.mt}
      />

      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Error state"
        error
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Label Position
      </Text>

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Label on right (default)"
      />

      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Label on left"
        labelPosition="left"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Checkbox Group
      </Text>

      <CheckboxGroup
        label="Hobi"
        options={HOBBY_OPTIONS}
        selected={hobbies}
        onChange={setHobbies}
        color="#34C759"
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Dengan Error</Text>

      <CheckboxGroup
        label="Persetujuan"
        options={TERMS_OPTIONS}
        selected={terms}
        onChange={(val) => {
          setTerms(val);
          if (termsError) setTermsError('');
        }}
        error={termsError}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
  buttonWrapper: {
    marginTop: 32,
  },
});

export default CheckboxDemoScreen;
