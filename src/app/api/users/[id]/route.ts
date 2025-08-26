// @module:users @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { 
    getUserById as repoGetUserById,
    updateUser as repoUpdateUser,
    deleteUser as repoDeleteUser
} from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:users.api.detail (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('users')) {
    return NextResponse.json({ message: 'Users module is disabled' }, { status: 403 });
  }
  
  try {
    const id = params.id;
    const user = await repoGetUserById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:users.api.detail

// >>> BEGIN gen:users.api.update (layer:api)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    if (!isModuleEnabled('users')) {
        return NextResponse.json({ message: 'Users module is disabled' }, { status: 403 });
    }

    try {
        const id = params.id;
        const body = await request.json();
        const updatedUser = await repoUpdateUser(id, body);
        return NextResponse.json(updatedUser);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'User not found') {
            return NextResponse.json({ message }, { status: 404 });
        }
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:users.api.update

// >>> BEGIN gen:users.api.delete (layer:api)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!isModuleEnabled('users')) {
        return NextResponse.json({ message: 'Users module is disabled' }, { status: 403 });
    }

    try {
        const id = params.id;
        await repoDeleteUser(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'User not found') {
            return NextResponse.json({ message }, { status: 404 });
        }
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:users.api.delete
