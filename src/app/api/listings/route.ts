import getCurrentUser from '@/utils/getCurrentUser';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to create a listing' },
      { status: 401 },
    );
  }

  const body = await request.json();

  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      return NextResponse.json(
        { error: `Please fill in the ${key} field` },
        { status: 400 },
      );
    }
  });

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  console.log('##### [create listing] body #####', body);

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.log('##### [create listing] error #####', error);

    return NextResponse.json(
      { error: 'Something went wrong, please try again' },
      { status: 500 },
    );
  }
}
