// @module:flashcards @layer:ui @owner:studio
'use client';
import { useEffect, useState } from 'react';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Eye, PlusCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getFlashcardSets, FlashcardSet } from '@/modules/flashcards/service/flashcards.service';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// >>> BEGIN gen:flashcards.list.ui (layer:ui)
export default function FlashcardsPage() {
    const { toast } = useToast();
    const [sets, setSets] = useState<FlashcardSet[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isModuleEnabled('flashcards')) return;
        
        async function fetchSets() {
            try {
                setIsLoading(true);
                const fetchedSets = await getFlashcardSets();
                setSets(fetchedSets);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Failed to fetch flashcard sets',
                    description: error instanceof Error ? error.message : 'An unknown error occurred',
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchSets();
    }, [toast]);

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

    if (isLoading) {
        return (
            <div className="container p-4 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-80" />
                    </div>
                    <Skeleton className="h-10 w-36" />
                </div>
                <div className="border rounded-lg p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Skeleton className="h-5 w-48" /></TableHead>
                                <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                                <TableHead className="text-right"><Skeleton className="h-5 w-16" /></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

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

            {sets.length === 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>No sets found</CardTitle>
                        <CardDescription>Get started by creating your first flashcard set.</CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Set Name</TableHead>
                                <TableHead>Cards</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sets.map((set) => (
                                <TableRow key={set.id}>
                                    <TableCell className="font-medium">{set.title}</TableCell>
                                    <TableCell>{/* Card count can be added later */}</TableCell>
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
            )}
        </div>
    );
}
// <<< END gen:flashcards.list.ui
