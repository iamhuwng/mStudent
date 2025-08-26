// @module:flashcards @layer:ui @owner:studio
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// >>> BEGIN gen:flashcards.detail.ui (layer:ui)
export default function FlashcardSetPage({ params }: { params: { id: string } }) {
    if (!isModuleEnabled('flashcards')) {
    return (
        <div className="container p-4 md:p-8">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Module Disabled</AlertTitle>
                <AlertDescription>
                    The flashcards module is currently disabled by the administrator.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container p-4 md:p-8">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/flashcards">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Flashcard Sets
          </Link>
        </Button>
      </div>
      <Card>
      <CardHeader>
        <CardTitle>Flashcard Set (Stub)</CardTitle>
        <CardDescription>Showing flashcards for set with ID: {params.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a placeholder for viewing and studying a flashcard set.</p>
        <p>In a real implementation, this component would fetch the cards in this set and provide study modes like "Flip" and "Test".</p>
      </CardContent>
    </Card>
    </div>
  );
}
// <<< END gen:flashcards.detail.ui
