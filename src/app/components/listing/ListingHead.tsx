import { SafeUser } from '@/app/types';
import useCountries from '@/hooks/useCountries';
import React from 'react';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

export default function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: Props) {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <header>
      <Heading title={title} subtitle={`${location?.label}의 숙소`} />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          fill
          className="w-full object-cover"
          alt="listing image"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
}
