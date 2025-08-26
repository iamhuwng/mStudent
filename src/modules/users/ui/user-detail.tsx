// @module:users @layer:ui @owner:studio
'use client';

import { useEffect, useState } from 'react';
import { getUserById } from '../service/users.service';
import type { User } from '../service/users.types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type UserDetailProps = {
  id: string;
};

// >>> BEGIN gen:users.user-detail (layer:ui)
export function UserDetail({ id }: UserDetailProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedUser = await getUserById(id);
        setUser(fetchedUser);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(message);
        toast({
          variant: 'destructive',
          title: 'Failed to fetch user details',
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [id, toast]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    );
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={`https://picsum.photos/seed/${user.id}/128`} alt={user.name} data-ai-hint="profile picture" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div>
            <span className="font-semibold">Role: </span>
            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
        </div>
        <div>
            <span className="font-semibold">Enrolled Since: </span>
            <span>{new Date(user.enrolled).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
// <<< END gen:users.user-detail
