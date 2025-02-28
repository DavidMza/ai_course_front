import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, GraduationCap, Globe2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "flex items-center space-x-2 text-base font-medium py-2 px-3 rounded-md transition-all",
                location.pathname === '/' 
                  ? "text-[#3498DB] bg-blue-50" 
                  : "text-gray-600 hover:text-[#3498DB] hover:bg-gray-50"
              )}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/public-courses"
              className={cn(
                "flex items-center space-x-2 text-base font-medium py-2 px-3 rounded-md transition-all",
                location.pathname === '/public-courses'
                  ? "text-[#3498DB] bg-blue-50"
                  : "text-gray-600 hover:text-[#3498DB] hover:bg-gray-50"
              )}
            >
              <Globe2 className="w-5 h-5" />
              <span>Cursos Públicos</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={cn(
                  "flex items-center space-x-2 text-base font-medium py-2 px-3 rounded-md transition-all",
                  location.pathname === '/dashboard'
                    ? "text-[#3498DB] bg-blue-50"
                    : "text-gray-600 hover:text-[#3498DB] hover:bg-gray-50"
                )}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Mis Cursos</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Iniciar Sesión</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logout()}
              >
                Cerrar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};