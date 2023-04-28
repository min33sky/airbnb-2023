import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/utils/getCurrentUser';
import getListingById from '@/app/utils/getListingById';
import React from 'react';
import ListingClient from './ListingClient';
import getListingsIds from '@/app/utils/getListingsIds';
import getReservations from '@/app/utils/getReservation';

//? Dev 모드에서는 에러가 난다. (버그인듯)
// export async function generateStaticParams() {
//   const listings = await getListingsIds();

//   return listings.map((listing) => ({
//     listingId: listing.id,
//   }));
// }

interface Props {
  params: {
    listingId: string;
  };
}

export default async function ListingPage({ params: { listingId } }: Props) {
  const listing = await getListingById(listingId);
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
