import { useState, useCallback } from 'react';
import { WizardData, WizardStep } from '../types/wizard';
import { courseService } from '../services/courseService';
import { wizardService } from '../services/wizardService';
import { useAuthStore } from '../store/authStore';

export const useWizard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WizardData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const fetchQuestions = useCallback(async () => {
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para crear un curso');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const wizardData = await wizardService.getWizardQuestions();
      // Ordenar los pasos por el campo order
      wizardData.steps.sort((a, b) => a.order - b.order);
      setData(wizardData);
    } catch (err) {
      setError('Error al cargar las preguntas del wizard');
      console.error('Error fetching wizard questions:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const updateAnswer = useCallback((answer: string) => {
    if (!data) return;

    const updatedSteps = data.steps.map((step, index) => {
      if (index === currentStepIndex) {
        return { ...step, answer };
      }
      return step;
    });

    setData({ ...data, steps: updatedSteps });
  }, [data, currentStepIndex]);

  const submitAnswers = useCallback(async () => {
    if (!data) return false;

    // Verificar que todas las preguntas requeridas tengan respuesta
    const unansweredRequired = data.steps.find(
      step => step.required && !step.answer?.trim()
    );

    if (unansweredRequired) {
      setError('Por favor responde todas las preguntas requeridas');
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      await courseService.createCourse(data);
      return true;
    } catch (err) {
      console.error('Error submitting answers:', err);
      setError('Error al generar el curso');
      return false;
    } finally {
      setLoading(false);
    }
  }, [data]);

  const nextStep = useCallback(() => {
    if (!data) return;
    if (currentStepIndex < data.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [data, currentStepIndex]);

  const previousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  // Calculate derived state
  const currentStep = data?.steps[currentStepIndex] ?? null;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = data ? currentStepIndex === data.steps.length - 1 : false;
  const progress = data ? ((currentStepIndex + 1) / data.steps.length) * 100 : 0;

  return {
    loading,
    error,
    data,
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    progress,
    fetchQuestions,
    updateAnswer,
    submitAnswers,
    nextStep,
    previousStep,
  };
};