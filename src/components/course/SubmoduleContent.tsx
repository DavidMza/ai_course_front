import React from 'react';
import { Module, Lesson } from '../../types/course';
import { ContentViewer } from './ContentViewer';
import { CourseEmptyState } from './CourseEmptyState';

interface SubmoduleContentProps {
  courseId: string;
  selectedModule: Module | null;
  selectedLesson: Lesson | null;
  isEditorMode?: boolean;
}

export const SubmoduleContent: React.FC<SubmoduleContentProps> = ({
  courseId,
  selectedModule,
  selectedLesson,
  isEditorMode = false,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {selectedModule && selectedLesson ? (
        <ContentViewer
          courseId={courseId}
          selectedModule={selectedModule}
          selectedLesson={selectedLesson}
          isEditorMode={isEditorMode}
        />
      ) : (
        <CourseEmptyState />
      )}
    </div>
  );
};