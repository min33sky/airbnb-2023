import { prisma } from '@/lib/prismaDB';

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings({
  bathroomCount,
  category,
  endDate,
  guestCount,
  locationValue,
  roomCount,
  startDate,
  userId,
}: IListingsParams) {
  try {
    let query: any = {};

    if (userId) {
      query = {
        ...query,
        userId,
      };
    }

    if (category) {
      query = {
        ...query,
        category,
      };
    }

    if (guestCount) {
      query = {
        ...query,
        guestCount: {
          gte: +guestCount, //? url에서 받아오는 값은 string이므로 number로 변환
        },
      };
    }

    if (roomCount) {
      query = {
        ...query,
        roomCount: {
          gte: +roomCount,
        },
      };
    }

    if (bathroomCount) {
      query = {
        ...query,
        bathroomCount: {
          gte: +bathroomCount,
        },
      };
    }

    if (locationValue) {
      query = {
        ...query,
        locationValue,
      };
    }

    if (startDate && endDate) {
      query = {
        ...query,
        NOT: {
          reservations: {
            some: {
              OR: [
                {
                  startDate: { lte: startDate },
                  endDate: { gte: startDate },
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate },
                },
              ],
            },
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.log('##### getListings error: ', error);
    throw new Error(error);
  }
}
