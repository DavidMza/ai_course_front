import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ChevronDown, ChevronRight, Plus, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Module, Lesson } from '../../types/course';
import { ModuleHeader } from './ModuleHeader';
import { EditTitleModal } from './EditTitleModal';
import { CreateSubmoduleModal } from './CreateSubmoduleModal';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { LoadingOverlay } from '../common/LoadingOverlay';
import { submoduleService } from '../../services/submoduleService';
import { cn } from '../../utils/cn';

interface DraggableModuleProps {
  courseId: string;
  module: Module;
  index: number;
  isEditorMode: boolean;
  isExpanded: boolean;
  selectedLessonId: string | null;
  onToggleExpand: (moduleId: string) => void;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  onEditModule?: (moduleId: string, title: string) => void;
  onEditLesson?: (moduleId: string, lessonId: string, title: string) => void;
  onDeleteModule?: (moduleId: string) => Promise<void>;
  onDeleteLesson?: (moduleId: string, lessonId: string) => Promise<void>;
  onRefreshCourse: () => Promise<void>;
}

export const DraggableModule: React.FC<DraggableModuleProps> = ({
  courseId,
  module,
  index,
  isEditorMode,
  isExpanded,
  selectedLessonId,
  onToggleExpand,
  onSelectLesson,
  onEditModule,
  onEditLesson,
  onDeleteModule,
  onDeleteLesson,
  onRefreshCourse,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [showCreateLessonModal, setShowCreateLessonModal] = useState(false);
  const [showDeleteModuleModal, setShowDeleteModuleModal] = useState(false);
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
  const [selectedLessonToDelete, setSelectedLessonToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEditModule = async (title: string) => {
    if (!onEditModule || !editingModuleId) return;
    setIsLoading(true);
    try {
      await onEditModule(editingModuleId, title);
      await onRefreshCourse();
    } catch (err) {
      setError('Error al editar el módulo');
    } finally {
      setIsLoading(false);
      setEditingModuleId(null);
    }
  };

  const handleEditLesson = async (title: string) => {
    if (!onEditLesson || !editingLessonId) return;
    setIsLoading(true);
    try {
      await onEditLesson(module.id, editingLessonId, title);
      await onRefreshCourse();
    } catch (err) {
      setError('Error al editar la lección');
    } finally {
      setIsLoading(false);
      setEditingLessonId(null);
    }
  };

  const handleCreateLesson = async (feedback: string) => {
    setShowCreateLessonModal(false);
    setIsLoading(true);
    setError(null);
    try {
      await submoduleService.createSubmodule(courseId, module.id, feedback);
      await onRefreshCourse();
    } catch (err) {
      setError('Error al crear la lección');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteModule = async () => {
    if (!onDeleteModule) return;
    setShowDeleteModuleModal(false);
    setIsLoading(true);
    try {
      await onDeleteModule(module.id);
      await onRefreshCourse();
    } catch (err) {
      setError('Error al eliminar el módulo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLesson = async () => {
    if (!onDeleteLesson || !selectedLessonToDelete) return;
    setShowDeleteLessonModal(false);
    setIsLoading(true);
    try {
      await onDeleteLesson(module.id, selectedLessonToDelete);
      await onRefreshCourse();
    } catch (err) {
      setError('Error al eliminar la lección');
    } finally {
      setIsLoading(false);
      setSelectedLessonToDelete(null);
    }
  };

  const renderLessonsList = () => {
    return (
      <div className="border-t border-gray-100">
        {/* Check if module.lessons is an array before mapping */}
        {Array.isArray(module.lessons) && module.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={cn(
              "flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer",
              selectedLessonId === lesson.id && "bg-blue-50 hover:bg-blue-50"
            )}
            onClick={() => onSelectLesson(module.id, lesson.id)}
          >
            <div className="flex-1 pl-6">
              <h4 className="text-sm text-[#2C3E50]">
                {lesson.title}
              </h4>
              <p className="text-xs text-gray-500">
                {lesson.duration}
              </p>
            </div>

            {isEditorMode && (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingLessonId(lesson.id);
                  }}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                  title="Editar lección"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLessonToDelete(lesson.id);
                    setShowDeleteLessonModal(true);
                  }}
                  className="p-1 rounded-lg hover:bg-gray-100 text-red-500"
                  title="Eliminar lección"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}

        {isEditorMode && (
          <button
            onClick={() => setShowCreateLessonModal(true)}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#3498DB] hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar lección</span>
          </button>
        )}
      </div>
    );
  };

  const renderModuleContent = (dragHandleProps?: any) => (
    <div className="bg-white rounded-lg border border-gray-200">
      {isLoading && <LoadingOverlay />}
      
      <ModuleHeader
        module={module}
        isEditorMode={isEditorMode}
        isExpanded={isExpanded}
        dragHandleProps={dragHandleProps}
        onToggleExpand={() => onToggleExpand(module.id)}
        onEdit={() => setEditingModuleId(module.id)}
        onDelete={() => setShowDeleteModuleModal(true)}
      />

      {isExpanded && renderLessonsList()}

      {error && (
        <div className="p-2 mx-4 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <EditTitleModal
        isOpen={!!editingModuleId}
        onClose={() => setEditingModuleId(null)}
        onConfirm={handleEditModule}
        title={module.title}
        type="module"
      />

      <EditTitleModal
        isOpen={!!editingLessonId}
        onClose={() => setEditingLessonId(null)}
        onConfirm={handleEditLesson}
        // Add check for module.lessons before calling find
        title={Array.isArray(module.lessons) ? module.lessons.find(l => l.id === editingLessonId)?.title || '' : ''}
        type="lesson"
      />

      <CreateSubmoduleModal
        isOpen={showCreateLessonModal}
        onClose={() => setShowCreateLessonModal(false)}
        onConfirm={handleCreateLesson}
      />

      <ConfirmationModal
        isOpen={showDeleteModuleModal}
        onClose={() => setShowDeleteModuleModal(false)}
        onConfirm={handleDeleteModule}
        title="Eliminar módulo"
        message="¿Estás seguro que deseas eliminar este módulo? Esta acción no se puede deshacer."
      />

      <ConfirmationModal
        isOpen={showDeleteLessonModal}
        onClose={() => setShowDeleteLessonModal(false)}
        onConfirm={handleDeleteLesson}
        title="Eliminar lección"
        message="¿Estás seguro que deseas eliminar esta lección? Esta acción no se puede deshacer."
      />
    </div>
  );

  if (!isEditorMode) {
    return renderModuleContent();
  }

  return (
    <Draggable draggableId={module.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {renderModuleContent(provided.dragHandleProps)}
        </div>
      )}
    </Draggable>
  );
};