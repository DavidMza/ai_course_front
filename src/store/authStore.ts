import { create } from 'zustand';
import { RegisterData, User, AuthResponse } from '../types/auth';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  login: async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      set({
        isAuthenticated: true,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        user: {
          id: 'temp-id', // Este ID se actualizará cuando implementemos el endpoint de perfil
          email: email,
          name: '',
          lastname: '',
          language: 'es',
          assistant: 'default',
          model: 'default'
        }
      });
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  },
  register: async (data: RegisterData) => {
    const response = await authService.register(data);
    set({
      user: {
        id: Date.now().toString(),
        ...data
      },
      isAuthenticated: true,
      accessToken: response.access_token,
      refreshToken: response.refresh_token
    });
  },
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null
    });
  },
}));