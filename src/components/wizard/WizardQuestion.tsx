import React from 'react';
import { WizardStep } from '../../types/wizard';

interface WizardQuestionProps {
  step: WizardStep;
  onAnswerChange: (answer: string) => void;
}

export const WizardQuestion: React.FC<WizardQuestionProps> = ({
  step,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-[#2C3E50]">{step.question}</h3>
      <textarea
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
        placeholder="Escribe tu respuesta aquí..."
        value={step.answer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
};