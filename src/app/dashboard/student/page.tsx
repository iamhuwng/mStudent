// @module:student-home @layer:ui @owner:studio
import { StudentHome } from '@/modules/student-home/ui/student-home';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, type SessionData } from '@/modules/auth-session/repo/session.repo';
import { redirect } from 'next/navigation';

export default async function StudentHomePage() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  if (!session.isLoggedIn) {
      redirect('/login');
  }

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
      <StudentHome studentId={session.user.id} />
    </div>
  );
}
