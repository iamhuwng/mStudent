// @module:users @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { 
    getUsers as repoGetUsers,
    createUser as repoCreateUser
} from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';

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
        const newUser = await repoCreateUser(body);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:users.api.create
