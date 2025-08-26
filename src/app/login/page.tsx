// @module:auth-session @layer:ui @owner:studio
import { LoginForm } from '@/modules/auth-session/ui/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function LoginPage() {
  if (!isModuleEnabled('auth-session')) {
    return (
        <div className="container flex h-[calc(100vh-3.5rem)] items-center justify-center">
            <Alert variant="destructive" className="max-w-md">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The authentication module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container flex h-[calc(100vh-3.5rem)] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
