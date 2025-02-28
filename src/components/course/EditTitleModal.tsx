import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';

interface EditTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  title: string;
  type: 'module' | 'submodule';
}

export const EditTitleModal: React.FC<EditTitleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title: initialTitle,
  type
}) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 w-full max-w-lg m-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-[#2C3E50] mb-6">
          Editar {type === 'module' ? 'módulo' : 'submódulo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#34495E] mb-1">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              placeholder={`Ingresa el título del ${type === 'module' ? 'módulo' : 'submódulo'}`}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};