'use client';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listing/ListingHead';
import ListingInfo from '@/app/components/listing/ListingInfo';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/app/utils/categories';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface Props {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

export default function ListingClient({
  reservations,
  listing,
  currentUser,
}: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const category = useMemo(
    () => categories.find((items) => items.label === listing.category),
    [listing.category],
  );

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6 pt-28">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div>
            <ListingInfo
              user={listing.user}
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={category}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
