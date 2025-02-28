import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, AlertCircle } from 'lucide-react';
import { useWizard } from '../hooks/useWizard';
import { useAuthStore } from '../store/authStore';
import { WizardProgress } from '../components/wizard/WizardProgress';
import { WizardQuestion } from '../components/wizard/WizardQuestion';
import { WizardNavigation } from '../components/wizard/WizardNavigation';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import { Button } from '../components/common/Button';

export const WizardPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    loading,
    error,
    currentStep,
    progress,
    isFirstStep,
    isLastStep,
    fetchQuestions,
    updateAnswer,
    submitAnswers,
    nextStep,
    previousStep,
  } = useWizard();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchQuestions();
  }, [fetchQuestions, isAuthenticated, navigate]);

  const handleSubmit = async () => {
    try {
      const success = await submitAnswers();
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (loading && !currentStep) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-[#3498DB] animate-spin mx-auto mb-4" />
          <p className="text-[#2C3E50]">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-[#2C3E50] mb-6">{error}</p>
          <Button onClick={fetchQuestions}>
            Intentar nuevamente
          </Button>
        </div>
      </div>
    );
  }

  if (!currentStep) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F4F6F7]">
      {loading && <LoadingOverlay />}
      
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Sparkles className="w-12 h-12 text-[#3498DB] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#2C3E50]">
                Creación de Curso
              </h2>
              <p className="text-[#34495E] mt-2">
                Responde algunas preguntas para generar tu curso personalizado
              </p>
            </div>

            <WizardProgress progress={progress} />

            <WizardQuestion
              step={currentStep}
              onAnswerChange={updateAnswer}
            />

            <WizardNavigation
              onPrevious={previousStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};