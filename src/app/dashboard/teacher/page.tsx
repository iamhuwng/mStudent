// @module:dashboard-teacher @layer:ui @owner:studio
import { TeacherDashboard } from '@/modules/dashboard-teacher/ui/teacher-dashboard';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function TeacherDashboardPage() {
    if (!isModuleEnabled('dashboard-teacher')) {
    return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The teacher dashboard module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Your command center for managing classes and students.
        </p>
      </div>
      <TeacherDashboard />
    </div>
  );
}
