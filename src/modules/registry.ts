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
    id: 'assignments',
    title: 'Assignments',
    enabled: false,
    path: '/assignments',
  },
    {
    id: 'submissions-grading',
    title: 'Submissions',
    enabled: false,
    path: '/submissions',
  },
    {
    id: 'activity',
    title: 'Activity',
    enabled: false,
    path: '/activity',
  },
  {
    id: 'auth-session',
    title: 'Login',
    enabled: true,
    path: '/login',
  },
];

export function isModuleEnabled(id: string): boolean {
  const module = modules.find((m) => m.id === id);
  return module?.enabled ?? false;
}
// <<< END gen:core.registry.read
