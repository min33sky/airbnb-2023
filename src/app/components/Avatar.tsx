import Image from 'next/image';
import React from 'react';

interface Props {
  imageUrl?: string;
}

export default function Avatar({
  imageUrl = '/images/placeholder.png',
}: Props = {}) {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
      src={imageUrl}
    />
  );
}
