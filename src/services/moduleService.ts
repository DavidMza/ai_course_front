import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';
import { useAuthStore } from '../store/authStore';

export class ModuleError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ModuleError';
  }
}

export const moduleService = {
  createModule: async (courseId: string, feedback: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new ModuleError('No hay token de acceso');
    }
    try {
      await apiClient.post(
        `/users/me/courses/${courseId}/modules`,
        { feedback },
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      throw new ModuleError('Error al crear el módulo', error);
    }
  },

  updateModule: async (courseId: string, moduleId: string, title: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new ModuleError('No hay token de acceso');
    }
    try {
      await apiClient.patch(
        `/users/me/courses/${courseId}/modules/${moduleId}`,
        { title },
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      throw new ModuleError('Error al actualizar el módulo', error);
    }
  },

  deleteModule: async (courseId: string, moduleId: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new ModuleError('No hay token de acceso');
    }
    try {
      await apiClient.delete(
        `/users/me/courses/${courseId}/modules/${moduleId}`,
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      throw new ModuleError('Error al eliminar el módulo', error);
    }
  }
};