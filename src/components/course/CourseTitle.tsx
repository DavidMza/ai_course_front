import React, { useState } from 'react';
import { BookOpen, Clock, Pencil } from 'lucide-react';
import { Course } from '../../types/course';
import { EditCourseModal } from './EditCourseModal';

interface CourseTitleProps {
  course: Course;
  isEditorMode?: boolean;
  onEditCourse?: (data: { title: string; level: string; duration: string }) => void;
}

export const CourseTitle: React.FC<CourseTitleProps> = ({ 
  course,
  isEditorMode = false,
  onEditCourse
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  // Return early if course data is not yet loaded
  if (!course) {
    return null;
  }

  const handleEditCourse = (data: { title: string; level: string; duration: string }) => {
    if (onEditCourse) {
      onEditCourse(data);
      setShowEditModal(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#2C3E50]">
              {course.title}
            </h1>
            {isEditorMode && (
              <button
                onClick={() => setShowEditModal(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                title="Editar curso"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-[#7F8C8D] mt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{course.level || 'Sin nivel'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration || 'Sin duración'}</span>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditCourseModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onConfirm={handleEditCourse}
          course={course}
        />
      )}
    </>
  );
};