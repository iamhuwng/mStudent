// @module:users @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { getUserById as repoGetUserById } from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:users.api-get-user-by-id (layer:api)
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
// <<< END gen:users.api-get-user-by-id
