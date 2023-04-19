'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Logo() {
  const router = useRouter();

  // TODO: Link

  return (
    <Image
      alt="Airbnb Logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={'/images/logo.png'}
    />
  );
}
