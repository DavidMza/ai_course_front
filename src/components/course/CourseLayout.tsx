import React from 'react';
import { Module, Lesson } from '../../types/course';
import { ModuleNavigator } from './ModuleNavigator';
import { SubmoduleContent } from './SubmoduleContent';

interface CourseLayoutProps {
  courseId: string;
  modules: Module[];
  selectedModuleId: string | null;
  selectedLessonId: string | null;
  isEditorMode?: boolean;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  onEditModule?: (moduleId: string, title: string) => void;
  onEditLesson?: (moduleId: string, lessonId: string, title: string) => void;
  onDeleteModule?: (moduleId: string) => Promise<void>;
  onDeleteLesson?: (moduleId: string, lessonId: string) => Promise<void>;
  onRefreshCourse: () => Promise<void>;
}

export const CourseLayout: React.FC<CourseLayoutProps> = ({
  courseId,
  modules,
  selectedModuleId,
  selectedLessonId,
  isEditorMode = false,
  onSelectLesson,
  onEditModule,
  onEditLesson,
  onDeleteModule,
  onDeleteLesson,
  onRefreshCourse,
}) => {
  const selectedModule = modules.find(m => m.id === selectedModuleId);
  const selectedLesson = selectedModule?.lessons.find(s => s.id === selectedLessonId);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm">
      <ModuleNavigator
        courseId={courseId}
        modules={modules}
        selectedModuleId={selectedModuleId}
        selectedLessonId={selectedLessonId}
        onSelectLesson={onSelectLesson}
        isEditorMode={isEditorMode}
        onEditModule={onEditModule}
        onEditLesson={onEditLesson}
        onDeleteModule={onDeleteModule}
        onDeleteLesson={onDeleteLesson}
        onRefreshCourse={onRefreshCourse}
      />
      
      <SubmoduleContent
        courseId={courseId}
        selectedModule={selectedModule}
        selectedLesson={selectedLesson}
        isEditorMode={isEditorMode}
      />
    </div>
  );
};