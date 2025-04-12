import React from 'react';
import { Loader2 } from 'lucide-react';
import { Course } from '../../types/course';

interface EmptyStateProps {
  course?: Course;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ course }) => {
  // Si el curso está en estado pending, mostrar un estado especial
  if (course?.status === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow p-8">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-6 mb-6">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Curso en proceso de generación
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-md mb-6">
          Estamos trabajando en tu curso. Pronto estará disponible con todo el contenido de calidad 
          que esperas. ¡Gracias por tu paciencia!
        </p>
        <p className="text-sm text-gray-500">ID del curso: {course.id}</p>
      </div>
    );
  }

  // Estado vacío estándar para otros casos
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow p-8">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
        <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-4">
        No hay contenido seleccionado
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
        Selecciona un módulo o lección para ver su contenido, o crea nuevo contenido en el modo editor.
      </p>
    </div>
  );
};