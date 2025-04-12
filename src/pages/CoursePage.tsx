import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { CourseTitle } from '../components/course/CourseTitle';
import { CourseLayout } from '../components/course/CourseLayout';
import { EmptyState } from '../components/course/EmptyState';

export const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { 
    currentCourse, 
    loading, 
    error, 
    fetchCourse, 
    updateCourse,
    reorderModules,
    deleteModule,
    deleteLesson,
    updateModule,
    updateLesson
  } = useCourseStore();
  const { isLoading: isAuthLoading, isAuthenticated } = useAuthStore(
    (state) => ({ isLoading: state.isLoading, isAuthenticated: state.isAuthenticated })
  );
  
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) {
      return; 
    }

    if (!isAuthenticated) {
       navigate('/login'); 
       return;
    }
    
    if (!courseId) {
      navigate('/dashboard');
      return;
    }

    const loadCourse = async () => {
      try {
        // console.log("[CoursePage] Auth loaded, fetching course..."); 
        await fetchCourse(courseId);
      } catch (err) {
        console.error('Error loading course:', err);
      }
    };

    loadCourse();
  }, [courseId, fetchCourse, navigate, isAuthLoading, isAuthenticated]);

  const handleEditCourse = (data: { title: string; level: string; duration: string }) => {
    if (courseId && currentCourse) {
      updateCourse(courseId, {
        ...currentCourse,
        ...data
      });
    }
  };

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setSelectedModuleId(moduleId);
    setSelectedLessonId(lessonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#3498DB] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!currentCourse || !courseId) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <p className="text-[#34495E]">Curso no encontrado</p>
      </div>
    );
  }

  // Si el curso está en estado "pending", mostrar la vista especial
  if (currentCourse.status === 'pending') {
    return (
      <div className="min-h-screen bg-[#F4F6F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#2C3E50]">Curso en generación</h1>
          </div>
          <EmptyState course={currentCourse} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <CourseTitle
            course={currentCourse}
            isEditorMode={isEditorMode}
            onEditCourse={handleEditCourse}
          />
          <button
            onClick={() => setIsEditorMode(!isEditorMode)}
            className="px-4 py-2 text-sm font-medium text-[#3498DB] bg-white border border-[#3498DB] rounded-lg hover:bg-blue-50 transition-colors"
          >
            {isEditorMode ? 'Salir del modo editor' : 'Modo editor'}
          </button>
        </div>

        <CourseLayout
          courseId={courseId}
          modules={currentCourse.modules}
          selectedModuleId={selectedModuleId}
          selectedLessonId={selectedLessonId}
          isEditorMode={isEditorMode}
          onSelectLesson={handleSelectLesson}
          onEditModule={(moduleId, title) => {
            if (courseId) {
              updateModule(courseId, moduleId, title);
            }
          }}
          onEditLesson={(moduleId, lessonId, title) => {
            if (courseId) {
              updateLesson(courseId, moduleId, lessonId, title);
            }
          }}
          onDeleteModule={async (moduleId) => {
            if (courseId) {
              await deleteModule(courseId, moduleId);
            }
          }}
          onDeleteLesson={async (moduleId, lessonId) => {
            if (courseId) {
              await deleteLesson(courseId, moduleId, lessonId);
            }
          }}
          onRefreshCourse={() => fetchCourse(courseId)}
        />
      </div>
    </div>
  );
};