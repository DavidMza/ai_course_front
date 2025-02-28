import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

export interface CourseFilters {
  search: string;
  level: string;
  sortBy: 'newest' | 'oldest' | 'az' | 'za' | 'most-liked' | '';
}

interface CourseFiltersProps {
  filters: CourseFilters;
  onFilterChange: (filters: CourseFilters) => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof CourseFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-72 h-fit sticky top-24">
      <h3 className="text-lg font-semibold text-[#2C3E50] mb-6">Filtros</h3>
      
      <div className="space-y-6">
        {/* Búsqueda */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#34495E]">Nombre del curso</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Nivel */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#34495E]">Nivel</label>
          <select
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            value={filters.level}
            onChange={(e) => handleChange('level', e.target.value)}
          >
            <option value="">Todos los niveles</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        {/* Ordenar */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#34495E] flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Ordenar por
          </label>
          <select
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="">Más relevantes</option>
            <option value="most-liked">Más populares</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};