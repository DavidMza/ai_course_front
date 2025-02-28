import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, GraduationCap, Globe2, ChevronLeft, ChevronRight, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/public-courses', icon: Globe2, label: 'Cursos Públicos' },
    ...(isAuthenticated ? [{ path: '/dashboard', icon: GraduationCap, label: 'Mis Cursos' }] : []),
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && <span className="text-lg font-semibold text-[#2C3E50]">Cursos AI</span>}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center px-4 py-3 my-1 mx-2 rounded-lg transition-colors",
                "hover:bg-gray-100",
                location.pathname === path && "text-[#3498DB] bg-blue-50",
                !isCollapsed && "gap-3",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className={cn(
                "transition-all",
                isCollapsed ? "w-7 h-7" : "w-5 h-5"
              )} />
              {!isCollapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className={cn(
          "p-4 border-t border-gray-200",
          isCollapsed ? "flex flex-col items-center gap-4" : "space-y-4"
        )}>
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className={cn(
                "w-full",
                isCollapsed && "p-2"
              )}
            >
              {isCollapsed ? '←' : 'Cerrar Sesión'}
            </Button>
          ) : (
            <>
              {isCollapsed ? (
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/login"
                    className="p-2 rounded-lg hover:bg-gray-100 text-[#3498DB] transition-colors"
                    title="Iniciar Sesión"
                  >
                    <LogIn className="w-7 h-7" />
                  </Link>
                  <Link 
                    to="/register"
                    className="p-2 rounded-lg hover:bg-gray-100 text-[#3498DB] transition-colors"
                    title="Registrarse"
                  >
                    <UserPlus className="w-7 h-7" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="w-full">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};