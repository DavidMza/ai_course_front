import React from 'react';
import { Sparkles, Users, GraduationCap } from 'lucide-react';

export const PublicCoursesIntro: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <GraduationCap className="w-8 h-8 text-[#3498DB]" />
        <h2 className="text-2xl font-bold text-[#2C3E50]">Explora Cursos Públicos</h2>
      </div>
      
      <p className="text-[#34495E] mb-6">
        Descubre una amplia variedad de cursos creados por nuestra comunidad. Desde programación hasta marketing digital, 
        encuentra el contenido que mejor se adapte a tus necesidades de aprendizaje.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-[#3498DB]" />
          <span className="text-sm text-[#34495E]">Creados por expertos</span>
        </div>
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#3498DB]" />
          <span className="text-sm text-[#34495E]">Contenido actualizado</span>
        </div>
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-[#3498DB]" />
          <span className="text-sm text-[#34495E]">Aprende a tu ritmo</span>
        </div>
      </div>
    </div>
  );
};