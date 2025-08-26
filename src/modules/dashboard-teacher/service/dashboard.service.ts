// @module:dashboard-teacher @layer:service @owner:studio
'use client'

import { isModuleEnabled } from '@/modules/registry';
import { getAssignmentsForClass } from '@/modules/assignments/service/assignments.service';
import { getUngradedSubmissions } from '@/modules/submissions-grading/service/submissions.service';
import { getMaterials } from '@/modules/materials/service/materials.service';
import { getActivity } from '@/modules/activity/service/activity.service';

import type { Assignment } from '@/modules/assignments/service/assignments.types';
import type { Submission } from '@/modules/submissions-grading/service/submissions.types';
import type { Material } from '@/modules/materials/service/materials.types';
import type { ActivityEvent } from '@/modules/activity/service/activity.types';


export type TeacherDashboardData = {
    assignments?: Assignment[];
    submissions?: Submission[];
    materials?: Material[];
    activity?: ActivityEvent[];
}

// >>> BEGIN gen:dashboard.teacher.aggregate (layer:service)
export async function getTeacherDashboardData(): Promise<TeacherDashboardData> {
    const data: TeacherDashboardData = {};
    const pagination = { limit: 5 };

    if (isModuleEnabled('assignments')) {
        // In a real app, we'd get the teacher's classId from the session
        const assignmentsResponse = await getAssignmentsForClass('class-1', pagination); 
        data.assignments = assignmentsResponse.items;
    }
    if (isModuleEnabled('submissions-grading')) {
        const submissionsResponse = await getUngradedSubmissions({}, pagination);
        data.submissions = submissionsResponse.items;
    }
    if (isModuleEnabled('materials')) {
        const materialsResponse = await getMaterials(pagination);
        data.materials = materialsResponse.data;
    }
    if (isModuleEnabled('activity')) {
        const activityResponse = await getActivity({}, pagination);
        data.activity = activityResponse.items;
    }

    return data;
}
// <<< END gen:dashboard.teacher.aggregate
