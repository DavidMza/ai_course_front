import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';

interface CreateSubmoduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (feedback: string) => void;
}

export const CreateSubmoduleModal: React.FC<CreateSubmoduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(feedback);
    setFeedback('');
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

        <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Crear nuevo submódulo</h2>
        
        <p className="text-[#34495E] mb-6">
          Describe el submódulo que deseas crear. Puedes incluir detalles sobre el contenido
          y cualquier otra especificación relevante.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              placeholder="Ejemplo: Me gustaría agregar un submódulo sobre herramientas útiles para community managers..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!feedback.trim()}>
              Crear submódulo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};