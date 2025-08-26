// @module:assignments @layer:service @owner:studio

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
