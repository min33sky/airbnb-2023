import Image from 'next/image';
import React from 'react';

interface Props {
  imageUrl?: string | null;
}

export default function Avatar({ imageUrl }: Props = {}) {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
      src={imageUrl || '/images/placeholder.png'}
    />
  );
}
