// @module:dashboard-teacher @layer:ui @owner:studio
'use client'

import { useEffect, useState } from 'react';
import { isModuleEnabled } from '@/modules/registry';
import { getTeacherDashboardData, TeacherDashboardData } from '../service/dashboard.service';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// >>> BEGIN gen:dashboard.teacher.aggregate (layer:ui)
export function TeacherDashboard() {
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const dashboardData = await getTeacherDashboardData();
        setData(dashboardData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(message);
        toast({
          variant: 'destructive',
          title: 'Failed to load dashboard',
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
            <Card><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
            <Card><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
            <Card><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
        </div>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isModuleEnabled('assignments') && data?.assignments && (
        <Card>
          <CardHeader><CardTitle>Recent Assignments</CardTitle></CardHeader>
          <CardContent><p>Showing {data.assignments.length} assignments.</p></CardContent>
        </Card>
      )}
      {isModuleEnabled('submissions-grading') && data?.submissions && (
        <Card>
          <CardHeader><CardTitle>Ungraded Submissions</CardTitle></CardHeader>
          <CardContent><p>{data.submissions.length} submissions need grading.</p></CardContent>
        </Card>
      )}
      {isModuleEnabled('materials') && data?.materials && (
        <Card>
          <CardHeader><CardTitle>Recent Materials</CardTitle></CardHeader>
          <CardContent><p>Showing last {data.materials.length} materials.</p></CardContent>
        </Card>
      )}
      {isModuleEnabled('activity') && data?.activity && (
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent><p>{data.activity.length} recent events.</p></CardContent>
        </Card>
      )}
    </div>
  );
}
// <<< END gen:dashboard.teacher.aggregate
