import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/utils/getCurrentUser';
import getListingById from '@/app/utils/getListingById';
import React from 'react';
import ListingClient from './ListingClient';

interface Props {
  params: {
    listingId: string;
  };
}

export default async function ListingPage({ params: { listingId } }: Props) {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  console.log('##### listingPage: ', listing);

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
}
