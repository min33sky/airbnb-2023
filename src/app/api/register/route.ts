import { prisma } from '@/lib/prismaDB';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.log('### Register Error : ', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
