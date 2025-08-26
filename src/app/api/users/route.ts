// @module:users @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { 
    getUsers as repoGetUsers,
    createUser as repoCreateUser
} from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';
import { z } from 'zod';
import { userSchema } from '@/modules/users/service/users.types';

// >>> BEGIN gen:users.api.list (layer:api)
export async function GET() {
  if (!isModuleEnabled('users')) {
    return NextResponse.json({ message: 'Users module is disabled' }, { status: 403 });
  }

  try {
    const users = await repoGetUsers();
    return NextResponse.json(users);
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
        const userData = userSchema.omit({ id: true, enrolled: true }).parse(body);
        const newUser = await repoCreateUser(userData);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        const message = error instanceof z.ZodError 
            ? error.errors.map(e => e.message).join(', ')
            : error instanceof Error 
            ? error.message 
            : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:users.api.create
