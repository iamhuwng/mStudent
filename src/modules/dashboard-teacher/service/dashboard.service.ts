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
import { Page } from '@/lib/types/pagination';


export type TeacherDashboardData = {
    assignments?: Page<Assignment>;
    submissions?: Page<Submission>;
    materials?: Page<Material>;
    activity?: Page<ActivityEvent>;
}

// >>> BEGIN gen:dashboard.teacher.aggregate (layer:service)
export async function getTeacherDashboardData(): Promise<TeacherDashboardData> {
    const data: TeacherDashboardData = {};
    const pagination = { limit: 5 };

    const promises = [];

    if (isModuleEnabled('assignments')) {
        // In a real app, we'd get the teacher's classId from the session
        promises.push(getAssignmentsForClass('class-1', pagination).then(res => { data.assignments = res }));
    }
    if (isModuleEnabled('submissions-grading')) {
        promises.push(getUngradedSubmissions({}, pagination).then(res => { data.submissions = res }));
    }
    if (isModuleEnabled('materials')) {
        promises.push(getMaterials({ page: 1, limit: 5 }).then(res => { data.materials = res }));
    }
    if (isModuleEnabled('activity')) {
        promises.push(getActivity({}, pagination).then(res => { data.activity = res }));
    }

    await Promise.all(promises);

    return data;
}
// <<< END gen:dashboard.teacher.aggregate
