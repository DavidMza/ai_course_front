import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface TextAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
}

export const TextAreaModal: React.FC<TextAreaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  placeholder = 'Escribe aquí...'
}) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl m-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-[#2C3E50] mb-2">{title}</h2>
        <p className="text-[#34495E] mb-4">{description}</p>

        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent mb-6"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={() => onConfirm(text)} disabled={!text.trim()}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};