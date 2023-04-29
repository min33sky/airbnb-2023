import { prisma } from '@/lib/prismaDB';
import getCurrentUser from '@/utils/getCurrentUser';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      listingId: string;
    };
  },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
  }

  const { listingId } = params;

  try {
    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log('##### DELETE Listing Error #####', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
