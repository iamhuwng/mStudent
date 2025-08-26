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
    enabled: true,
    path: '/assignments',
  },
    {
    id: 'submissions-grading',
    title: 'Submissions',
    enabled: true,
    path: '/submissions',
  },
    {
    id: 'activity',
    title: 'Activity',
    enabled: true,
    path: '/activity',
  },
  {
    id: 'auth-session',
    title: 'Login',
    enabled: true,
    path: '/login',
  },
  {
    id: 'dashboard-teacher',
    title: 'Teacher Dashboard',
    enabled: false,
    path: '/dashboard/teacher',
  },
  {
    id: 'student-home',
    title: 'Student Home',
    enabled: false,
    path: '/dashboard/student',
  },
  {
    id: 'editor-ielts-reading',
    title: 'IELTS Editor',
    enabled: false,
    path: '/editor/ielts',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    enabled: false,
    path: '/flashcards',
  },
  {
    id: 'tags-search',
    title: 'Tags',
    enabled: false,
    path: '/tags',
  },
  {
    id: 'deadlines-notifications',
    title: 'Notifications',
    enabled: false,
    path: '/notifications',
  }
];

export function isModuleEnabled(id: string): boolean {
  const module = modules.find((m) => m.id === id);
  return module?.enabled ?? false;
}
// <<< END gen:core.registry.read
