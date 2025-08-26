// @module:classes @layer:service @owner:studio

import type { User } from '@/modules/users/service/users.types';

export type Class = {
  id: string;
  name: string;
  description: string;
};

export type ClassMember = {
  userId: string;
  classId: string;
  role: 'teacher' | 'student';
  startDate?: Date;
  endDate?: Date;
  // This will be populated after fetching from the db
  user?: User;
};
