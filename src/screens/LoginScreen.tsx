import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, TextInput, useToast, Card } from '../components';
import { useAuth } from '../context';
import { Colors, Typography, Spacing, BorderRadius } from '../styles';
import type { RootStackParamList } from '../navigation/types';

const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toast = useToast();
  const { login } = useAuth();

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = 'Username wajib diisi';
    if (!password.trim()) newErrors.password = 'Password wajib diisi';
    else if (password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await login({ username, password });
      toast.success('Login Berhasil!', `Selamat datang, ${username}`);
      navigation.replace('Products');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Terjadi kesalahan';
      toast.error('Login Gagal', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login untuk melanjutkan</Text>
      </View>

      <Card variant="outlined" style={styles.card}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
          }}
          placeholder="Masukkan username"
          autoCapitalize="none"
          error={errors.username}
          required
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="Masukkan password"
          isPassword
          error={errors.password}
          required
          containerStyle={styles.mt}
        />

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
          style={styles.mtLg}
        />
      </Card>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Demo Credentials</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoValue}>emilys</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Password:</Text>
          <Text style={styles.infoValue}>emilyspass</Text>
        </View>
      </View>

      <View style={styles.methodBadge}>
        <Text style={styles.methodText}>POST /auth/login</Text>
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
    paddingTop: Spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logo: {
    fontSize: 60,
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  card: {
    padding: Spacing.lg,
  },
  mt: {
    marginTop: Spacing.base,
  },
  mtLg: {
    marginTop: Spacing.xl,
  },
  infoSection: {
    marginTop: Spacing['2xl'],
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
  },
  infoTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: Spacing.xs,
  },
  infoLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    width: 80,
  },
  infoValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  methodBadge: {
    alignSelf: 'center',
    marginTop: Spacing.xl,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  methodText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
});

export default LoginScreen;
