import { prisma } from '@/lib/prismaDB';

export default async function getListingsIds() {
  try {
    const listingsIds = await prisma.listing.findMany({
      select: {
        id: true,
      },
    });

    return listingsIds;
  } catch (error: any) {
    console.log('##### getListingsIds error: ', error);
    throw new Error(error);
  }
}
