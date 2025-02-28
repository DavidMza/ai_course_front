export interface WizardStep {
  order: number;
  question: string;
  required: boolean;
  answer: string | null;
}

export interface WizardData {
  id: string;
  language: string;
  steps: WizardStep[];
}