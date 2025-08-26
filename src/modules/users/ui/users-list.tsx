// @module:users @layer:ui @owner:studio
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getUsers, GetUsersResponse } from '../service/users.service';
import type { User } from '../service/users.types';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Eye, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 5;

// >>> BEGIN gen:users.list (layer:ui)
export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageHistory, setPageHistory] = useState<string[]>([]); // Stores the ID of the first item of each page
  const [hasNextPage, setHasNextPage] = useState(false);
  const { toast } = useToast();

  const fetchUsers = useCallback(async (pageIndex: number) => {
    try {
      setIsLoading(true);
      const startAfter = pageIndex > 0 ? pageHistory[pageIndex] : undefined;
      const response: GetUsersResponse = await getUsers(PAGE_SIZE, startAfter);
      
      setUsers(response.users);
      setHasNextPage(response.hasNextPage);

      if (response.users.length > 0 && pageIndex === pageHistory.length) {
        setPageHistory(prev => [...prev, response.users[0].id]);
      }

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to fetch users',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, pageHistory]);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);
  
  const handleNextPage = () => {
    if (hasNextPage) {
        setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    setPage(prev => Math.max(0, prev - 1));
  };


  return (
    <div className="border rounded-lg">
      <Table>
        {!isLoading && users.length === 0 && (
          <TableCaption>
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <UserPlus className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No Users Found</h3>
              <p className="text-muted-foreground">Get started by creating a new user.</p>
              <Button disabled>Create User</Button>
            </div>
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
              </TableRow>
            ))
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/users/${user.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View User</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
       <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={page === 0 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!hasNextPage || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
// <<< END gen:users.list
