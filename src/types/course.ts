export interface CourseMetadata {
  level: string;
  language: string;
  duration: string;
  createdAt?: string;
  likes?: number;
}

export interface Lesson {
  id: string;
  module_id?: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  completed: boolean;
}

export interface Module {
  id: string;
  course_id?: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  user_id: string;
  level: string;
  language: string;
  duration: string;
  visibility?: string;
  modules: Module[];
  metadata?: CourseMetadata;
}

export interface CourseListItem {
  id: string;
  title: string;
  description: string;
  user_id: string;
  level: string;
  language: string;
  duration: string;
  visibility?: string;
}

export interface CoursesResponse {
  items: CourseListItem[];
  next: string | null;
}