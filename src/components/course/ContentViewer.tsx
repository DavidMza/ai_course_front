import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, Check, RefreshCw } from 'lucide-react';
import { Module, Lesson } from '../../types/course';
import { ModuleContent } from '../../types/content';
import { useCourseStore } from '../../store/courseStore';
import { contentService } from '../../services/contentService';
import { TextAreaModal } from '../common/TextAreaModal';
import { cn } from '../../utils/cn';

interface ContentViewerProps {
  courseId: string;
  selectedModule: Module;
  selectedLesson: Lesson;
  onNavigateNext?: () => void;
  isEditorMode?: boolean;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({
  courseId,
  selectedModule,
  selectedLesson,
  onNavigateNext,
  isEditorMode = false,
}) => {
  const [content, setContent] = useState<ModuleContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  
  const toggleLessonCompletion = useCourseStore(
    (state) => state.toggleLessonCompletion
  );

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const lessonContent = await contentService.getLessonContent(
          courseId,
          selectedModule.id,
          selectedLesson.id
        );
        setContent(lessonContent);
      } catch (err) {
        setError('Error al cargar el contenido de la lección');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId, selectedModule.id, selectedLesson.id]);

  const handleRegenerateContent = async (feedback: string) => {
    setLoading(true);
    setError(null);
    setShowRegenerateModal(false);
    
    try {
      const newContent = await contentService.regenerateContent(
        courseId,
        selectedModule.id,
        selectedLesson.id,
        feedback
      );
      setContent(newContent);
    } catch (err) {
      setError('Error al regenerar el contenido');
      console.error('Error regenerating content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompletion = () => {
    toggleLessonCompletion(courseId, selectedLesson.id);
    if (!selectedLesson.completed && onNavigateNext) {
      onNavigateNext();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-[#34495E]">Cargando contenido...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-[#2C3E50]">
                {selectedLesson.title}
              </h1>
              <div className="flex items-center gap-2">
                {isEditorMode && (
                  <button
                    onClick={() => setShowRegenerateModal(true)}
                    className="w-10 h-10 rounded-full transition-all duration-200 transform hover:scale-110 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 flex items-center justify-center"
                    title="Regenerar contenido"
                  >
                    <RefreshCw className="w-5 h-5 stroke-[2.5]" />
                  </button>
                )}
                {!isEditorMode && (
                  <button
                    onClick={handleToggleCompletion}
                    className={cn(
                      "w-10 h-10 rounded-full transition-all duration-200 transform hover:scale-110",
                      "flex items-center justify-center",
                      "border-2",
                      selectedLesson.completed
                        ? "border-green-500 text-green-500 hover:bg-green-50"
                        : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                    )}
                    title={selectedLesson.completed ? "Marcar como no leída" : "Marcar como leída"}
                  >
                    <Check 
                      className={cn(
                        "w-5 h-5 stroke-[2.5]",
                        selectedLesson.completed
                          ? "animate-completion"
                          : "transition-transform hover:scale-105"
                      )}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center text-sm text-[#7F8C8D]">
              <Clock className="w-4 h-4 mr-2" />
              <span>{selectedLesson.duration}</span>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content?.content || ''}</ReactMarkdown>
          </div>
        </div>
      </div>

      <TextAreaModal
        isOpen={showRegenerateModal}
        onClose={() => setShowRegenerateModal(false)}
        onConfirm={handleRegenerateContent}
        title="Regenerar contenido"
        description="¿Qué te gustaría cambiar del contenido actual?"
        confirmText="Regenerar"
        cancelText="Cancelar"
        placeholder="Describe los cambios que te gustaría ver en el contenido..."
      />
    </>
  );
};