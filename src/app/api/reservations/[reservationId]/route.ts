import { prisma } from '@/lib/prismaDB';
import getCurrentUser from '@/utils/getCurrentUser';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      reservationId: string;
    };
  },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 },
    );
  }

  const { reservationId } = params;

  if (!reservationId) {
    return NextResponse.json(
      { message: '해당 예약 아이디가 없습니다.' },
      { status: 400 },
    );
  }

  try {
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log(
      '##### reservation/[reservationId]/route.ts DELETE error #####',
    );
    return NextResponse.json(
      { message: '예약 삭제에 실패했습니다.' },
      { status: 500 },
    );
  }
}
