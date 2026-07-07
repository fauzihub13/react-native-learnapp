import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Dropdown, type DropdownOption } from '../components';

const GENDER_OPTIONS: DropdownOption[] = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' },
];

const CITY_OPTIONS: DropdownOption[] = [
  { label: 'Jakarta', value: 'jakarta' },
  { label: 'Bandung', value: 'bandung' },
  { label: 'Surabaya', value: 'surabaya' },
  { label: 'Yogyakarta', value: 'yogyakarta' },
  { label: 'Semarang', value: 'semarang' },
  { label: 'Medan', value: 'medan' },
  { label: 'Makassar', value: 'makassar' },
  { label: 'Denpasar', value: 'denpasar' },
];

const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: 'Teknologi', value: 'tech' },
  { label: 'Kesehatan', value: 'health' },
  { label: 'Pendidikan', value: 'education' },
  { label: 'Ekonomi', value: 'economy' },
];

const DropdownDemoScreen: React.FC = () => {
  const [gender, setGender] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [filledCity, setFilledCity] = useState<string | null>(null);
  const [underlineCity, setUnderlineCity] = useState<string | null>(null);
  const [errorDropdown, setErrorDropdown] = useState<string | null>(null);
  const [customDropdown, setCustomDropdown] = useState<string | null>(null);
  const [cityError, setCityError] = useState('');

  const handleSubmit = () => {
    if (!city) {
      setCityError('Kota wajib dipilih');
      return;
    }
    setCityError('');
    Alert.alert('Submitted', `Gender: ${gender}\nCity: ${city}\nCategory: ${category}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <Dropdown
        label="Jenis Kelamin"
        value={gender}
        onSelect={setGender}
        options={GENDER_OPTIONS}
        placeholder="Pilih jenis kelamin"
        required
      />

      <Dropdown
        label="Kota"
        value={city}
        onSelect={(val) => {
          setCity(val);
          if (cityError) setCityError('');
        }}
        options={CITY_OPTIONS}
        placeholder="Pilih kota"
        error={cityError}
        required
        containerStyle={styles.mt}
      />

      <Dropdown
        label="Kategori"
        value={category}
        onSelect={setCategory}
        options={CATEGORY_OPTIONS}
        placeholder="Pilih kategori"
        helperText="Pilih kategori yang sesuai"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Variants</Text>

      <Dropdown
        label="Outline (default)"
        value={filledCity}
        onSelect={setFilledCity}
        options={CITY_OPTIONS}
        placeholder="Outline variant"
      />

      <Dropdown
        label="Filled"
        value={filledCity}
        onSelect={setFilledCity}
        options={CITY_OPTIONS}
        placeholder="Filled variant"
        variant="filled"
        containerStyle={styles.mt}
      />

      <Dropdown
        label="Underline"
        value={underlineCity}
        onSelect={setUnderlineCity}
        options={CITY_OPTIONS}
        placeholder="Underline variant"
        variant="underline"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Sizes</Text>

      <Dropdown
        label="Small"
        value={null}
        onSelect={() => {}}
        options={CITY_OPTIONS}
        placeholder="Small size"
        size="sm"
      />

      <Dropdown
        label="Medium (default)"
        value={null}
        onSelect={() => {}}
        options={CITY_OPTIONS}
        placeholder="Medium size"
        containerStyle={styles.mt}
      />

      <Dropdown
        label="Large"
        value={null}
        onSelect={() => {}}
        options={CITY_OPTIONS}
        placeholder="Large size"
        size="lg"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>States</Text>

      <Dropdown
        label="Disabled"
        value="jakarta"
        onSelect={() => {}}
        options={CITY_OPTIONS}
        disabled
      />

      <Dropdown
        label="Dengan Error"
        value={errorDropdown}
        onSelect={setErrorDropdown}
        options={CITY_OPTIONS}
        error="Wajib dipilih"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Style</Text>

      <Dropdown
        label="Custom Colors"
        value={customDropdown}
        onSelect={setCustomDropdown}
        options={CITY_OPTIONS}
        placeholder="Custom border & radius"
        borderColor="#FF9500"
        borderRadius={8}
        containerStyle={styles.mt}
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
    marginTop: 16,
  },
  mtSection: {
    marginTop: 32,
  },
  buttonWrapper: {
    marginTop: 32,
  },
});

export default DropdownDemoScreen;
