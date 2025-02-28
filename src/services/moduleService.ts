import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';

export class ModuleError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ModuleError';
  }
}

export const moduleService = {
  createModule: async (courseId: string, feedback: string): Promise<void> => {
    try {
      await apiClient.post(
        `/courses/${courseId}/modules`,
        { feedback },
        { headers: API_CONFIG.headers }
      );
    } catch (error) {
      throw new ModuleError('Error al crear el módulo', error);
    }
  },

  updateModule: async (courseId: string, moduleId: string, title: string): Promise<void> => {
    try {
      await apiClient.patch(
        `/courses/${courseId}/modules/${moduleId}`,
        { title },
        { headers: API_CONFIG.headers }
      );
    } catch (error) {
      throw new ModuleError('Error al actualizar el módulo', error);
    }
  },

  deleteModule: async (courseId: string, moduleId: string): Promise<void> => {
    try {
      await apiClient.delete(
        `/courses/${courseId}/modules/${moduleId}`,
        { headers: API_CONFIG.headers }
      );
    } catch (error) {
      throw new ModuleError('Error al eliminar el módulo', error);
    }
  }
};