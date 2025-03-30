import { RegisterData, AuthResponse } from '../types/auth';
import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';

export class AuthError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/login', 
        { email, password },
        { 
          headers: {
            ...API_CONFIG.headers,
          }
        }
      );
      
      if (!response.data) {
        throw new AuthError('No se recibió respuesta del servidor');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw new AuthError('Error al iniciar sesión', error);
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/register', data, {
        headers: API_CONFIG.headers
      });
      
      if (!response.data) {
        throw new AuthError('No se recibió respuesta del servidor');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw new AuthError('Error al registrar usuario', error);
    }
  },
};