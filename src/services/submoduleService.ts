import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';

export class SubmoduleError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'SubmoduleError';
  }
}

export const submoduleService = {
  createSubmodule: async (courseId: string, moduleId: string, feedback: string): Promise<void> => {
    try {
      await apiClient.post(
        `/courses/${courseId}/modules/${moduleId}/submodules`,
        { feedback },
        { headers: API_CONFIG.headers }
      );
    } catch (error) {
      throw new SubmoduleError('Error al crear el submódulo', error);
    }
  },

  updateSubmodule: async (courseId: string, moduleId: string, submoduleId: string, title: string): Promise<void> => {
    try {
      await apiClient.patch(
        `/courses/${courseId}/modules/${moduleId}/submodules/${submoduleId}`,
        { title },
        { headers: API_CONFIG.headers }
      );
    } catch (error) {
      throw new SubmoduleError('Error al actualizar el submódulo', error);
    }
  },

  deleteSubmodule: async (courseId: string, moduleId: string, submoduleId: string): Promise<void> => {
    try {
      await apiClient.delete(
        `/courses/${courseId}/modules/${moduleId}/submodules/${submoduleId}`,
        { headers: API_CONFIG.headers }
      );
    } catch (error) {
      throw new SubmoduleError('Error al eliminar el submódulo', error);
    }
  }
};