// @module:flashcards @layer:ui @owner:studio
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { isModuleEnabled } from '@/modules/registry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ArrowLeft, Loader2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { getFlashcardSetById, getCardsForSet, FlashcardSet, Flashcard } from '@/modules/flashcards/service/flashcards.service';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';


function StudyMode({ cards }: { cards: Flashcard[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);

    useEffect(() => {
        setShuffledCards([...cards].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [cards]);

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
    };

    const handleShuffle = () => {
        setShuffledCards([...cards].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setIsFlipped(false);
    }
    
    if (shuffledCards.length === 0) {
        return <p className="text-muted-foreground">This set has no cards to study.</p>
    }

    const currentCard = shuffledCards[currentIndex];

    return (
        <div className="space-y-4">
             <div className="relative h-64">
                <div
                    className={cn(
                        "absolute w-full h-full p-6 rounded-lg border flex items-center justify-center text-center transition-transform duration-500 [transform-style:preserve-3d]",
                        isFlipped ? '[transform:rotateY(180deg)]' : ''
                    )}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front of the card */}
                    <div className="absolute w-full h-full flex items-center justify-center bg-card p-6 [backface-visibility:hidden]">
                        <p className="text-xl font-semibold">{currentCard.term}</p>
                    </div>
                    {/* Back of the card */}
                    <div className="absolute w-full h-full flex items-center justify-center bg-card p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <p className="text-lg">{currentCard.definition}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Button variant="outline" size="icon" onClick={handleShuffle} title="Shuffle">
                    <RefreshCw className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={handlePrev}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-muted-foreground">
                        {currentIndex + 1} / {shuffledCards.length}
                    </span>
                    <Button variant="outline" size="icon" onClick={handleNext}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <div className="w-10"></div>
            </div>
        </div>
    );
}


// >>> BEGIN gen:flashcards.detail.ui (layer:ui)
export default function FlashcardSetPage({ params }: { params: { id: string } }) {
    const { toast } = useToast();
    const [set, setSet] = useState<FlashcardSet | null>(null);
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isModuleEnabled('flashcards')) return;

        async function fetchData() {
            try {
                setIsLoading(true);
                const [fetchedSet, fetchedCards] = await Promise.all([
                    getFlashcardSetById(params.id),
                    getCardsForSet(params.id),
                ]);
                setSet(fetchedSet);
                setCards(fetchedCards);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Failed to fetch flashcard set',
                    description: error instanceof Error ? error.message : 'An unknown error occurred',
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [params.id, toast]);
    
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
    <div className="container p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/flashcards">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Flashcard Sets
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-64 w-full" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-48" />
                 <Skeleton className="h-10 w-10" />
            </div>
        </div>
      ) : set ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{set.title}</CardTitle>
            <CardDescription>{set.description || 'No description'}</CardDescription>
          </CardHeader>
          <CardContent>
            <StudyMode cards={cards} />
          </CardContent>
        </Card>
      ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Not Found</AlertTitle>
            <AlertDescription>
              This flashcard set could not be found.
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
// <<< END gen:flashcards.detail.ui
