import getCurrentUser from '@/utils/getCurrentUser';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to do that' },
      { status: 401 },
    );
  }

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.json(
      {
        error: 'Missing required fields',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            startDate,
            endDate,
            totalPrice,
            user: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.log('##### reservation error: ', error);
    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      {
        status: 500,
      },
    );
  }
}
