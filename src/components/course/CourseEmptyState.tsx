import React from 'react';
import { BookOpen } from 'lucide-react';

export const CourseEmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <BookOpen className="w-16 h-16 text-[#3498DB] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#2C3E50] mb-2">
          Selecciona un módulo para comenzar
        </h2>
        <p className="text-[#34495E]">
          Explora el contenido del curso seleccionando un módulo del menú lateral.
          Completa cada módulo para avanzar en tu aprendizaje.
        </p>
      </div>
    </div>
  );
};