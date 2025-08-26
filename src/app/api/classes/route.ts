// @module:classes @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    getClasses as repoGetClasses,
    createClass as repoCreateClass
} from '@/modules/classes/repo/classes.repo';

// >>> BEGIN gen:classes.list.api (layer:api)
export async function GET() {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }

  try {
    const classes = await repoGetClasses();
    return NextResponse.json(classes);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:classes.list.api

// >>> BEGIN gen:classes.create.api (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('classes')) {
        return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const newClass = await repoCreateClass(body);
        return NextResponse.json(newClass, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:classes.create.api
