import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Module } from '../../types/course';
import { cn } from '../../utils/cn';

interface SubmoduleListProps {
  courseId: string;
  module: Module;
  isEditorMode: boolean;
  selectedSubModuleId: string | null;
  onSelectSubModule: (moduleId: string, subModuleId: string) => void;
  onEditSubmodule: (submoduleId: string) => void;
  onDeleteSubmodule: (submoduleId: string) => void;
  onCreateSubmodule: () => void;
}

export const SubmoduleList: React.FC<SubmoduleListProps> = ({
  courseId,
  module,
  isEditorMode,
  selectedSubModuleId,
  onSelectSubModule,
  onEditSubmodule,
  onDeleteSubmodule,
  onCreateSubmodule,
}) => {
  return (
    <div className="border-t border-gray-100">
      {module.submodules.map((submodule) => (
        <div
          key={submodule.id}
          className={cn(
            "flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer",
            selectedSubModuleId === submodule.id && "bg-blue-50 hover:bg-blue-50"
          )}
          onClick={() => onSelectSubModule(module.id, submodule.id)}
        >
          <div className="flex-1 pl-6">
            <h4 className="text-sm text-[#2C3E50]">
              {submodule.title}
            </h4>
            <p className="text-xs text-gray-500">
              {submodule.duration}
            </p>
          </div>

          {isEditorMode && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditSubmodule(submodule.id);
                }}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                title="Editar submódulo"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSubmodule(submodule.id);
                }}
                className="p-1 rounded-lg hover:bg-gray-100 text-red-500"
                title="Eliminar submódulo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ))}

      {isEditorMode && (
        <button
          onClick={onCreateSubmodule}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#3498DB] hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar submódulo</span>
        </button>
      )}
    </div>
  );
};