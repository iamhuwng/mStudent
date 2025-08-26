// @module:activity @layer:service @owner:studio

// >>> BEGIN gen:core.types.pagination (layer:service)
export type PaginatedResponse<T> = {
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
};
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
