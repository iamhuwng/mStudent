// @module:classes @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { logApiRequest } from '@/lib/logging';
import { getClasses as repoGetClasses, createClass as repoCreateClass } from '@/modules/classes/repo/classes.repo';
import { z } from 'zod';

// >>> BEGIN gen:classes.list.api (layer:api)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const reqId = logApiRequest(request);
  
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled', reqId }, { status: 403 });
  }

  try {
    const classes = await repoGetClasses({ page, limit });
    return NextResponse.json({ data: classes, reqId });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message, reqId }, { status: 500 });
  }
}
// <<< END gen:classes.list.api

const createClassSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

// >>> BEGIN gen:classes.create.api (layer:api)
export async function POST(request: Request) {
    const reqId = logApiRequest(request);
    if (!isModuleEnabled('classes')) {
        return NextResponse.json({ message: 'Classes module is disabled', reqId }, { status: 403 });
    }
    
    try {
      const body = await request.json();
      const classData = createClassSchema.parse(body);
      const newClass = await repoCreateClass(classData);
      return NextResponse.json({ data: newClass, reqId }, { status: 201 });
    } catch (error) {
      const message = error instanceof z.ZodError ? error.errors : (error instanceof Error ? error.message : 'An unknown error occurred');
      return NextResponse.json({ message, reqId }, { status: 400 });
    }
}
// <<< END gen:classes.create.api
