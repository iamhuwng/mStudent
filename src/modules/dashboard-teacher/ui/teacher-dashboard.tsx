// @module:dashboard-teacher @layer:ui @owner:studio
'use client'

import { useEffect, useState } from 'react';
import { isModuleEnabled } from '@/modules/registry';
import { getTeacherDashboardData, TeacherDashboardData } from '../service/dashboard.service';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  
  const hasData = data && Object.values(data).some(value => Array.isArray(value) && value.length > 0);

  if (!hasData) {
      return (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Data Yet</AlertTitle>
          <AlertDescription>
            There is no data to display on the dashboard. Try creating some assignments or materials first.
            Make sure the relevant modules are enabled in the registry.
          </AlertDescription>
        </Alert>
      )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isModuleEnabled('assignments') && data?.assignments && data.assignments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>The latest assignments created.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Showing {data.assignments.length} assignments.</p>
            {/* A real UI would list them here */}
          </CardContent>
        </Card>
      )}
      {isModuleEnabled('submissions-grading') && data?.submissions && data.submissions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ungraded Submissions</CardTitle>
            <CardDescription>Work that needs your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.submissions.length} submissions need grading.</p>
            {/* A real UI would list them here */}
          </CardContent>
        </Card>
      )}
      {isModuleEnabled('materials') && data?.materials && data.materials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Materials</CardTitle>
            <CardDescription>The latest materials available.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Showing last {data.materials.length} materials.</p>
            <Button asChild variant="link" className="p-0 mt-2">
                <Link href="/materials">View All</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      {isModuleEnabled('activity') && data?.activity && data.activity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent system events.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.activity.length} recent events.</p>
            {/* A real UI would list them here */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
// <<< END gen:dashboard.teacher.aggregate
