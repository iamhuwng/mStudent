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
import { Page } from '@/lib/types/pagination';

export type StudentHomeData = {
    user?: User;
    assignments?: Page<Assignment>;
    classes?: Page<Class>;
}

// >>> BEGIN gen:student.home.aggregate (layer:service)
export async function getStudentHomeData(studentId: string): Promise<StudentHomeData> {
    const data: StudentHomeData = {};
    const pagination = { limit: 5 };

    const promises = [];

    if (isModuleEnabled('users')) {
        promises.push(getUserById(studentId).then(res => { data.user = res }));
    }
    if (isModuleEnabled('assignments')) {
        promises.push(getAssignmentsForStudent(studentId, pagination).then(res => { data.assignments = res }));
    }
    if (isModuleEnabled('classes')) {
        // This is a simplification; in a real app, we'd get only the classes the student is in.
        promises.push(getClasses({ page: 1, limit: 5 }).then(res => { data.classes = res }));
    }
    
    await Promise.all(promises);
    
    return data;
}
// <<< END gen:student.home.aggregate
