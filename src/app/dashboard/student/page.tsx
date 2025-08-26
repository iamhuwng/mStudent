// @module:student-home @layer:ui @owner:studio
import { StudentHome } from '@/modules/student-home/ui/student-home';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default async function StudentHomePage() {
  // In a real app, the user would be determined from the session
  const studentId = 'user-student-1';
  
  if (!isModuleEnabled('student-home')) {
    return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The student home module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline">My Dashboard</h1>
        <p className="text-muted-foreground">
          Your assignments, classes, and progress.
        </p>
      </div>
      <StudentHome studentId={studentId} />
    </div>
  );
}
