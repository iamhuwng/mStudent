// @module:platform-core @layer:service @owner:studio

// >>> BEGIN gen:core.registry.read (layer:service)
export type Module = {
  id: string;
  title: string;
  enabled: boolean;
  path: string;
};

export const modules: Module[] = [
  {
    id: 'users',
    title: 'Users',
    enabled: true,
    path: '/users',
  },
  {
    id: 'classes',
    title: 'Classes',
    enabled: true,
    path: '/classes',
  },
  {
    id: 'materials',
    title: 'Materials',
    enabled: true,
    path: '/materials',
  },
  {
    id: 'auth-session',
    title: 'Login',
    enabled: true,
    path: '/login',
  },
  // Add other modules here
  // e.g. { id: 'courses', title: 'Courses', enabled: false, path: '/courses' },
];

export function isModuleEnabled(id: string): boolean {
  const module = modules.find((m) => m.id === id);
  return module?.enabled ?? false;
}
// <<< END gen:core.registry.read
