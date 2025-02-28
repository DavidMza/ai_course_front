import React, { useState } from 'react';
import { usePublicCourseStore } from '../store/publicCourseStore';
import { PublicCourseCard } from '../components/public/PublicCourseCard';
import { PublicCoursesIntro } from '../components/public/PublicCoursesIntro';
import { CourseFilters, type CourseFilters as CourseFiltersType } from '../components/public/CourseFilters';
import { Header } from '../components/layout/Header';

export const PublicCoursesPage: React.FC = () => {
  const courses = usePublicCourseStore((state) => state.courses);
  const [filters, setFilters] = useState<CourseFiltersType>({
    search: '',
    level: '',
    sortBy: '',
  });

  const filteredAndSortedCourses = courses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLevel = !filters.level || course.metadata.level === filters.level;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'most-liked':
          return b.metadata.likes - a.metadata.likes;
        case 'newest':
          return new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime();
        case 'oldest':
          return new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime();
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#F4F6F7]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicCoursesIntro />
        
        <div className="flex gap-8">
          <CourseFilters filters={filters} onFilterChange={setFilters} />
          
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAndSortedCourses.map((course) => (
                <PublicCourseCard key={course.id} course={course} />
              ))}
            </div>
            
            {filteredAndSortedCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#34495E]">No se encontraron cursos que coincidan con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};