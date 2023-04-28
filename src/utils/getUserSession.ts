import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession, type Session } from 'next-auth';
import { type NextRequest } from 'next/server';

export default async function getUserSession(
  request: NextRequest,
): Promise<Session | null> {
  const req = {
    headers: Object.fromEntries(request.headers),
    cookies: Object.fromEntries(
      request.cookies.getAll().map((c) => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  const session = await getServerSession(req as any, res as any, authOptions);

  console.log('##### get userSession : ' + JSON.stringify(session));

  return session;
}
