import { WizardData } from '../types/wizard';
import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';
import { useAuthStore } from '../store/authStore';

export class WizardError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'WizardError';
  }
}

export const wizardService = {
  getWizardQuestions: async (): Promise<WizardData> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new WizardError('No hay token de acceso');
    }

    try {
      const response = await apiClient.get<WizardData>('/users/me/wizard', {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching wizard questions:', error);
      throw new WizardError('Error al obtener las preguntas del wizard', error);
    }
  }
};