import { ModuleContent } from '../types/content';
import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';
import { useAuthStore } from '../store/authStore';

export class ContentError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ContentError';
  }
}

export const contentService = {
  getLessonContent: async (courseId: string, moduleId: string, lessonId: string): Promise<ModuleContent> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new ContentError('No hay token de acceso');
    }

    try {
      const response = await apiClient.get<ModuleContent>(
        `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/contents`,
        {
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      return response;
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      throw new ContentError('Error al cargar el contenido de la lección', error);
    }
  },

  regenerateContent: async (
    courseId: string,
    moduleId: string,
    lessonId: string,
    feedback: string
  ): Promise<ModuleContent> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new ContentError('No hay token de acceso');
    }

    try {
      const response = await apiClient.post<ModuleContent>(
        `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/contents/regenerate`,
        { feedback },
        { 
          headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      return response.data!;
    } catch (error) {
      console.error('Error regenerating content:', error);
      throw new ContentError('Error al regenerar el contenido', error);
    }
  }
};