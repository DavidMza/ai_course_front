import React from 'react';
import { Link } from 'react-router-dom';
import { Home, GraduationCap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';

interface CourseHeaderProps {
  title: string;
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ title }) => {
  const { logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-[#3498DB] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-[#3498DB] transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mis Cursos</span>
            </Link>
            <span className="text-sm font-medium text-[#3498DB] truncate max-w-md">
              {title}
            </span>
          </nav>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => logout()}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
};