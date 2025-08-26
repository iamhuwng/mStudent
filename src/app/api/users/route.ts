// @module:users @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { getUsers as repoGetUsers } from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:users.api-get-users (layer:api)
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
// <<< END gen:users.api-get-users
