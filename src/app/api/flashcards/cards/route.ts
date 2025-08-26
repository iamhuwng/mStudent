// @module:flashcards @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest, logApiResponse } from '@/lib/logging';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { createFlashcard } from '@/modules/flashcards/repo/flashcards.repo';
import { flashcardSchema } from '@/modules/flashcards/service/flashcards.types';


const createCardSchema = flashcardSchema.omit({ id: true, createdAt: true });

// >>> BEGIN gen:flashcards.card.create (layer:api)
export async function POST(request: Request) {
  const { requestId, startTime } = logApiRequest(request);
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    const response = { ok: false, error: 'Forbidden', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  if (!isModuleEnabled('flashcards')) {
    const response = { ok: false, error: 'Flashcards module is disabled', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  try {
    const body = await request.json();
    const cardData = createCardSchema.parse(body);
    
    // In a real app, you would also verify that the session.user.id
    // owns the flashcard set (setId) before allowing card creation.
    
    const newCard = await createFlashcard(cardData);
    const response = { data: newCard, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 201, body: response });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 400, body: response });
    return NextResponse.json(response, { status: 400 });
  }
}
// <<< END gen:flashcards.card.create
