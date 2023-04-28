'use client';

import { SafeUser } from '@/app/types';
import useCountries from '@/hooks/useCountries';
import dynamic from 'next/dynamic';
import React from 'react';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface Props {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  locationValue: string;
}

export default function ListingInfo({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}: Props) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <div>Hosted by {user?.name}</div>
          <Avatar imageUrl={user.image} />
        </div>
        <div className="font-lighttext-neutral-500 flex items-center gap-4">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
