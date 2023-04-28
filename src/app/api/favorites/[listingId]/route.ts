import getCurrentUser from '@/utils/getCurrentUser';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

interface FavoriteProps {
  listingId?: string;
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: FavoriteProps;
  },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to favorite a listing' },
      { status: 401 },
    );
  }

  const { listingId } = params;

  if (!listingId) {
    return NextResponse.json(
      { error: 'You must provide a listingId to favorite' },
      { status: 400 },
    );
  }

  try {
    // 현재 사용자의 기존 좋아요 목록을 가져온다.
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // 해당 listingId를 좋아요 목록에 추가한다.
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('##### [Post] favorites/[listingId] error: ', error);
    return NextResponse.json(
      { error: 'Something went wrong while favoriting a listing' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: FavoriteProps },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You must be logged in to unfavorite a listing' },
      { status: 401 },
    );
  }

  const { listingId } = params;

  if (!listingId) {
    return NextResponse.json(
      { error: 'You must provide a listingId to unfavorite' },
      { status: 400 },
    );
  }

  try {
    let favoriteIds = [...(currentUser.favoriteIds || [])].filter(
      (id) => id !== listingId,
    );

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('##### [Delete] favorites/[listingId] error: ', error);
    return NextResponse.json(
      { error: 'Something went wrong while unfavoriting a listing' },
      { status: 500 },
    );
  }
}
