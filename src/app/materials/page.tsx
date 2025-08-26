// @module:materials @layer:ui @owner:studio
import { MaterialsList } from '@/modules/materials/ui/materials-list';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function MaterialsPage() {
    if (!isModuleEnabled('materials')) {
    return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The materials module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline">Materials</h1>
        <p className="text-muted-foreground">
          Browse and manage educational materials.
        </p>
      </div>
      <MaterialsList />
    </div>
  );
}
