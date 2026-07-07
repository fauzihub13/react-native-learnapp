import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from '../components';

const TextInputDemoScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [bio, setBio] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setEmailError('Email tidak valid');
      return;
    }
    setEmailError('');
    Alert.alert('Submitted', `Name: ${name}\nEmail: ${email}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <TextInput
        label="Nama Lengkap"
        value={name}
        onChangeText={setName}
        placeholder="Masukkan nama"
        required
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          if (emailError) setEmailError('');
        }}
        placeholder="email@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
        required
        containerStyle={styles.mt}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan password"
        isPassword
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Variants</Text>

      <TextInput
        label="Outline (default)"
        value={name}
        onChangeText={setName}
        placeholder="Outline variant"
      />

      <TextInput
        label="Filled"
        value={search}
        onChangeText={setSearch}
        placeholder="Filled variant"
        variant="filled"
        containerStyle={styles.mt}
      />

      <TextInput
        label="Underline"
        value={phone}
        onChangeText={setPhone}
        placeholder="Underline variant"
        variant="underline"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Sizes</Text>

      <TextInput
        label="Small"
        value={search}
        onChangeText={setSearch}
        placeholder="Small input"
        size="sm"
      />

      <TextInput
        label="Medium (default)"
        value={search}
        onChangeText={setSearch}
        placeholder="Medium input"
        size="md"
        containerStyle={styles.mt}
      />

      <TextInput
        label="Large"
        value={search}
        onChangeText={setSearch}
        placeholder="Large input"
        size="lg"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Style</Text>

      <TextInput
        label="Custom Colors"
        value={name}
        onChangeText={setName}
        placeholder="Custom border & focus color"
        borderColor="#FF9500"
        focusColor="#FF9500"
        borderRadius={8}
      />

      <TextInput
        label="Multiline (Bio)"
        value={bio}
        onChangeText={setBio}
        placeholder="Ceritakan tentang dirimu..."
        multiline
        numberOfLines={4}
        helperText="Maksimal 200 karakter"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>States</Text>

      <TextInput
        label="Disabled"
        value="Tidak bisa diubah"
        onChangeText={() => {}}
        disabled
      />

      <TextInput
        label="Dengan Error"
        value={email}
        onChangeText={setEmail}
        error="Format email salah"
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

export default TextInputDemoScreen;
