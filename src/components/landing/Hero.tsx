import React from 'react';
import { Sparkles, BookOpen, Brain } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#F4F6F7] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="h-8 w-8 text-[#1ABC9C]" />
            <h1 className="text-4xl font-bold tracking-tight text-[#2C3E50] sm:text-6xl">
              Genera Cursos con IA en Segundos
            </h1>
          </div>
          <p className="mt-6 text-lg leading-8 text-[#34495E]">
            Transforma tus ideas en cursos completos con la ayuda de la inteligencia artificial.
            Crea contenido educativo de calidad en minutos, no en semanas.
          </p>
        </div>

        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-white p-8 shadow-lg">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <BookOpen className="h-12 w-12 text-[#3498DB] mb-4" />
                <h3 className="text-lg font-semibold text-[#2C3E50]">Generación Rápida</h3>
                <p className="mt-2 text-center text-[#34495E]">
                  Crea cursos completos en minutos con nuestra IA avanzada
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Brain className="h-12 w-12 text-[#3498DB] mb-4" />
                <h3 className="text-lg font-semibold text-[#2C3E50]">Personalización por IA</h3>
                <p className="mt-2 text-center text-[#34495E]">
                  Contenido adaptado a tu audiencia y objetivos específicos
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="h-12 w-12 text-[#3498DB] mb-4" />
                <h3 className="text-lg font-semibold text-[#2C3E50]">Monetización</h3>
                <p className="mt-2 text-center text-[#34495E]">
                  Vende tus cursos directamente en nuestra plataforma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};