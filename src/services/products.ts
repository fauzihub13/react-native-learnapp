import { productSchema, validateAsync } from '../utils/validation';
import api from './api';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock?: number;
  thumbnail?: string;
}

interface UpdateProductPayload {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  stock?: number;
}

const validatePayload = async (
  payload: CreateProductPayload | UpdateProductPayload,
) => {
  const { isValid, errors } = await validateAsync(productSchema, {
    title: payload.title || '',
    description: payload.description || '',
    price: payload.price !== undefined ? payload.price : 0,
    category: payload.category || '',
    brand: payload.brand,
    stock: payload.stock !== undefined ? payload.stock : 0,
  });

  if (!isValid) {
    const firstError = Object.values(errors)[0];
    throw new Error(firstError);
  }
};

export const productsService = {
  getAll: async (limit = 30, skip = 0): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>('/products', {
      params: { limit, skip },
    });
    return data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  search: async (query: string): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>('/products/search', {
      params: { q: query },
    });
    return data;
  },

  create: async (payload: CreateProductPayload): Promise<Product> => {
    await validatePayload(payload);
    const { data } = await api.post<Product>('/products/add', payload);
    return data;
  },

  update: async (
    id: number,
    payload: UpdateProductPayload,
  ): Promise<Product> => {
    await validatePayload(payload as CreateProductPayload);
    const { data } = await api.put<Product>(`/products/${id}`, payload);
    return data;
  },

  delete: async (
    id: number,
  ): Promise<Product & { isDeleted: boolean; deletedOn: string }> => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};

export type {
  CreateProductPayload,
  Product,
  ProductsResponse,
  UpdateProductPayload,
};
