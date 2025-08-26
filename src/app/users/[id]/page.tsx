// @module:users @layer:ui @owner:studio
import { UserDetail } from '@/modules/users/ui/user-detail';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function UserDetailPage({ params }: { params: { id: string } }) {
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
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </Button>
      </div>
      <UserDetail id={params.id} />
    </div>
  );
}
