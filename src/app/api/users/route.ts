// @module:users @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { 
    getUsers as repoGetUsers,
    createUser as repoCreateUser
} from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';
import { userCreateSchema } from '@/modules/users/service/users.types';

// >>> BEGIN gen:users.api.list (layer:api)
export async function GET(request: NextRequest) {
  if (!isModuleEnabled('users')) {
    return NextResponse.json({ message: 'Users module is disabled' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const startAfterDocId = searchParams.get('startAfter') || undefined;

    const { users, hasNextPage } = await repoGetUsers(limit, startAfterDocId);
    
    return NextResponse.json({ users, hasNextPage });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:users.api.list

// >>> BEGIN gen:users.api.create (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('users')) {
        return NextResponse.json({ message: 'Users module is disabled' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const validatedData = userCreateSchema.parse(body);
        const newUser = await repoCreateUser(validatedData);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:users.api.create
