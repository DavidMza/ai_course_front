# Curso Generator App

Una aplicación web para generar y gestionar cursos educativos utilizando IA.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Un editor de código (recomendado: VS Code)

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd curso-generator
```

2. Instala las dependencias:
```bash
npm install
```

## Configuración del Entorno

1. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=https://courses-ai-api-472395568495.southamerica-west1.run.app
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes React reutilizables
├── pages/         # Páginas/rutas de la aplicación
├── services/      # Servicios para llamadas a la API
├── store/         # Estado global usando Zustand
├── types/         # Definiciones de tipos TypeScript
└── utils/         # Utilidades y helpers
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Desarrollo Local

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:5173`

## Características Principales

- **Autenticación**: Sistema de login y registro
- **Generación de Cursos**: Creación de cursos usando IA
- **Editor de Cursos**: Interfaz para editar módulos y submódulos
- **Vista Pública**: Explorador de cursos públicos
- **Modo Oscuro**: Soporte para tema claro/oscuro

## Guía de Uso

### Crear un Nuevo Curso

1. Inicia sesión en la aplicación
2. Ve al Dashboard
3. Haz clic en "Crear Curso"
4. Sigue el asistente de creación:
   - Define el tema principal
   - Especifica el nivel
   - Establece los objetivos
   - Revisa y confirma

### Editar un Curso

1. Selecciona un curso del Dashboard
2. Activa el "Modo editor"
3. Puedes:
   - Editar títulos y descripciones
   - Agregar/eliminar módulos
   - Modificar submódulos
   - Reorganizar el contenido

## Solución de Problemas

### Errores Comunes

1. **Error de Conexión API**
   - Verifica tu conexión a internet
   - Confirma que las variables de entorno sean correctas

2. **Problemas de Autenticación**
   - Limpia el caché del navegador
   - Verifica tus credenciales
   - Intenta cerrar sesión y volver a entrar

### Contacto y Soporte

Para reportar problemas o sugerir mejoras:
1. Abre un issue en el repositorio
2. Describe detalladamente el problema
3. Incluye capturas de pantalla si es posible

## Contribuir

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-caracteristica`
3. Commit tus cambios: `git commit -m 'Agrega nueva característica'`
4. Push a la rama: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.