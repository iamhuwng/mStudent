// @module:assignments @layer:service @owner:studio
import type { Page as CorePage } from '@/lib/types/pagination';

// >>> BEGIN gen:core.types.pagination (layer:service)
/** @deprecated use Page from @/lib/types/pagination directly */
export type PaginatedResponse<T> = CorePage<T>;
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

export type Assignee = {
    id: string;
    name: string;
    type: 'user' | 'class';
    details: string; // e.g. email or class description
};

export type BulkAssignmentPayload = {
    materialId: string;
    assignees: { id: string; type: 'user' | 'class' }[];
    deadline?: Date;
};
