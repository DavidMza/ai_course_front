import { create } from 'zustand';
import { Course } from '../types/course';

interface PublicCourseState {
  courses: Course[];
  fetchCourses: () => Promise<void>;
  toggleLike: (courseId: string) => void;
}

// Mock public courses for demonstration
const MOCK_PUBLIC_COURSES: Course[] = [
  {
    id: "public-1",
    title: "Introducción a la Programación Web",
    description: "Aprende los fundamentos de HTML, CSS y JavaScript desde cero.",
    user_id: "ana_dev",
    metadata: {
      level: "principiante",
      language: "es",
      duration: "4 semanas",
      createdAt: "2024-03-15T10:00:00Z",
      likes: 42
    },
    modules: [],
    liked: false
  },
  {
    id: "public-2",
    title: "Marketing Digital Avanzado",
    description: "Estrategias avanzadas de marketing digital para hacer crecer tu negocio.",
    user_id: "marketing_pro",
    metadata: {
      level: "avanzado",
      language: "es",
      duration: "8 semanas",
      createdAt: "2024-03-10T15:30:00Z",
      likes: 128
    },
    modules: [],
    liked: false
  }
];

export const usePublicCourseStore = create<PublicCourseState>((set) => ({
  courses: MOCK_PUBLIC_COURSES,
  fetchCourses: async () => {
    set({ courses: MOCK_PUBLIC_COURSES });
  },
  toggleLike: (courseId: string) => {
    set((state) => ({
      courses: state.courses.map((course) => {
        if (course.id === courseId) {
          const liked = !course.liked;
          return {
            ...course,
            liked,
            metadata: {
              ...course.metadata,
              likes: course.metadata.likes + (liked ? 1 : -1)
            }
          };
        }
        return course;
      })
    }));
  }
}));