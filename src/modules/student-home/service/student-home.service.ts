// @module:student-home @layer:service @owner:studio
'use client'

import { isModuleEnabled } from '@/modules/registry';
import { getUserById } from '@/modules/users/service/users.service';
import { getAssignmentsForStudent } from '@/modules/assignments/service/assignments.service';
import { getClasses } from '@/modules/classes/service/classes.service';
// Note: We don't import submissions service here, as it's more complex to get student-specific submissions yet

import type { User } from '@/modules/users/service/users.types';
import type { Assignment } from '@/modules/assignments/service/assignments.types';
import type { Class } from '@/modules/classes/service/classes.types';

export type StudentHomeData = {
    user?: User;
    assignments?: Assignment[];
    classes?: Class[];
}

// >>> BEGIN gen:student.home.aggregate (layer:service)
export async function getStudentHomeData(studentId: string): Promise<StudentHomeData> {
    const data: StudentHomeData = {};
    const pagination = { limit: 5 };

    if (isModuleEnabled('users')) {
        data.user = await getUserById(studentId);
    }
    if (isModuleEnabled('assignments')) {
        const assignmentResponse = await getAssignmentsForStudent(studentId, pagination);
        data.assignments = assignmentResponse.items;
    }
    if (isModuleEnabled('classes')) {
        // This is a simplification; in a real app, we'd get only the classes the student is in.
        const classResponse = await getClasses(pagination);
        data.classes = classResponse.data;
    }
    
    return data;
}
// <<< END gen:student.home.aggregate
