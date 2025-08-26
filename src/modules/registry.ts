// @module:platform-core @layer:ui @owner:studio
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
