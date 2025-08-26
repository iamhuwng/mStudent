// @module:materials @layer:ui @owner:studio
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MaterialPreview } from './material-preview';
import type { Material } from '../service/materials.types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { isModuleEnabled } from '@/modules/registry';

type MaterialDetailProps = {
  id: string;
};

// >>> BEGIN gen:materials.detail (layer:ui)
export function MaterialDetail({ id }: MaterialDetailProps) {
    const material: Material = {
        id,
        name: 'Stub Material Name',
        format: 'ielts-reading',
        tags: ['stub', 'placeholder'],
        content: 'This is some stub content for the material preview.'
    }

    const canEditIelts = isModuleEnabled('editor-ielts-reading') && material.format === 'ielts-reading';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-2xl font-headline">{material.name}</CardTitle>
                <CardDescription className="capitalize">{material.format}</CardDescription>
            </div>
            {canEditIelts && (
                <Button asChild variant="outline">
                    <Link href={`/materials/${id}/edit`}>
                        <PenSquare className="mr-2" />
                        Edit
                    </Link>
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <MaterialPreview material={material} />
      </CardContent>
    </Card>
  );
}
// <<< END gen:materials.detail
