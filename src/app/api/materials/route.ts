// @module:materials @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest, logApiResponse } from '@/lib/logging';
import { getMaterials as repoGetMaterials, createMaterial as repoCreateMaterial } from '@/modules/materials/repo/materials.repo';
import { z } from 'zod';
import { materialSchema } from '@/modules/materials/service/materials.types';

// >>> BEGIN gen:materials.api.list (layer:api)
export async function GET(request: NextRequest) {
  const reqId = logApiRequest(request);
  if (!isModuleEnabled('materials')) {
    const response = { message: 'Materials module is disabled', reqId };
    logApiResponse(reqId, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const materials = await repoGetMaterials({ page, limit });
    const response = { data: materials, reqId };
    logApiResponse(reqId, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { message, reqId };
    logApiResponse(reqId, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:materials.api.list

// >>> BEGIN gen:materials.api.create (layer:api)
export async function POST(request: Request) {
    const reqId = logApiRequest(request);
    if (!isModuleEnabled('materials')) {
        const response = { message: 'Materials module is disabled', reqId };
        logApiResponse(reqId, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }

    try {
      const body = await request.json();
      const materialData = materialSchema.omit({ id: true }).parse(body);
      const newMaterial = await repoCreateMaterial(materialData);
      const response = { data: newMaterial, reqId };
      logApiResponse(reqId, request, { status: 201, body: response });
      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
      const response = { message, reqId };
      logApiResponse(reqId, request, { status: 400, body: response });
      return NextResponse.json(response, { status: 400 });
    }
}
// <<< END gen:materials.api.create
