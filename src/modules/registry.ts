// @module:platform-core @layer:service @owner:studio

// >>> BEGIN gen:core.registry.read (layer:service)
export type Module = {
  id: string;
  title: string;
  enabled: boolean;
  path: string;
  inNav: boolean; // Whether to show in the main navigation
};

export const modules: Module[] = [
  {
    id: 'home',
    title: 'Home',
    enabled: true,
    path: '/',
    inNav: true,
  },
  {
    id: 'dashboard-teacher',
    title: 'Dashboard',
    enabled: true,
    path: '/dashboard/teacher',
    inNav: true,
  },
  {
    id: 'users',
    title: 'Users',
    enabled: true,
    path: '/users',
    inNav: true,
  },
  {
    id: 'classes',
    title: 'Classes',
    enabled: true,
    path: '/classes',
    inNav: true,
  },
  {
    id: 'materials',
    title: 'Materials',
    enabled: true,
    path: '/materials',
    inNav: true,
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    enabled: true,
    path: '/flashcards',
    inNav: true,
  },
  {
    id: 'assignments',
    title: 'Assignments',
    enabled: true,
    path: '/assignments',
    inNav: false,
  },
  {
    id: 'submissions-grading',
    title: 'Submissions',
    enabled: true,
    path: '/submissions',
    inNav: false,
  },
  {
    id: 'activity',
    title: 'Activity Log',
    enabled: true,
    path: '/activity',
    inNav: false,
  },
  {
    id: 'student-home',
    title: 'Student Dashboard',
    enabled: true,
    path: '/dashboard/student',
    inNav: false,
  },
  {
    id: 'auth-session',
    title: 'Login',
    enabled: true,
    path: '/login',
    inNav: false, // Usually not in the main nav after login
  },
   {
    id: 'deadlines-notifications',
    title: 'Deadlines',
    enabled: true,
    path: '/deadlines',
    inNav: false,
  },
  {
    id: 'editor-ielts-reading',
    title: 'IELTS Editor',
    enabled: true,
    path: '/editor-ielts-reading',
    inNav: false,
  },
  {
    id: 'tags-search',
    title: 'Tags & Search',
    enabled: true,
    path: '/tags-search',
    inNav: false,
  },
];

export function isModuleEnabled(id: string): boolean {
  const module = modules.find((m) => m.id === id);
  return module?.enabled ?? false;
}
// <<< END gen:core.registry.read
