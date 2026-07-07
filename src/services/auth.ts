import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSchema, validateAsync } from '../utils/validation';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { isValid, errors } = await validateAsync(loginSchema, payload);
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      throw new Error(firstError);
    }

    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('user', JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    }));
    return data;
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
  },

  getUser: async (): Promise<User | null> => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: async (): Promise<string | null> => {
    return AsyncStorage.getItem('accessToken');
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('accessToken');
    return !!token;
  },
};

export type { LoginPayload, LoginResponse, User };
