import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Header, useToast, Card, Modal } from '../components';
import { useAuth } from '../context';
import { productsService, Product } from '../services';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../styles';
import type { RootStackParamList } from '../navigation/types';

const ProductsScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const toast = useToast();
  const { user, logout } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const LIMIT = 20;

  useFocusEffect(
    useCallback(() => {
      loadProducts(true);
    }, [])
  );

  const loadProducts = async (reset = false) => {
    try {
      const skip = reset ? 0 : page * LIMIT;
      const data = await productsService.getAll(LIMIT, skip);

      if (reset) {
        setProducts(data.products);
        setPage(1);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
        setPage((prev) => prev + 1);
      }
      setHasMore(skip + LIMIT < data.total);
    } catch (error: any) {
      toast.error('Gagal memuat produk', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(0);
    loadProducts(true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadProducts();
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await productsService.delete(deleteModal.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id));
      toast.success('Terhapus!', `"${deleteModal.title}" berhasil dihapus.`);
      setDeleteModal(null);
    } catch (error: any) {
      toast.error('Gagal menghapus', error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info('Logout', 'Anda telah logout.');
    navigation.replace('Login');
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={({ pressed }) => [styles.productCard, { opacity: pressed ? 0.8 : 1 }]}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.productBrand}>{item.brand || item.category}</Text>
        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.productActions}>
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProduct', { id: item.id })}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => setDeleteModal(item)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyText}>Tidak ada produk</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Products"
        subtitle={`${user?.firstName} ${user?.lastName}`}
        rightActions={[
          {
            icon: <Text style={styles.headerIcon}>➕</Text>,
            onPress: () => navigation.navigate('AddProduct'),
          },
          {
            icon: <Text style={styles.headerIcon}>🚪</Text>,
            onPress: handleLogout,
          },
        ]}
      />

      <View style={styles.methodBar}>
        <View style={[styles.methodBadge, { backgroundColor: Colors.success }]}>
          <Text style={styles.methodText}>GET /products</Text>
        </View>
        <View style={[styles.methodBadge, { backgroundColor: Colors.danger }]}>
          <Text style={styles.methodText}>DELETE /products/:id</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Memuat produk...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Hapus Produk?"
        description={`Apakah kamu yakin ingin menghapus "${deleteModal?.title}"?`}
        variant="center"
        actions={[
          {
            label: 'Hapus',
            onPress: handleDelete,
            color: Colors.danger,
            loading: deleting,
          },
          {
            label: 'Batal',
            onPress: () => setDeleteModal(null),
            variant: 'ghost',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  methodBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  methodBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  methodText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  list: {
    padding: Spacing.base,
    paddingBottom: Spacing['3xl'],
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  productImage: {
    width: 90,
    height: 90,
    backgroundColor: Colors.gray100,
  },
  productInfo: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  productBrand: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  productBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  productPrice: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  ratingBadge: {
    backgroundColor: Colors.gray50,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  ratingText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  productActions: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
    gap: Spacing.sm,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 16,
  },
  headerIcon: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  footerLoader: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: Spacing['4xl'],
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: Spacing.base,
  },
  emptyText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
});

export default ProductsScreen;
