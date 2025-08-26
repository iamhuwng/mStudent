// @module:classes @layer:ui @owner:studio
'use client';

import { useEffect, useState } from 'react';
import { getClassById, getClassMembers } from '../service/classes.service';
import type { Class, ClassMember } from '../service/classes.types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Users, User, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type ClassDetailProps = {
  id: string;
};

// >>> BEGIN gen:classes.detail (layer:ui)
export function ClassDetail({ id }: ClassDetailProps) {
  const [cls, setCls] = useState<Class | null>(null);
  const [members, setMembers] = useState<ClassMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchClassDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const [fetchedClass, fetchedMembers] = await Promise.all([
            getClassById(id),
            getClassMembers(id)
        ]);
        setCls(fetchedClass);
        setMembers(fetchedMembers);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(message);
        toast({
          variant: 'destructive',
          title: 'Failed to fetch class details',
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchClassDetails();
  }, [id, toast]);
  
  const teachers = members.filter(m => m.role === 'teacher');
  const students = members.filter(m => m.role === 'student');

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/5" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  if (!cls) {
    return <p>Class not found.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{cls.name}</CardTitle>
                <CardDescription>{cls.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for class content/materials */}
                <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Class Content Area</p>
                </div>
              </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Teachers
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {teachers.length > 0 ? (
                        <ul className="space-y-3">
                            {teachers.map(member => (
                                <li key={member.userId} className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://picsum.photos/seed/${member.userId}/64`} data-ai-hint="profile picture" />
                                        <AvatarFallback>{member.user?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{member.user?.name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (<p className="text-sm text-muted-foreground">No teachers assigned.</p>)}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Students
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     {students.length > 0 ? (
                        <ul className="space-y-3">
                            {students.map(member => (
                                <li key={member.userId} className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://picsum.photos/seed/${member.userId}/64`} data-ai-hint="profile picture" />
                                        <AvatarFallback>{member.user?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{member.user?.name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (<p className="text-sm text-muted-foreground">No students assigned.</p>)}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
// <<< END gen:classes.detail
