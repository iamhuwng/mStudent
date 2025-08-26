// @module:materials @layer:ui @owner:studio
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// >>> BEGIN gen:materials.list (layer:ui)
export function MaterialsList() {

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
            <TableRow>
                <TableCell className="font-medium">Material Stub</TableCell>
                <TableCell>Document</TableCell>
                <TableCell><Badge variant="outline">Stub</Badge></TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/materials/material-1`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Material</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
// <<< END gen:materials.list
