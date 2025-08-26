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
import { computeDeadlines } from '@/modules/deadlines-notifications/service/deadlines.service';
import { Badge } from '@/components/ui/badge';

// >>> BEGIN gen:dashboard.teacher.aggregate.ui (layer:ui)
export function TeacherDashboard() {
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [deadlines, setDeadlines] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const deadlinesEnabled = isModuleEnabled('deadlines-notifications');

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [dashboardData, deadlinesData] = await Promise.all([
            getTeacherDashboardData(),
            deadlinesEnabled ? computeDeadlines() : Promise.resolve(null)
        ]);
        setData(dashboardData);
        setDeadlines(deadlinesData);
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
  }, [toast, deadlinesEnabled]);

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
  
  const hasData = data && Object.values(data).some(value => value && Array.isArray(value.items) && value.items.length > 0);

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
      {isModuleEnabled('assignments') && data?.assignments?.items && data.assignments.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>The latest assignments created.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Showing {data.assignments.items.length} assignments.</p>
            {deadlinesEnabled && deadlines?.overdue?.length > 0 && (
                <p><Badge variant="destructive">{deadlines.overdue.length} overdue</Badge></p>
            )}
          </CardContent>
        </Card>
      )}
      {isModuleEnabled('submissions-grading') && data?.submissions?.items && data.submissions.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ungraded Submissions</CardTitle>
            <CardDescription>Work that needs your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.submissions.items.length} submissions need grading.</p>
          </CardContent>
        </Card>
      )}
      {isModuleEnabled('materials') && data?.materials?.items && data.materials.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Materials</CardTitle>
            <CardDescription>The latest materials available.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Showing last {data.materials.items.length} materials.</p>
            <Button asChild variant="link" className="p-0 mt-2">
                <Link href="/materials">View All</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      {isModuleEnabled('activity') && data?.activity?.items && data.activity.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent system events.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.activity.items.length} recent events.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
// <<< END gen:dashboard.teacher.aggregate.ui