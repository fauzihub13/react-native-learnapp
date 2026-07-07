import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Modal, TextInput } from '../components';

const ModalDemoScreen: React.FC = () => {
  const [basicVisible, setBasicVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleFormChange = (field: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Basic</Text>

      <Button title="Basic Modal" onPress={() => setBasicVisible(true)} />

      <Modal
        visible={basicVisible}
        onClose={() => setBasicVisible(false)}
        title="Basic Modal"
        description="Ini adalah modal sederhana dengan title dan description."
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Variant</Text>

      <Button title="Center Modal" onPress={() => setBasicVisible(true)} />

      <Button
        title="Bottom Sheet"
        variant="secondary"
        onPress={() => setBottomVisible(true)}
        style={styles.mt}
      />

      <Modal
        visible={bottomVisible}
        onClose={() => setBottomVisible(false)}
        title="Bottom Sheet"
        description="Modal dengan variant bottom sheet."
        variant="bottom"
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>
        Dengan Actions
      </Text>

      <Button title="Confirm Dialog" onPress={() => setConfirmVisible(true)} />

      <Modal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title="Konfirmasi"
        description="Apakah kamu yakin ingin melanjutkan?"
        actions={[
          {
            label: 'Ya, Lanjutkan',
            onPress: () => {
              setConfirmVisible(false);
              Alert.alert('Confirmed!');
            },
          },
          {
            label: 'Batal',
            onPress: () => setConfirmVisible(false),
            variant: 'outline',
          },
        ]}
      />

      <Button
        title="Delete Confirmation"
        backgroundColor="#FF3B30"
        onPress={() => setDeleteVisible(true)}
        style={styles.mt}
      />

      <Modal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        title="Hapus Item?"
        description="Item yang dihapus tidak bisa dikembalikan. Apakah kamu yakin?"
        actions={[
          {
            label: 'Hapus',
            onPress: () => {
              setDeleteVisible(false);
              Alert.alert('Deleted!');
            },
            color: '#FF3B30',
          },
          {
            label: 'Batal',
            onPress: () => setDeleteVisible(false),
            variant: 'ghost',
          },
        ]}
      />

      <Text style={[styles.sectionTitle, styles.mtSection]}>Custom</Text>

      <Button
        title="Custom Content"
        variant="outline"
        onPress={() => setCustomVisible(true)}
      />

      <Modal
        visible={customVisible}
        onClose={() => setCustomVisible(false)}
        title="Custom Content"
        showCloseButton
      >
        <View style={styles.customContent}>
          <Text style={styles.customIcon}>🎉</Text>
          <Text style={styles.customTitle}>Selamat!</Text>
          <Text style={styles.customDesc}>
            Kamu berhasil membuat modal dengan custom content.
          </Text>
        </View>
      </Modal>

      <Button
        title="Form Modal"
        variant="outline"
        onPress={() => setFormVisible(true)}
        style={styles.mt}
      />

      <Modal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        title="Form Modal"
        description="Modal dengan konten form."
        actions={[
          {
            label: 'Submit',
            onPress: () => {
              setFormVisible(false);
              Alert.alert('Submitted!');
            },
          },
          {
            label: 'Cancel',
            onPress: () => setFormVisible(false),
            variant: 'ghost',
          },
        ]}
      >
        <View style={styles.formContent}>
          <TextInput
            label="Input Name"
            value={formData.name}
            onChangeText={value => handleFormChange('name', value)}
            placeholder="Input name"
            borderRadius={8}
          />

          <View style={{ height: 20 }} />

          <TextInput
            label="Input Email"
            value={formData.email}
            onChangeText={value => handleFormChange('email', value)}
            placeholder="Input email"
            borderRadius={8}
          />
        </View>
      </Modal>
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
  customContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  customIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  customTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  customDesc: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContent: {
    marginTop: 8,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  formInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
  },
});

export default ModalDemoScreen;
