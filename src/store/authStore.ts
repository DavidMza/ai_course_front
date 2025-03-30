import { create } from 'zustand';
import { RegisterData, User, AuthResponse } from '../types/auth';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
  login: async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      const user = {
        id: 'temp-id', // Este ID se actualizará cuando implementemos el endpoint de perfil
        email: email,
        name: '',
        lastname: '',
        language: 'es',
        assistant: 'default',
        model: 'default'
      };
      set({
        isAuthenticated: true,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        user: user
      });
      // Persist tokens to localStorage
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      // Optionally persist user data if needed on reload
      // localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error to be handled by the component
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
    // Remove tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Optionally remove user data if it was stored
    // localStorage.removeItem('user');
  },
  initializeAuth: () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      // Optional: Retrieve user data if stored
      // const storedUser = localStorage.getItem('user');
      // const user = storedUser ? JSON.parse(storedUser) : null;

      if (accessToken) {
        // Basic check: Assume token is valid if present
        // TODO: Add token validation logic here (e.g., check expiry or call backend)
        set({
          isAuthenticated: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: { // Temporary placeholder until user fetching is implemented
            id: 'temp-id-reloaded', 
            email: '', name: '', lastname: '', language: 'es', assistant: 'default', model: 'default' 
          },
          isLoading: false // Set isLoading to false
        });
      } else {
        // Ensure state is clean if no token found
        set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null, isLoading: false }); // Set isLoading to false
      }
    } catch (error) {
        console.error("[AuthStore] Error during initialization:", error);
        set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null, isLoading: false }); // Ensure loading stops on error
    } 
  },
}));