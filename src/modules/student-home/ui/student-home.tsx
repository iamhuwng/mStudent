// @module:student-home @layer:ui @owner:studio
'use client'

import { useEffect, useState } from 'react';
import { isModuleEnabled } from '@/modules/registry';
import { getStudentHomeData, StudentHomeData } from '../service/student-home.service';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// >>> BEGIN gen:student.home.aggregate (layer:ui)
export function StudentHome({ studentId }: { studentId: string }) {
  const [data, setData] = useState<StudentHomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const studentData = await getStudentHomeData(studentId);
        setData(studentData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(message);
        toast({
          variant: 'destructive',
          title: 'Failed to load student data',
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [studentId, toast]);

  if (isLoading) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isModuleEnabled('users') && data?.user && (
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Welcome, {data.user.name}</CardTitle></CardHeader>
          <CardContent><p>Your student profile details.</p></CardContent>
        </Card>
      )}
      {isModuleEnabled('assignments') && data?.assignments && (
        <Card>
          <CardHeader><CardTitle>My Assignments</CardTitle></CardHeader>
          <CardContent><p>You have {data.assignments.length} assignments.</p></CardContent>
        </Card>
      )}
      {isModuleEnabled('classes') && data?.classes && (
        <Card>
          <CardHeader><CardTitle>My Classes</CardTitle></CardHeader>
          <CardContent><p>You are in {data.classes.length} classes.</p></CardContent>
        </Card>
      )}
    </div>
  );
}
// <<< END gen:student.home.aggregate
