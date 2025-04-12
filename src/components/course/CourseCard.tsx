import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Clock, Trash2 } from 'lucide-react';
import { CourseListItem } from '../../types/course';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useCourseStore } from '../../store/courseStore';
import PendingCourseCard from './PendingCourseCard';

interface CourseCardProps {
  course: CourseListItem;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Si el curso está en estado pendiente, mostrar la tarjeta especial de pendiente
  if (course.status === 'pending') {
    return <PendingCourseCard course={course} />;
  }

  const navigate = useNavigate();
  const deleteCourse = useCourseStore(state => state.deleteCourse);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCourse(course.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking delete button
    if (e.target instanceof HTMLElement && e.target.closest('.delete-button')) {
      return;
    }
    navigate(`/course/${course.id}`);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative group"
        onClick={handleCardClick}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-[#2C3E50]">
              {course.title}
            </h3>
            <button
              className="delete-button p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              title="Eliminar curso"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
          
          <p className="text-[#34495E] mb-4 line-clamp-3">
            {course.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-[#7F8C8D]">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              {course.level}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {course.duration}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar curso"
        message="¿Estás seguro que deseas eliminar este curso? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );
};