import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import { Course } from '../../types/course';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { title: string; level: string; duration: string }) => void;
  course: Course;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  course
}) => {
  const [title, setTitle] = useState(course.title || '');
  const [level, setLevel] = useState(course.level || '');
  const [duration, setDuration] = useState(course.duration || '');

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setLevel(course.level || '');
      setDuration(course.duration || '');
    }
  }, [course]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ title, level, duration });
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
          Editar curso
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
              placeholder="Título del curso"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#34495E] mb-1">
              Nivel
            </label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              placeholder="Ej: Principiante, Intermedio, Avanzado"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#34495E] mb-1">
              Duración
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              placeholder="Ej: 4 semanas, 2 meses"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title || !level || !duration}>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};