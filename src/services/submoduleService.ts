import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';
import { useAuthStore } from '../store/authStore';

export class SubmoduleError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'LessonError';
  }
}

export const submoduleService = {
  createSubmodule: async (courseId: string, moduleId: string, feedback: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new SubmoduleError('No hay token de acceso');
    }
    try {
      await apiClient.post(
        `/users/me/courses/${courseId}/modules/${moduleId}/lessons`,
        { feedback },
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      throw new SubmoduleError('Error al crear la lessons', error);
    }
  },

  updateSubmodule: async (courseId: string, moduleId: string, submoduleId: string, title: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new SubmoduleError('No hay token de acceso');
    }
    try {
      await apiClient.patch(
        `/users/me/courses/${courseId}/modules/${moduleId}/lessons/${submoduleId}`,
        { title },
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      throw new SubmoduleError('Error al actualizar la lessons', error);
    }
  },

  deleteSubmodule: async (courseId: string, moduleId: string, submoduleId: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new SubmoduleError('No hay token de acceso');
    }
    try {
      await apiClient.delete(
        `/users/me/courses/${courseId}/modules/${moduleId}/lessons/${submoduleId}`,
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
    } catch (error) {
      throw new SubmoduleError('Error al eliminar la lessons', error);
    }
  }
};