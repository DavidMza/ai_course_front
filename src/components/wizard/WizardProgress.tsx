import React from 'react';

interface WizardProgressProps {
  progress: number;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-[#3498DB] h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};