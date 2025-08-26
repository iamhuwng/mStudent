// @module:flashcards @layer:ui @owner:studio
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Eye, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// >>> BEGIN gen:flashcards.list.ui (layer:ui)
export default function FlashcardsPage() {
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

  // Stub data
  const flashcardSets = [
      { id: 'set-1', name: 'Biology 101 - Cell Structure', cardCount: 25, subject: 'Science' },
      { id: 'set-2', name: 'Spanish Vocabulary - Chapter 3', cardCount: 50, subject: 'Languages' },
  ]

  return (
    <div className="container p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold font-headline">Flashcard Sets</h1>
            <p className="text-muted-foreground">
              Create and study sets of flashcards.
            </p>
        </div>
        <Button asChild>
            <Link href="/flashcards/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Set
            </Link>
        </Button>
      </div>

       <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Set Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Cards</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {flashcardSets.map((set) => (
                <TableRow key={set.id}>
                  <TableCell className="font-medium">{set.name}</TableCell>
                  <TableCell><Badge variant="outline">{set.subject}</Badge></TableCell>
                  <TableCell>{set.cardCount}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/flashcards/${set.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Set</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
// <<< END gen:flashcards.list.ui
