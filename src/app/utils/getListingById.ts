import { prisma } from '@/lib/prismaDB';

export default async function getListingById(listingId: string) {
  // 1. listingId에 맞는 Listing을 DB에서 찾아서 리턴합니다.
  // 2. Date 타입의 createdAt, updatedAt을 string으로 변환합니다.

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error) {
    console.log('##### getListingById Error : ', error);
    throw new Error('Listing 관련 에러가 발생했습니다.');
  }
}
