import getCurrentUser from '@/utils/getCurrentUser';
import getListingById from '@/utils/getListingById';
import React from 'react';
import ListingClient from './ListingClient';
import getListingsIds from '@/utils/getListingsIds';
import getReservations from '@/utils/getReservation';
import EmptyState from '@/components/EmptyState';

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
