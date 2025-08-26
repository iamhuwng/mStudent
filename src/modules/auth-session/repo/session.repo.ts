// @module:auth-session @layer:repo @owner:studio
import 'server-only';

// >>> BEGIN gen:auth-session.repo-login (layer:repo)
/**
 * A placeholder for real login logic. In a real app, this would
 * validate credentials against a database (e.g., Firestore).
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves with a success message or rejects with an error.
 */
export async function login(email: string, password: string) {
  console.log(`Repo: Attempting login for ${email}`);

  // Stub validation
  if (password === 'password123' && email.includes('@')) {
    return {
      success: true,
      user: {
        email,
        name: 'Test User',
        // In a real app, include roles/claims here
        roles: ['student'],
      },
    };
  } else {
    throw new Error('Invalid email or password');
  }
}
// <<< END gen:auth-session.repo-login
