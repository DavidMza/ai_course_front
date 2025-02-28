import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CourseHeaderProps {
  title: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="group flex items-center text-sm text-gray-500 hover:text-[#3498DB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
            <span>Volver</span>
          </button>

          <h1 className="text-xl font-medium text-[#2C3E50] truncate max-w-2xl text-center">
            {title}
          </h1>

          <div className="w-16">
            {/* Empty div for flex spacing */}
          </div>
        </div>
      </div>
    </header>
  );
};