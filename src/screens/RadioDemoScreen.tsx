import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Radio, RadioGroup } from '../components';
import { Colors, Typography, Spacing } from '../styles';

const GENDER_OPTIONS = [
  { label: 'Laki-laki', value: 'male', description: 'Jenis kelamin laki-laki' },
  { label: 'Perempuan', value: 'female', description: 'Jenis kelamin perempuan' },
];

const PAYMENT_OPTIONS = [
  { label: 'Credit Card', value: 'credit', description: 'Visa, Mastercard, JCB' },
  { label: 'Bank Transfer', value: 'bank', description: 'Transfer bank lokal' },
  { label: 'E-Wallet', value: 'ewallet', description: 'GoPay, OVO, Dana' },
  { label: 'Cash on Delivery', value: 'cod', description: 'Bayar di tempat' },
];

const PLAN_OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Basic', value: 'basic' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

const RadioDemoScreen: React.FC = () => {
  const [basicSelected, setBasicSelected] = useState<string | null>(null);
  const [withDesc, setWithDesc] = useState<string | null>('female');
  const [gender, setGender] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>('basic');
  const [genderError, setGenderError] = useState('');

  const handleSubmit = () => {
    if (!gender) {
      setGenderError('Jenis kelamin wajib dipilih');
      return;
    }
    setGenderError('');
    Alert.alert('Submitted', `Gender: ${gender}\nPayment: ${payment}\nPlan: ${plan}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <Radio
        selected={basicSelected === 'opt1'}
        onPress={() => setBasicSelected('opt1')}
        label="Option 1"
      />

      <Radio
        selected={basicSelected === 'opt2'}
        onPress={() => setBasicSelected('opt2')}
        label="Option 2"
        containerStyle={styles.mt}
      />

      <Radio
        selected={basicSelected === 'opt3'}
        onPress={() => setBasicSelected('opt3')}
        label="Option 3"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>With Description</Text>

      <RadioGroup
        options={GENDER_OPTIONS}
        selected={withDesc}
        onChange={setWithDesc}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Sizes</Text>

      <Radio
        selected={true}
        onPress={() => {}}
        label="Small"
        size="sm"
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Medium (default)"
        size="md"
        containerStyle={styles.mt}
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Large"
        size="lg"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom Colors</Text>

      <Radio
        selected={true}
        onPress={() => {}}
        label="Blue (default)"
        color={Colors.primary}
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Green"
        color={Colors.success}
        containerStyle={styles.mt}
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Red"
        color={Colors.danger}
        containerStyle={styles.mt}
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Purple"
        color={Colors.info}
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>States</Text>

      <Radio
        selected={false}
        onPress={() => {}}
        label="Unselected"
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Selected"
        containerStyle={styles.mt}
      />

      <Radio
        selected={false}
        onPress={() => {}}
        label="Disabled unselected"
        disabled
        containerStyle={styles.mt}
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Disabled selected"
        disabled
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Label Position
      </Text>

      <Radio
        selected={true}
        onPress={() => {}}
        label="Label on right (default)"
      />

      <Radio
        selected={true}
        onPress={() => {}}
        label="Label on left"
        labelPosition="left"
        containerStyle={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Radio Group
      </Text>

      <RadioGroup
        label="Jenis Kelamin"
        options={GENDER_OPTIONS}
        selected={gender}
        onChange={(val) => {
          setGender(val);
          if (genderError) setGenderError('');
        }}
        error={genderError}
        color={Colors.primary}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Payment</Text>

      <RadioGroup
        label="Metode Pembayaran"
        options={PAYMENT_OPTIONS}
        selected={payment}
        onChange={setPayment}
        color={Colors.success}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Plan</Text>

      <RadioGroup
        label="Pilih Plan"
        options={PLAN_OPTIONS}
        selected={plan}
        onChange={setPlan}
        color={Colors.info}
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

export default RadioDemoScreen;
