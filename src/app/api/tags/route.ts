// @module:tags-search @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import * as repo from '@/modules/tags-search/repo/tags.repo';

// >>> BEGIN gen:tags.create (layer:api)
export async function POST(request: Request) {
  if (!isModuleEnabled('tags-search')) {
    return NextResponse.json({ message: 'Tags module is disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = await repo.createTag(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:tags.create
