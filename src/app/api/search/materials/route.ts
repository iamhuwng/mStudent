// @module:tags-search @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import * as repo from '@/modules/tags-search/repo/tags.repo';

// >>> BEGIN gen:search.materialsByTag (layer:api)
export async function GET(request: NextRequest) {
  if (!isModuleEnabled('tags-search')) {
    return NextResponse.json({ message: 'Search module is disabled' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    if (!tag) {
        return NextResponse.json({ message: 'Missing tag parameter' }, { status: 400 });
    }
    const result = await repo.searchMaterialsByTag(tag);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:search.materialsByTag
