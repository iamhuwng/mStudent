// @module:flashcards @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest, logApiResponse } from '@/lib/logging';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { getFlashcardSets, createFlashcardSet } from '@/modules/flashcards/repo/flashcards.repo';
import { flashcardSetSchema } from '@/modules/flashcards/service/flashcards.types';


// >>> BEGIN gen:flashcards.set.list (layer:api)
export async function GET(request: NextRequest) {
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
    const sets = await getFlashcardSets(session.user.id);
    const response = { data: sets, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:flashcards.set.list

const createSetSchema = flashcardSetSchema.omit({ id: true, createdAt: true });

// >>> BEGIN gen:flashcards.set.create (layer:api)
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
    const setData = createSetSchema.parse(body);
    
    if (setData.ownerId !== session.user.id) {
        const response = { ok: false, error: 'Cannot create set for another user', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }

    const newSet = await createFlashcardSet(setData);
    const response = { data: newSet, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 201, body: response });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 400, body: response });
    return NextResponse.json(response, { status: 400 });
  }
}
// <<< END gen:flashcards.set.create
