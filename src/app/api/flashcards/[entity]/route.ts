// @module:flashcards @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import * as repo from '@/modules/flashcards/repo/flashcards.repo';

// >>> BEGIN gen:flashcards.api (layer:api)
export async function POST(
  request: Request,
  { params }: { params: { entity: string } }
) {
  if (!isModuleEnabled('flashcards')) {
    return NextResponse.json({ message: 'Flashcards module is disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    let result;
    switch (params.entity) {
        case 'sets':
            result = await repo.createFlashcardSet(body);
            break;
        case 'cards':
            result = await repo.createFlashcard(body);
            break;
        case 'progress':
            await repo.markFlashcardProgress(body);
            return new NextResponse(null, { status: 204 });
        default:
            return NextResponse.json({ message: 'Unknown entity' }, { status: 404 });
    }
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:flashcards.api
