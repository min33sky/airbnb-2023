import { prisma } from '@/lib/prismaDB';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // 유저가 좋아요한 목록을 가져온다.
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    // Date 타입을 string 타입으로 변환한다. (Date 타입은 JSON으로 변환되지 않는다.)
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    console.log('##### getFavoriteListings error #####');
    throw new Error(error);
  }
}
