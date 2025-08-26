// @module:activity @layer:service @owner:studio

export type ActivityEvent = {
    id: string;
    actorId: string; // The user who performed the action
    action: string; // e.g., "user.create", "assignment.grade"
    entityType: string; // e.g., "user", "assignment", "submission"
    entityId: string;
    timestamp: Date;
    details?: Record<string, any>; // Optional extra data
};
