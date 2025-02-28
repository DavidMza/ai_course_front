import React from 'react';
import { Button } from '../common/Button';

interface WizardNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  loading: boolean;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  onPrevious,
  onNext,
  onSubmit,
  isFirstStep,
  isLastStep,
  loading,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || loading}
      >
        Anterior
      </Button>
      <Button
        onClick={isLastStep ? onSubmit : onNext}
        disabled={loading}
      >
        {isLastStep ? 'Generar Curso' : 'Siguiente'}
      </Button>
    </div>
  );
};