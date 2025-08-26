// @module:activity @layer:service @owner:studio
import type { Page as CorePage } from '@/lib/types/pagination';

// >>> BEGIN gen:core.types.pagination (layer:service)
/** @deprecated use Page from @/lib/types/pagination directly */
export type PaginatedResponse<T> = CorePage<T>;
// <<< END gen:core.types.pagination

export type ActivityEvent = {
    id: string;
    actorId: string; // The user who performed the action
    action: string; // e.g., "user.create", "assignment.grade"
    entityType: string; // e.g., "user", "assignment", "submission"
    entityId: string;
    timestamp: Date;
    details?: Record<string, any>; // Optional extra data
};
