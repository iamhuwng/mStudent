// @module:materials @layer:ui @owner:studio
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMaterials } from '../service/materials.service';
import type { Material } from '../service/materials.types';
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
import { Eye, FileText, Video, ClipboardCheck, Presentation } from 'lucide-react';

const formatIcons = {
    quiz: <ClipboardCheck className="h-4 w-4 text-muted-foreground" />,
    video: <Video className="h-4 w-4 text-muted-foreground" />,
    document: <FileText className="h-4 w-4 text-muted-foreground" />,
    slide: <Presentation className="h-4 w-4 text-muted-foreground" />,
}

// >>> BEGIN gen:materials.list (layer:ui)
export function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchMaterials() {
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
    fetchMaterials();
  }, [toast]);

  return (
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
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-32 rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
              </TableRow>
            ))
          ) : (
            materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {formatIcons[material.format]}
                        <span className="capitalize">{material.format}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex gap-1">
                        {material.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/materials/${material.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Material</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
// <<< END gen:materials.list
