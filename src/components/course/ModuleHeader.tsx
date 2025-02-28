import React from 'react';
import { ChevronDown, ChevronRight, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Module } from '../../types/course';

interface ModuleHeaderProps {
  module: Module;
  isEditorMode: boolean;
  isExpanded: boolean;
  dragHandleProps?: any;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  module,
  isEditorMode,
  isExpanded,
  dragHandleProps,
  onToggleExpand,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center p-3">
      {isEditorMode && dragHandleProps && (
        <div {...dragHandleProps} className="mr-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      )}
      
      <button
        onClick={onToggleExpand}
        className="mr-2 text-gray-500"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      
      <div className="flex-1">
        <h3 className="text-sm font-medium text-[#2C3E50]">
          {module.title}
        </h3>
        <p className="text-xs text-gray-500">{module.duration}</p>
      </div>

      {isEditorMode && (
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
            title="Editar módulo"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded-lg hover:bg-gray-100 text-red-500"
            title="Eliminar módulo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};