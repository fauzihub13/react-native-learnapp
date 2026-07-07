import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, useToast } from '../components';
import { Colors, Typography, Spacing } from '../styles';

const ToastDemoScreen: React.FC = () => {
  const toast = useToast();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Types</Text>

      <Button
        title="Success Toast"
        backgroundColor={Colors.success}
        onPress={() => toast.success('Berhasil!', 'Data berhasil disimpan.')}
      />

      <Button
        title="Error Toast"
        backgroundColor={Colors.danger}
        onPress={() => toast.error('Gagal!', 'Terjadi kesalahan saat menyimpan data.')}
        style={styles.mt}
      />

      <Button
        title="Warning Toast"
        backgroundColor={Colors.warning}
        onPress={() => toast.warning('Peringatan!', 'Sesi akan berakhir dalam 5 menit.')}
        style={styles.mt}
      />

      <Button
        title="Info Toast"
        variant="secondary"
        onPress={() => toast.info('Info', 'Ada pembaruan tersedia untuk aplikasi.')}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Position</Text>

      <Button
        title="Top Toast"
        variant="outline"
        onPress={() => toast.show({
          message: 'Toast di atas',
          description: 'Toast ini muncul di bagian atas layar.',
          type: 'info',
          position: 'top',
        })}
      />

      <Button
        title="Bottom Toast (default)"
        variant="outline"
        onPress={() => toast.show({
          message: 'Toast di bawah',
          description: 'Toast ini muncul di bagian bawah layar.',
          type: 'info',
          position: 'bottom',
        })}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Dengan Action</Text>

      <Button
        title="Toast with Action"
        variant="outline"
        onPress={() => toast.show({
          message: 'Koneksi terputus',
          description: 'Periksa koneksi internet kamu.',
          type: 'error',
          action: {
            label: 'Retry',
            onPress: () => toast.success('Menghubungkan...', 'Koneksi berhasil dipulihkan.'),
          },
        })}
      />

      <Button
        title="Toast with Undo"
        variant="outline"
        onPress={() => toast.show({
          message: 'Item dihapus',
          description: 'Item telah dipindahkan ke trash.',
          type: 'warning',
          duration: 5000,
          action: {
            label: 'Undo',
            onPress: () => toast.success('Dibatalkan', 'Item berhasil dikembalikan.'),
          },
        })}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Duration</Text>

      <Button
        title="Short (1 detik)"
        variant="ghost"
        onPress={() => toast.show({
          message: 'Toast cepat',
          type: 'info',
          duration: 1000,
        })}
      />

      <Button
        title="Long (5 detik)"
        variant="ghost"
        onPress={() => toast.show({
          message: 'Toast lambat',
          description: 'Toast ini akan bertahan selama 5 detik.',
          type: 'info',
          duration: 5000,
        })}
        style={styles.mt}
      />

      <Button
        title="Persistent (manual close)"
        variant="ghost"
        onPress={() => toast.show({
          message: 'Toast persistent',
          description: 'Toast ini tidak akan hilang otomatis. Tekan untuk menutup.',
          type: 'warning',
          duration: 0,
        })}
        style={styles.mt}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Simple</Text>

      <Button
        title="Simple Success"
        variant="ghost"
        onPress={() => toast.success('Berhasil!')}
      />

      <Button
        title="Simple Error"
        variant="ghost"
        onPress={() => toast.error('Gagal!')}
        style={styles.mt}
      />
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
    marginTop: Spacing.md,
  },
  mtSection: {
    marginTop: Spacing['2xl'],
  },
});

export default ToastDemoScreen;
