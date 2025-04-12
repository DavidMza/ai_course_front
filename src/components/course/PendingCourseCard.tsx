import React from 'react';
import { CourseListItem } from '../../types/course';
import { Loader2 } from 'lucide-react';

interface PendingCourseCardProps {
  course: CourseListItem;
}

const PendingCourseCard: React.FC<PendingCourseCardProps> = ({ course }) => {
  return (
    <div className="overflow-hidden bg-white border-2 border-blue-200 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg">
      <div className="bg-gray-50 dark:bg-gray-800 pb-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            Curso en generación
          </h3>
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Tu nuevo curso está siendo creado y estará disponible pronto
        </p>
      </div>
      <div className="pt-4 pb-5 p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
          <p className="text-sm text-center mt-4">
            Estamos preparando tu curso con contenido de alta calidad.
            <br />
            ¡Gracias por tu paciencia!
          </p>
          <p className="text-xs text-gray-500 mt-2">ID: {course.id}</p>
        </div>
      </div>
    </div>
  );
};

export default PendingCourseCard;