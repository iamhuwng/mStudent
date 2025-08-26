// @module:materials @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest, logApiResponse } from '@/lib/logging';
import { getMaterials as repoGetMaterials, createMaterial as repoCreateMaterial } from '@/modules/materials/repo/materials.repo';
import { z } from 'zod';
import { materialSchema } from '@/modules/materials/service/materials.types';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';

// >>> BEGIN gen:materials.api.list (layer:api)
export async function GET(request: NextRequest) {
  const { requestId, startTime } = logApiRequest(request);
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn || !['admin', 'teacher'].includes(session.user.role)) {
    const response = { ok: false, error: 'Forbidden', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  if (!isModuleEnabled('materials')) {
    const response = { ok: false, error: 'Materials module is disabled', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const materials = await repoGetMaterials({ page, limit });
    const response = { data: materials, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:materials.api.list

// >>> BEGIN gen:materials.api.create (layer:api)
export async function POST(request: Request) {
    const { requestId, startTime } = logApiRequest(request);
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn || !['admin', 'teacher'].includes(session.user.role)) {
        const response = { ok: false, error: 'Forbidden', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }

    if (!isModuleEnabled('materials')) {
        const response = { ok: false, error: 'Materials module is disabled', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }

    try {
      const body = await request.json();
      const materialData = materialSchema.omit({ id: true }).parse(body);
      const newMaterial = await repoCreateMaterial(materialData);
      const response = { data: newMaterial, rid: requestId };
      logApiResponse(requestId, startTime, request, { status: 201, body: response });
      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
      const response = { ok: false, error: message, rid: requestId };
      logApiResponse(requestId, startTime, request, { status: 400, body: response });
      return NextResponse.json(response, { status: 400 });
    }
}
// <<< END gen:materials.api.create
