// @module:classes @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest, logApiResponse } from '@/lib/logging';
import { getClasses as repoGetClasses, createClass as repoCreateClass } from '@/modules/classes/repo/classes.repo';
import { z } from 'zod';

// >>> BEGIN gen:classes.list.api (layer:api)
export async function GET(request: NextRequest) {
  const { requestId, startTime } = logApiRequest(request);
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  
  if (!isModuleEnabled('classes')) {
    const response = { ok: false, error: 'Classes module is disabled', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  try {
    const classes = await repoGetClasses({ page, limit });
    const response = { data: classes, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:classes.list.api

const createClassSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

// >>> BEGIN gen:classes.create.api (layer:api)
export async function POST(request: Request) {
    const { requestId, startTime } = logApiRequest(request);
    if (!isModuleEnabled('classes')) {
        const response = { ok: false, error: 'Classes module is disabled', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }
    
    try {
      const body = await request.json();
      const classData = createClassSchema.parse(body);
      const newClass = await repoCreateClass(classData);
      const response = { data: newClass, rid: requestId };
      logApiResponse(requestId, startTime, request, { status: 201, body: response });
      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
      const response = { ok: false, error: message, rid: requestId };
      logApiResponse(requestId, startTime, request, { status: 400, body: response });
      return NextResponse.json(response, { status: 400 });
    }
}
// <<< END gen:classes.create.api
