import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { Module } from '../../types/course';
import { DraggableModule } from './DraggableModule';
import { CreateModuleModal } from './CreateModuleModal';
import { LoadingOverlay } from '../common/LoadingOverlay';
import { moduleService } from '../../services/moduleService';

interface ModuleNavigatorProps {
  courseId: string;
  modules: Module[];
  selectedModuleId: string | null;
  selectedLessonId: string | null;
  isEditorMode?: boolean;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  onEditModule?: (moduleId: string, title: string) => void;
  onEditLesson?: (moduleId: string, lessonId: string, title: string) => void;
  onDeleteModule?: (moduleId: string) => Promise<void>;
  onDeleteLesson?: (moduleId: string, lessonId: string) => Promise<void>;
  onRefreshCourse: () => Promise<void>;
}

export const ModuleNavigator: React.FC<ModuleNavigatorProps> = ({
  courseId,
  modules,
  selectedModuleId,
  selectedLessonId,
  isEditorMode = false,
  onSelectLesson,
  onEditModule,
  onEditLesson,
  onDeleteModule,
  onDeleteLesson,
  onRefreshCourse,
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (modules?.length > 0) {
      setExpandedModules(new Set(modules.map(module => module.id)));
    }
  }, [modules]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(current => {
      const newExpanded = new Set(current);
      if (newExpanded.has(moduleId)) {
        newExpanded.delete(moduleId);
      } else {
        newExpanded.add(moduleId);
      }
      return newExpanded;
    });
  };

  const handleCreateModule = async (feedback: string) => {
    setShowCreateModal(false);
    setIsLoading(true);
    setError(null);
    try {
      await moduleService.createModule(courseId, feedback);
      await onRefreshCourse();
    } catch (err) {
      setError('Error al crear el módulo');
      console.error('Error creating module:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderModulesList = () => {
    if (isEditorMode) {
      return (
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="modules-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                {modules.map((module, index) => (
                  <DraggableModule
                    key={module.id}
                    courseId={courseId}
                    module={module}
                    index={index}
                    isEditorMode={isEditorMode}
                    isExpanded={expandedModules.has(module.id)}
                    selectedLessonId={selectedLessonId}
                    onToggleExpand={() => toggleModule(module.id)}
                    onSelectLesson={onSelectLesson}
                    onEditModule={onEditModule}
                    onEditLesson={onEditLesson}
                    onDeleteModule={onDeleteModule}
                    onDeleteLesson={onDeleteLesson}
                    onRefreshCourse={onRefreshCourse}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }

    return (
      <div className="space-y-2">
        {modules.map((module, index) => (
          <DraggableModule
            key={module.id}
            courseId={courseId}
            module={module}
            index={index}
            isEditorMode={false}
            isExpanded={expandedModules.has(module.id)}
            selectedLessonId={selectedLessonId}
            onToggleExpand={() => toggleModule(module.id)}
            onSelectLesson={onSelectLesson}
            onRefreshCourse={onRefreshCourse}
          />
        ))}
      </div>
    );
  };

  return (
    <nav className="w-80 border-r border-gray-200 overflow-y-auto">
      {isLoading && <LoadingOverlay message="Creando módulo..." />}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#2C3E50]">Contenido del Curso</h2>
          {isEditorMode && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-[#3498DB] transition-colors"
              title="Agregar módulo"
              disabled={isLoading}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {renderModulesList()}

        <CreateModuleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreateModule}
        />
      </div>
    </nav>
  );
};