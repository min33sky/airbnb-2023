'use client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listing/ListingCard';
import { SafeReservation, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

export default function TripsClient({ reservations, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        const respnose = await fetch(`/api/reservations/${id}`, {
          method: 'DELETE',
        });

        if (!respnose.ok) {
          throw new Error('Something went wrong');
        }

        toast.success('Reservation cancelled');
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setDeletingId('');
      }
    },
    [router],
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
