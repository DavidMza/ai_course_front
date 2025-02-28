import { WizardData } from '../types/wizard';

export const MOCK_WIZARD_DATA: WizardData = {
  id: 'mock-wizard',
  language: 'es',
  steps: [
    {
      order: 0,
      question: '¿Cuál es el tema principal del curso que quieres crear?',
      required: true,
      answer: null
    },
    {
      order: 1,
      question: '¿Cuál es el nivel del curso? (principiante, intermedio, avanzado)',
      required: true,
      answer: null
    },
    {
      order: 2,
      question: '¿Cuáles son los objetivos de aprendizaje principales?',
      required: true,
      answer: null
    },
    {
      order: 3,
      question: '¿Qué conocimientos previos necesitan los estudiantes?',
      required: false,
      answer: null
    }
  ]
};