/*
 * Listing Delete API
 */

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
  return NextResponse.json(
    { message: 'Listing 삭제 구현중입니다....' },
    { status: 200 },
  );
}
