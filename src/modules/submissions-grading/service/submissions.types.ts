// @module:submissions-grading @layer:service @owner:studio

export type Grade = {
    score: number;
    total: number;
    comment: string;
    gradedBy: string; // userId of teacher
    gradedAt: Date;
}

export type Submission = {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: Date;
    content: string; // For now, a stub. Could be JSON, a file path, etc.
    grade?: Grade;
};
