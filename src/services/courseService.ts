import { Course, CourseListItem, CoursesResponse } from '../types/course';
import { apiClient } from './api/client';
import { API_CONFIG } from '../config/api';
import { useAuthStore } from '../store/authStore';
import { WizardData } from '../types/wizard';

export class CourseError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'CourseError';
  }
}

export const courseService = {
  createCourse: async (wizardData: WizardData): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new CourseError('No hay token de acceso');
    }

    try {
      const relativePath = '/users/me/courses';

      const response = await apiClient.post(relativePath, { 
        language: wizardData.language,
        steps: wizardData.steps
          .filter(step => step.answer)
          .map(({ order, question, answer }) => ({
            order,
            question,
            answer
          }))
      }, {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 201) {
        throw new CourseError('Error al crear el curso');
      }
    } catch (error) {
      console.error('API Error:', error);
      throw new CourseError('Error al generar el curso', error);
    }
  },

  listCourses: async (): Promise<CourseListItem[]> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new CourseError('No hay token de acceso');
    }

    try {
      const relativePath = '/users/me/courses';

      const response = await apiClient.get<CoursesResponse>(relativePath, {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.items;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new CourseError('Error al obtener los cursos', error);
    }
  },

  getCourse: async (courseId: string): Promise<Course> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new CourseError('No hay token de acceso');
    }

    try {
      const relativePath = `/users/me/courses/${courseId}`;

      const response = await apiClient.get<Course>(relativePath, {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // Ensure modules and lessons are sorted by order
      if (response.modules) {
        response.modules.sort((a, b) => a.order - b.order);
        response.modules.forEach(module => {
          if (module.lessons) {
            module.lessons.sort((a, b) => a.order - b.order);
          }
        });
      }

      return response;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new CourseError('Error al cargar el curso', error);
    }
  },

  updateCourse: async (courseId: string, data: { title: string }): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new CourseError('No hay token de acceso');
    }

    try {
      const relativePath = `/users/me/courses/${courseId}`;

      await apiClient.patch(relativePath, data, {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      throw new CourseError('Error al actualizar el curso', error);
    }
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new CourseError('No hay token de acceso');
    }

    try {
      const relativePath = `/users/me/courses/${courseId}`;

      await apiClient.delete(relativePath, {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      throw new CourseError('Error al eliminar el curso', error);
    }
  }
};