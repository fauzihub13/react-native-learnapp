import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, TextInput, Button, useToast } from '../components';
import { productsService, Product } from '../services';
import { Colors, Typography, Spacing } from '../styles';
import type { RootStackParamList } from '../navigation/types';

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
}

const ProductFormScreen: React.FC = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toast = useToast();

  const isEdit = route.name === 'EditProduct';
  const productId = (route.params as any)?.id;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isEdit && productId) {
      loadProduct();
    }
  }, [isEdit, productId]);

  const loadProduct = async () => {
    try {
      const product = await productsService.getById(productId);
      setForm({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        brand: product.brand || '',
        stock: product.stock?.toString() || '',
      });
    } catch (error: any) {
      toast.error('Gagal memuat produk', error.message);
      navigation.goBack();
    } finally {
      setFetchLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title wajib diisi';
    if (!form.description.trim()) newErrors.description = 'Description wajib diisi';
    if (!form.price.trim()) newErrors.price = 'Price wajib diisi';
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = 'Price harus angka positif';
    }
    if (!form.category.trim()) newErrors.category = 'Category wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        brand: form.brand || undefined,
        stock: form.stock ? Number(form.stock) : undefined,
      };

      if (isEdit) {
        const result = await productsService.update(productId, payload);
        toast.success('Berhasil!', `"${result.title}" berhasil diupdate.`);
      } else {
        const result = await productsService.create(payload);
        toast.success('Berhasil!', `"${result.title}" berhasil ditambahkan.`);
      }
      navigation.goBack();
    } catch (error: any) {
      toast.error('Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <View style={styles.container}>
        <Header title={isEdit ? 'Edit Product' : 'Add Product'} showBack />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Memuat...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={isEdit ? 'Edit Product' : 'Add Product'}
        showBack
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.methodBar}>
          <View style={[
            styles.methodBadge,
            { backgroundColor: isEdit ? Colors.warning : Colors.primary }
          ]}>
            <Text style={styles.methodText}>
              {isEdit ? `PUT /products/${productId}` : 'POST /products/add'}
            </Text>
          </View>
        </View>

        <TextInput
          label="Title"
          value={form.title}
          onChangeText={(v) => updateField('title', v)}
          placeholder="Product title"
          error={errors.title}
          required
        />

        <TextInput
          label="Description"
          value={form.description}
          onChangeText={(v) => updateField('description', v)}
          placeholder="Product description"
          multiline
          numberOfLines={3}
          error={errors.description}
          required
          containerStyle={styles.mt}
        />

        <TextInput
          label="Price"
          value={form.price}
          onChangeText={(v) => updateField('price', v)}
          placeholder="0.00"
          keyboardType="decimal-pad"
          error={errors.price}
          required
          containerStyle={styles.mt}
        />

        <TextInput
          label="Category"
          value={form.category}
          onChangeText={(v) => updateField('category', v)}
          placeholder="e.g., electronics, clothing"
          error={errors.category}
          required
          containerStyle={styles.mt}
        />

        <TextInput
          label="Brand"
          value={form.brand}
          onChangeText={(v) => updateField('brand', v)}
          placeholder="Brand name (optional)"
          containerStyle={styles.mt}
        />

        <TextInput
          label="Stock"
          value={form.stock}
          onChangeText={(v) => updateField('stock', v)}
          placeholder="0"
          keyboardType="number-pad"
          containerStyle={styles.mt}
        />

        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          />
          <Button
            title={isEdit ? 'Update' : 'Create'}
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  methodBar: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  methodBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  methodText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  mt: {
    marginTop: Spacing.base,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
  },
});

export default ProductFormScreen;
