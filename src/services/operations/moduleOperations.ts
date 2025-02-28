import { moduleService } from '../moduleService';
import { submoduleService } from '../submoduleService';

export const moduleOperations = {
  deleteModule: async (courseId: string, moduleId: string): Promise<void> => {
    try {
      await moduleService.deleteModule(courseId, moduleId);
    } catch (error) {
      console.error('Error deleting module:', error);
      throw new Error('Error al eliminar el módulo');
    }
  },

  deleteLesson: async (courseId: string, moduleId: string, lessonId: string): Promise<void> => {
    try {
      await submoduleService.deleteSubmodule(courseId, moduleId, lessonId);
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw new Error('Error al eliminar la lección');
    }
  },

  updateModule: async (courseId: string, moduleId: string, title: string): Promise<void> => {
    try {
      await moduleService.updateModule(courseId, moduleId, title);
    } catch (error) {
      console.error('Error updating module:', error);
      throw new Error('Error al actualizar el módulo');
    }
  },

  updateLesson: async (
    courseId: string, 
    moduleId: string, 
    lessonId: string, 
    title: string
  ): Promise<void> => {
    try {
      await submoduleService.updateSubmodule(courseId, moduleId, lessonId, title);
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw new Error('Error al actualizar la lección');
    }
  }
};