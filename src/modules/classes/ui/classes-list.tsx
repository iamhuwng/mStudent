// @module:classes @layer:ui @owner:studio
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// >>> BEGIN gen:classes.list (layer:ui)
export function ClassesList() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell className="font-medium">Class Name Stub</TableCell>
                <TableCell>Class Description Stub</TableCell>
                <TableCell className="text-right">...</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
// <<< END gen:classes.list
