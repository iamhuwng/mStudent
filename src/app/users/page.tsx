// @module:users @layer:ui @owner:studio
import { UsersList } from '@/modules/users/ui/users-list';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function UsersPage() {
    if (!isModuleEnabled('users')) {
    return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The users module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline">Users</h1>
        <p className="text-muted-foreground">
          Browse and manage user profiles in the system.
        </p>
      </div>
      <UsersList />
    </div>
  );
}
