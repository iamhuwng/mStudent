// @module:materials @layer:ui @owner:studio
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MaterialPreview } from './material-preview';
import type { Material } from '../service/materials.types';

type MaterialDetailProps = {
  id: string;
};

// >>> BEGIN gen:materials.detail (layer:ui)
export function MaterialDetail({ id }: MaterialDetailProps) {
    const material: Material = {
        id,
        name: 'Stub Material Name',
        format: 'document',
        tags: ['stub', 'placeholder'],
        content: 'This is some stub content for the material preview.'
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{material.name}</CardTitle>
        <CardDescription className="capitalize">{material.format}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <MaterialPreview material={material} />
      </CardContent>
    </Card>
  );
}
// <<< END gen:materials.detail
