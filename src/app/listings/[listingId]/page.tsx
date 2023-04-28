import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/utils/getCurrentUser';
import getListingById from '@/app/utils/getListingById';
import React from 'react';
import ListingClient from './ListingClient';
import getListingsIds from '@/app/utils/getListingsIds';
import getListings from '@/app/utils/getListings';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const listings = await getListings({});

  return listings.map((listing) => ({
    listingId: listing.id,
  }));
}

interface Props {
  params: {
    listingId: string;
  };
}

export default async function ListingPage({ params: { listingId } }: Props) {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
}
