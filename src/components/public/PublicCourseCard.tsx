import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types/course';
import { Calendar, BookOpen, Clock, User, Loader2 } from 'lucide-react';
import { LikeButton } from './LikeButton';
import { usePublicCourseStore } from '../../store/publicCourseStore';

interface PublicCourseCardProps {
  course: Course;
}

export const PublicCourseCard: React.FC<PublicCourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const toggleLike = usePublicCourseStore((state) => state.toggleLike);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(course.id);
  };
  
  // Si el curso está en estado pendiente, mostrar una card especial
  if (course.status === 'pending') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              Nuevo curso en generación
            </h3>
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          </div>
          
          <p className="text-[#34495E] mb-4">
            Este curso está siendo generado y estará disponible muy pronto.
          </p>
          
          <div className="flex items-center justify-between text-sm text-[#7F8C8D]">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span className="text-[#3498DB]">@{course.user_id}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-[#2C3E50]">
            {course.title}
          </h3>
          <LikeButton
            liked={course.liked || false}
            likes={course.metadata?.likes}
            onToggleLike={handleLike}
          />
        </div>
        
        <p className="text-[#34495E] mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-[#7F8C8D]">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span className="text-[#3498DB]">@{course.user_id}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {course.metadata?.level}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.metadata?.duration}
          </div>
        </div>
      </div>
    </div>
  );
};