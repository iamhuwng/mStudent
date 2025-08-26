// @module:editor-ielts-reading @layer:ui @owner:studio
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ArrowLeft } from 'lucide-react';
import { getMaterialById } from '@/modules/materials/service/materials.service';
import { IeltsEditor } from '@/modules/editor-ielts-reading/ui/ielts-editor';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function MaterialEditPage({ params }: { params: { id: string } }) {
  if (!isModuleEnabled('editor-ielts-reading')) {
    return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The IELTS editor module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  const material = await getMaterialById(params.id);

  if (!material) {
    notFound();
  }

  if (material.format !== 'ielts-reading') {
     return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Invalid Material Format</AlertTitle>
                <AlertDescription>
                    This editor only works for 'ielts-reading' materials.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href={`/materials/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Material
          </Link>
        </Button>
      </div>
      <IeltsEditor material={material} />
    </div>
  );
}
