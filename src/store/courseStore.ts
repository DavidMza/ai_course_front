import { create } from 'zustand';
import { Course, CourseListItem, Module } from '../types/course';
import { courseService } from '../services/courseService';
import { moduleOperations } from '../services/operations/moduleOperations';

interface CourseState {
  courses: CourseListItem[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourse: (courseId: string) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: (courseId: string, course: Course) => void;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  reorderModules: (courseId: string, modules: Module[]) => void;
  deleteModule: (courseId: string, moduleId: string) => Promise<void>;
  deleteLesson: (courseId: string, moduleId: string, lessonId: string) => Promise<void>;
  updateModule: (courseId: string, moduleId: string, title: string) => Promise<void>;
  updateLesson: (courseId: string, moduleId: string, lessonId: string, title: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,

  fetchCourse: async (courseId: string) => {
    set({ loading: true, error: null });
    try {
      const course = await courseService.getCourse(courseId);
      set({ 
        currentCourse: course, 
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      set({ 
        error: 'Error al cargar el curso', 
        loading: false,
        currentCourse: null
      });
      throw error;
    }
  },

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const courses = await courseService.listCourses();
      set({ courses, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching courses:', error);
      set({ 
        error: 'Error al cargar los cursos',
        loading: false,
        courses: []
      });
      throw error;
    }
  },

  deleteCourse: async (courseId: string) => {
    set({ loading: true, error: null });
    try {
      await courseService.deleteCourse(courseId);
      const courses = get().courses.filter(course => course.id !== courseId);
      set({ courses, loading: false });
    } catch (error) {
      set({ 
        error: 'Error al eliminar el curso',
        loading: false 
      });
      throw error;
    }
  },

  updateCourse: (courseId: string, course: Course) => {
    set(state => ({
      currentCourse: course,
      courses: state.courses.map(c => 
        c.id === courseId 
          ? { ...c, title: course.title } 
          : c
      )
    }));
  },

  toggleLessonCompletion: (courseId: string, lessonId: string) => {
    set(state => {
      if (!state.currentCourse || state.currentCourse.id !== courseId) return state;

      const updatedCourse = {
        ...state.currentCourse,
        modules: state.currentCourse.modules.map(module => ({
          ...module,
          lessons: module.lessons.map(lesson => 
            lesson.id === lessonId
              ? { ...lesson, completed: !lesson.completed }
              : lesson
          )
        }))
      };

      return { currentCourse: updatedCourse };
    });
  },

  reorderModules: (courseId: string, modules: Module[]) => {
    set(state => {
      if (!state.currentCourse || state.currentCourse.id !== courseId) return state;

      return {
        currentCourse: {
          ...state.currentCourse,
          modules
        }
      };
    });
  },

  deleteModule: async (courseId: string, moduleId: string) => {
    await moduleOperations.deleteModule(courseId, moduleId);
  },

  deleteLesson: async (courseId: string, moduleId: string, lessonId: string) => {
    await moduleOperations.deleteLesson(courseId, moduleId, lessonId);
  },

  updateModule: async (courseId: string, moduleId: string, title: string) => {
    await moduleOperations.updateModule(courseId, moduleId, title);
  },

  updateLesson: async (courseId: string, moduleId: string, lessonId: string, title: string) => {
    await moduleOperations.updateLesson(courseId, moduleId, lessonId, title);
  }
}));