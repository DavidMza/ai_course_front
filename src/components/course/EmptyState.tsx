import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

interface EmptyStateProps {
  onCreateCourse: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateCourse }) => {
  return (
    <div className="text-center py-12">
      <Sparkles className="mx-auto h-12 w-12 text-[#3498DB] mb-4" />
      <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
        No tienes cursos creados
      </h3>
      <p className="text-[#34495E] mb-8">
        Comienza tu viaje creando tu primer curso con IA
      </p>
      <Button onClick={onCreateCourse} size="lg">
        Genera tu primer curso
      </Button>
    </div>
  );
};