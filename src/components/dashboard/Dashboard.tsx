import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader } from 'lucide-react';
import { CourseList } from '../course/CourseList';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { courses, loading, error, fetchCourses } = useCourseStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadCourses = async () => {
      try {
        await fetchCourses();
      } catch (err) {
        console.error('Error loading courses:', err);
      }
    };
    
    loadCourses();
  }, [fetchCourses, isAuthenticated, navigate]);

  const handleCreateCourse = () => {
    navigate('/wizard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#3498DB] animate-spin mx-auto mb-4" />
          <p className="text-[#34495E]">Cargando cursos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchCourses()}
          className="text-[#3498DB] hover:underline"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F4F6F7]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseList courses={courses} onCreateCourse={handleCreateCourse} />
      </main>

      <button
        onClick={handleCreateCourse}
        className="fixed bottom-8 right-8 flex items-center bg-[#3498DB] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2980B9] transition-all hover:shadow-xl group"
        title="Crear nuevo curso con IA"
      >
        <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
        <span className="font-medium">Crear Curso</span>
      </button>
    </div>
  );
};