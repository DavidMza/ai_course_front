import { Course } from '../types/course';

export const MOCK_COURSES: Course[] = [
  {
    id: "demo-course-1",
    title: "Introducción al Desarrollo Web",
    description: "Aprende los fundamentos del desarrollo web moderno",
    user_id: "demo",
    level: "principiante",
    language: "es",
    duration: "4 semanas",
    modules: [
      {
        id: "module-1",
        title: "HTML y CSS Básico",
        description: "Fundamentos de HTML5 y CSS3",
        order: 0,
        duration: "1 semana",
        submodules: [
          {
            id: "submodule-1",
            title: "Introducción a HTML",
            description: "Estructura básica y elementos HTML",
            order: 0,
            duration: "2 horas",
            completed: false
          },
          {
            id: "submodule-2",
            title: "Estilos con CSS",
            description: "Selectores y propiedades CSS",
            order: 1,
            duration: "2 horas",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "demo-course-2",
    title: "JavaScript Moderno",
    description: "Domina JavaScript ES6+ y sus características modernas",
    user_id: "demo",
    level: "intermedio",
    language: "es",
    duration: "6 semanas",
    modules: [
      {
        id: "module-1",
        title: "Fundamentos de ES6+",
        description: "Características modernas de JavaScript",
        order: 0,
        duration: "2 semanas",
        submodules: [
          {
            id: "submodule-1",
            title: "Arrow Functions",
            description: "Funciones flecha y su contexto",
            order: 0,
            duration: "1 hora",
            completed: false
          }
        ]
      }
    ]
  }
];