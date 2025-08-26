// @module:materials @layer:ui @owner:studio
'use client';

import { useEffect, useState } from 'react';
import { getMaterialById } from '../service/materials.service';
import type { Material } from '../service/materials.types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MaterialPreview } from './material-preview';

type MaterialDetailProps = {
  id: string;
};

// >>> BEGIN gen:materials.detail (layer:ui)
export function MaterialDetail({ id }: MaterialDetailProps) {
  const [material, setMaterial] = useState<Material | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchMaterial() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedMaterial = await getMaterialById(id);
        setMaterial(fetchedMaterial);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(message);
        toast({
          variant: 'destructive',
          title: 'Failed to fetch material details',
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchMaterial();
  }, [id, toast]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-3/5 mb-2" />
            <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-10 w-32 ml-auto" />
            </div>
        </CardContent>
      </Card>
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

  if (!material) {
    return <p>Material not found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{material.name}</CardTitle>
        <CardDescription className="capitalize">{material.format}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {material.timeLimit && (
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{material.timeLimit} minutes</span>
                </div>
            )}
            {material.tags?.length > 0 && (
                 <div className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4" />
                    <div className="flex gap-1">
                        {material.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                </div>
            )}
        </div>
        <MaterialPreview material={material} />
      </CardContent>
    </Card>
  );
}
// <<< END gen:materials.detail
