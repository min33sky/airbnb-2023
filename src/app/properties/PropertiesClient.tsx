'use client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listing/ListingCard';
import { SafeListing, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

export default function PropertiesClient({
  listings,
  currentUser,
}: PropertiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        const response = await fetch(`/api/listings/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Listing 삭제 실패');
        }

        toast.success('Listing deleted');
        router.refresh();
      } catch (error: any) {
        toast.error('Listing 삭제 실패');
      } finally {
        setDeletingId('');
      }
    },

    [router],
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          xl:grid-cols-5 2xl:grid-cols-6"
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
