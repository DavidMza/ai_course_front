import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Generando curso...' 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <Sparkles className="w-12 h-12 text-[#3498DB] animate-spin mb-4" />
        <p className="text-[#2C3E50] text-lg font-medium">{message}</p>
        <p className="text-[#34495E] mt-2 text-sm">
          Esto puede tomar unos minutos
        </p>
      </div>
    </div>
  );
};