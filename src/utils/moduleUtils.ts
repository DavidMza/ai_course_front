import { Module } from '../types/course';

export const hasUnreadContent = (module: Module): boolean => {
  return module.submodules.some(submodule => !submodule.completed);
};

export const getInitialExpandedModules = (modules: Module[] = []): Set<string> => {
  return new Set(
    modules
      .filter(module => hasUnreadContent(module))
      .map(module => module.id)
  );
};