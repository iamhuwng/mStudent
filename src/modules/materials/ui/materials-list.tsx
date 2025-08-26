// @module:materials @layer:ui @owner:studio
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Eye, PlusCircle, Trash2 } from 'lucide-react';
import { deleteMaterial, getMaterials } from '../service/materials.service';
import type { Material } from '../service/materials.types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// >>> BEGIN gen:materials.list (layer:ui)
export function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMaterials = async () => {
      try {
        setIsLoading(true);
        const fetchedMaterials = await getMaterials();
        setMaterials(fetchedMaterials);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to fetch materials',
          description: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMaterial(id);
      toast({
        title: 'Material Deleted',
        description: 'The material has been successfully deleted.',
      });
      // Refresh the list after deletion
      await fetchMaterials();
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Failed to delete material',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }

  if (isLoading) {
    return (
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                <TableHead className="text-right"><Skeleton className="h-5 w-16" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  if (materials.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Materials Found</CardTitle>
          <CardDescription>
            There are no materials in the system yet. Get started by creating one.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button asChild>
            <Link href="/materials/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Material
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="border rounded-lg p-4">
       <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Materials</h2>
          <Button asChild>
            <Link href="/materials/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Material
            </Link>
          </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell className="capitalize">{material.format}</TableCell>
                  <TableCell>
                    {material.tags?.map(tag => <Badge key={tag} variant="outline" className="mr-1">{tag}</Badge>)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/materials/${material.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Material</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the material.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(material.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
// <<< END gen:materials.list
