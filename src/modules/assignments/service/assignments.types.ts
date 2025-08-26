// @module:assignments @layer:service @owner:studio
import type { PaginatedResponse as CorePaginatedResponse } from '@/modules/activity/service/activity.types';

// >>> BEGIN gen:core.types.pagination (layer:service)
export type PaginatedResponse<T> = CorePaginatedResponse<T>;
// <<< END gen:core.types.pagination

export type Assignment = {
    id: string;
    materialId: string;
    assignedToId: string; // Can be a userId or a classId
    assignedToType: 'user' | 'class';
    deadline?: Date;
    availabilityStart?: Date;
    availabilityEnd?: Date;
    createdAt: Date;
};
