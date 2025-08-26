// @module:materials @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest } from '@/lib/logging';
import { getMaterials as repoGetMaterials, createMaterial as repoCreateMaterial } from '@/modules/materials/repo/materials.repo';
import { z } from 'zod';
import { materialSchema } from '@/modules/materials/service/materials.types';

// >>> BEGIN gen:materials.api.list (layer:api)
export async function GET(request: NextRequest) {
  const reqId = logApiRequest(request);
  if (!isModuleEnabled('materials')) {
    return NextResponse.json({ message: 'Materials module is disabled', reqId }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const materials = await repoGetMaterials({ page, limit });
    return NextResponse.json({ data: materials, reqId });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message, reqId }, { status: 500 });
  }
}
// <<< END gen:materials.api.list

// >>> BEGIN gen:materials.api.create (layer:api)
export async function POST(request: Request) {
    const reqId = logApiRequest(request);
    if (!isModuleEnabled('materials')) {
        return NextResponse.json({ message: 'Materials module is disabled', reqId }, { status: 403 });
    }

    try {
      const body = await request.json();
      const materialData = materialSchema.omit({ id: true }).parse(body);
      const newMaterial = await repoCreateMaterial(materialData);
      return NextResponse.json({ data: newMaterial, reqId }, { status: 201 });
    } catch (error) {
      const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
      return NextResponse.json({ message, reqId }, { status: 400 });
    }
}
// <<< END gen:materials.api.create
