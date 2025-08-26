// @module:flashcards @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest, logApiResponse } from '@/lib/logging';
import { getFlashcardSetById } from '@/modules/flashcards/repo/flashcards.repo';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';

// >>> BEGIN gen:flashcards.set.get (layer:api)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const setId = params.id;
    const set = await getFlashcardSetById(setId);

    if (!set) {
      const response = { ok: false, error: 'Set not found', rid: requestId };
      logApiResponse(requestId, startTime, request, { status: 404, body: response });
      return NextResponse.json(response, { status: 404 });
    }

    if (set.ownerId !== session.user.id) {
        const response = { ok: false, error: 'Forbidden', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }
    
    const response = { data: set, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:flashcards.set.get
