// @module:classes @layer:ui @owner:studio
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ClassDetailProps = {
  id: string;
};

// >>> BEGIN gen:classes.detail (layer:ui)
export function ClassDetail({ id }: ClassDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Detail (Stub)</CardTitle>
        <CardDescription>Showing details for class with ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a placeholder for the detailed view of a class.</p>
        <p>In a real implementation, this component would fetch and display the class name, description, members (teachers and students), and assigned materials.</p>
      </CardContent>
    </Card>
  );
}
// <<< END gen:classes.detail
