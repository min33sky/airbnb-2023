import { prisma } from '@/lib/prismaDB';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import getUserSession from './getUserSession';

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

/**
 * 현재 로그인한 사용자 정보를 반환하는 함수
 */
export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    console.log('########### getCurrentUser session: ', session);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.log('##### getCurrentUser error: ', error);
    return null;
  }
}
